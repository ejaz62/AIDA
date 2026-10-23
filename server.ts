import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  initDatabase,
  getPublishedCourses,
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  toggleCoursePublication,
  deleteCourse,
  getDatabaseStatus,
} from './src/server/database';
import {
  authenticateAdminCredentials,
  validateSessionToken,
  revokeSessionToken,
  requireAdminAuth,
} from './src/server/auth';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
// Dev server in AI Studio must listen on port 3000 (process.env.PORT is reserved by nginx proxy on 8080)
const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // Initialize persistent course database
  initDatabase();

  // ==========================================
  // PUBLIC API ENDPOINTS
  // ==========================================

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      academy: 'AIDA — Artificial Intelligence Digital Academy',
      timestamp: new Date().toISOString(),
    });
  });

  // Get published courses for public website
  app.get('/api/courses', (req, res) => {
    try {
      const courses = getPublishedCourses();
      res.json({ courses, count: courses.length });
    } catch (err: any) {
      console.error('Error fetching public courses:', err);
      res.status(500).json({ error: 'Failed to retrieve courses' });
    }
  });

  // Get single course by ID
  app.get('/api/courses/:id', (req, res) => {
    const course = getCourseById(req.params.id);
    if (!course || (!course.isPublished && !validateSessionToken(req.headers.authorization?.split(' ')[1]))) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json({ course });
  });

  // Database diagnostic information and cloud recommendations
  app.get('/api/db-status', (req, res) => {
    try {
      const status = getDatabaseStatus();
      res.json(status);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to inspect database status' });
    }
  });

  // ==========================================
  // ADMIN AUTHENTICATION ENDPOINTS
  // ==========================================

  // Admin login
  app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const authResult = authenticateAdminCredentials(email, password);
    if (!authResult) {
      res.status(401).json({ error: 'Invalid admin credentials.' });
      return;
    }

    res.json(authResult);
  });

  // Verify current session
  app.get('/api/admin/me', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token || !validateSessionToken(token)) {
      res.status(401).json({ error: 'Invalid or expired session.' });
      return;
    }

    res.json({
      authenticated: true,
      user: {
        email: process.env.ADMIN_EMAIL || 'admin@learnwithaida.com',
        role: 'admin',
        name: 'Muhammad Ejaz (Administrator)',
      },
    });
  });

  // Admin logout
  app.post('/api/admin/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (token) {
      revokeSessionToken(token);
    }
    res.json({ success: true, message: 'Logged out successfully.' });
  });

  // ==========================================
  // PROTECTED ADMIN COURSE CRUD ENDPOINTS
  // ==========================================

  // Get all courses (including unpublished drafts)
  app.get('/api/admin/courses', requireAdminAuth, (req, res) => {
    try {
      const courses = getAllCourses();
      res.json({ courses, count: courses.length });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to fetch admin courses' });
    }
  });

  // Create a new course
  app.post('/api/admin/courses', requireAdminAuth, (req, res) => {
    try {
      const created = createCourse(req.body);
      res.status(201).json({ course: created, message: 'Course created successfully' });
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Failed to create course' });
    }
  });

  // Update existing course
  app.put('/api/admin/courses/:id', requireAdminAuth, (req, res) => {
    try {
      const updated = updateCourse(req.params.id, req.body);
      res.json({ course: updated, message: 'Course updated successfully' });
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Failed to update course' });
    }
  });

  // Toggle or update course publication status
  app.patch('/api/admin/courses/:id/publish', requireAdminAuth, (req, res) => {
    try {
      const { isPublished } = req.body;
      const updated = toggleCoursePublication(req.params.id, isPublished);
      res.json({
        course: updated,
        message: updated.isPublished ? 'Course published to website' : 'Course unpublished from public website',
      });
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Failed to change publication status' });
    }
  });

  // Delete course
  app.delete('/api/admin/courses/:id', requireAdminAuth, (req, res) => {
    try {
      deleteCourse(req.params.id);
      res.json({ success: true, message: 'Course deleted permanently' });
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Failed to delete course' });
    }
  });

  // ==========================================
  // STATIC ASSETS & VITE INTEGRATION
  // ==========================================

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : undefined,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AIDA Server] Full-Stack server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[AIDA Server] Startup failure:', err);
  process.exit(1);
});
