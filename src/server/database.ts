import fs from 'fs';
import path from 'path';
import { Course, DatabaseStatus } from '../types';
import { COURSES_DATA } from '../data/academyData';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE_PATH = path.join(DATA_DIR, 'courses_db.json');

// In-memory cache synced with persistent disk storage
let coursesCache: Course[] = [];

// Atomic write helper to ensure data integrity
function persistCoursesToDisk(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE_PATH}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(coursesCache, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE_PATH);
  } catch (err) {
    console.error('Failed to persist courses to disk:', err);
    throw new Error('Database write operation failed');
  }
}

// Initialize database with existing academy curriculum if file does not exist
export function initDatabase(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE_PATH)) {
      const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      coursesCache = JSON.parse(raw);
      console.log(`[Database] Loaded ${coursesCache.length} courses from persistent storage: ${DB_FILE_PATH}`);
    } else {
      console.log('[Database] Initializing fresh database with default AIDA curriculum...');
      const now = new Date().toISOString();
      coursesCache = COURSES_DATA.map((c, idx) => ({
        ...c,
        number: c.number || String(idx + 1).padStart(2, '0'),
        price: c.price || 'Curriculum Proposed',
        thumbnail: c.thumbnail || '',
        isPublished: c.isPublished ?? true,
        createdAt: now,
        updatedAt: now,
      }));
      persistCoursesToDisk();
      console.log(`[Database] Seeded and persisted ${coursesCache.length} initial courses to ${DB_FILE_PATH}`);
    }
  } catch (err) {
    console.error('[Database] Initialization error:', err);
    // Fallback to in-memory courses to prevent application crash
    coursesCache = [...COURSES_DATA];
  }
}

// Public: Get published courses only
export function getPublishedCourses(): Course[] {
  return coursesCache.filter((c) => c.isPublished !== false);
}

// Admin: Get all courses (published + drafts/unpublished)
export function getAllCourses(): Course[] {
  return [...coursesCache];
}

// Admin: Get course by ID
export function getCourseById(id: string): Course | undefined {
  return coursesCache.find((c) => c.id === id);
}

// Admin: Create new course with validation
export function createCourse(data: Partial<Course>): Course {
  if (!data.title?.trim()) {
    throw new Error('Course title is required');
  }
  if (!data.shortDescription?.trim()) {
    throw new Error('Short description is required');
  }

  const now = new Date().toISOString();
  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  const id = slug || `course-${Date.now()}`;

  // Check unique ID
  let uniqueId = id;
  let counter = 1;
  while (coursesCache.some((c) => c.id === uniqueId)) {
    uniqueId = `${id}-${counter++}`;
  }

  const nextNumber = String(coursesCache.length + 1).padStart(2, '0');

  const newCourse: Course = {
    id: uniqueId,
    number: data.number?.trim() || nextNumber,
    title: data.title.trim(),
    shortDescription: data.shortDescription.trim(),
    fullDescription: data.fullDescription?.trim() || data.shortDescription.trim(),
    status: data.status || 'In Development',
    level: data.level || 'Beginner',
    category: data.category || 'Fundamentals',
    price: data.price?.trim() || 'Free / In Development',
    thumbnail: data.thumbnail?.trim() || '',
    isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : false,
    durationEstimate: data.durationEstimate?.trim() || '4–6 Weeks',
    keyOutcomes: Array.isArray(data.keyOutcomes) && data.keyOutcomes.length > 0
      ? data.keyOutcomes.map((k) => k.trim()).filter(Boolean)
      : ['Master practical hands-on AI workflow capabilities'],
    syllabus: Array.isArray(data.syllabus) && data.syllabus.length > 0
      ? data.syllabus
      : [
          {
            moduleNumber: '01',
            title: 'Core Fundamentals & Setup',
            summary: 'Initial orientation, environment preparation, and foundational concepts.',
          },
        ],
    createdAt: now,
    updatedAt: now,
  };

  coursesCache.push(newCourse);
  persistCoursesToDisk();
  return newCourse;
}

// Admin: Update existing course
export function updateCourse(id: string, updates: Partial<Course>): Course {
  const index = coursesCache.findIndex((c) => c.id === id);
  if (index === -1) {
    throw new Error(`Course with ID "${id}" not found`);
  }

  const existing = coursesCache[index];
  const now = new Date().toISOString();

  const updated: Course = {
    ...existing,
    title: updates.title !== undefined ? updates.title.trim() : existing.title,
    shortDescription: updates.shortDescription !== undefined ? updates.shortDescription.trim() : existing.shortDescription,
    fullDescription: updates.fullDescription !== undefined ? updates.fullDescription.trim() : existing.fullDescription,
    status: updates.status !== undefined ? updates.status : existing.status,
    level: updates.level !== undefined ? updates.level : existing.level,
    category: updates.category !== undefined ? updates.category : existing.category,
    price: updates.price !== undefined ? updates.price.trim() : existing.price,
    thumbnail: updates.thumbnail !== undefined ? updates.thumbnail.trim() : existing.thumbnail,
    isPublished: updates.isPublished !== undefined ? Boolean(updates.isPublished) : existing.isPublished,
    durationEstimate: updates.durationEstimate !== undefined ? updates.durationEstimate.trim() : existing.durationEstimate,
    keyOutcomes: Array.isArray(updates.keyOutcomes) ? updates.keyOutcomes : existing.keyOutcomes,
    syllabus: Array.isArray(updates.syllabus) ? updates.syllabus : existing.syllabus,
    updatedAt: now,
  };

  coursesCache[index] = updated;
  persistCoursesToDisk();
  return updated;
}

// Admin: Toggle publication status
export function toggleCoursePublication(id: string, isPublished?: boolean): Course {
  const course = coursesCache.find((c) => c.id === id);
  if (!course) {
    throw new Error(`Course with ID "${id}" not found`);
  }

  const newStatus = isPublished !== undefined ? isPublished : !course.isPublished;
  return updateCourse(id, { isPublished: newStatus });
}

// Admin: Delete course with existence check
export function deleteCourse(id: string): boolean {
  const index = coursesCache.findIndex((c) => c.id === id);
  if (index === -1) {
    throw new Error(`Course with ID "${id}" not found`);
  }

  coursesCache.splice(index, 1);
  persistCoursesToDisk();
  return true;
}

// Database status & recommendations for production
export function getDatabaseStatus(): DatabaseStatus {
  const total = coursesCache.length;
  const published = coursesCache.filter((c) => c.isPublished).length;
  const unpublished = total - published;

  // Check if an external database like Postgres/Cloud SQL or Firebase is configured in ENV
  const isCloudSqlConfigured = Boolean(process.env.CLOUD_SQL_CONNECTION_NAME || process.env.DATABASE_URL);
  const isFirebaseConfigured = Boolean(process.env.FIREBASE_PROJECT_ID);

  return {
    configured: isCloudSqlConfigured || isFirebaseConfigured,
    type: isCloudSqlConfigured
      ? 'Google Cloud SQL (PostgreSQL)'
      : isFirebaseConfigured
      ? 'Firebase Firestore'
      : 'Local Server Persistent Document Store (JSON Database)',
    location: isCloudSqlConfigured
      ? process.env.DATABASE_URL || 'Cloud SQL'
      : DB_FILE_PATH,
    totalCourses: total,
    publishedCourses: published,
    unpublishedCourses: unpublished,
    recommendation: isCloudSqlConfigured || isFirebaseConfigured
      ? 'Connected to configured cloud database.'
      : 'Currently running on the built-in Local Server Persistent Document Store with atomic file syncing. For multi-instance cloud deployments or distributed teams, we recommend connecting Google Cloud SQL (PostgreSQL) or Firebase Firestore.',
    cloudOptions: [
      {
        name: 'Google Cloud SQL (PostgreSQL)',
        description: 'Fully managed relational database suitable for enterprise-grade scalability, complex queries, and relational integrity.',
        setupRequired: [
          'GCP Project ID',
          'Cloud SQL PostgreSQL Instance Name',
          'Database Name & User Credentials (DATABASE_URL)',
          'Cloud SQL Proxy or Authorized Network IP configuration',
        ],
      },
      {
        name: 'Firebase Firestore',
        description: 'Scalable NoSQL document database with built-in Firebase Authentication, real-time listeners, and automatic regional replication.',
        setupRequired: [
          'Firebase Project ID',
          'Firestore Security Rules deployment',
          'Firebase Service Account credentials or Web SDK initialization config',
        ],
      },
    ],
  };
}
