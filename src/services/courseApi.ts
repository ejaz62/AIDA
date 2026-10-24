import { Course, AdminAuthResponse, DatabaseStatus } from '../types';
import { COURSES_DATA } from '../data/academyData';

const TOKEN_KEY = 'aida_admin_token';
const ADMIN_USER_KEY = 'aida_admin_user';

// ==========================================
// TOKEN STORAGE HELPERS
// ==========================================

export function getStoredAdminToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredAdminAuth(auth: AdminAuthResponse, rememberMe: boolean = true): void {
  try {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, auth.token);
    storage.setItem(ADMIN_USER_KEY, JSON.stringify(auth.user));
  } catch (e) {
    console.error('Failed to store auth token:', e);
  }
}

export function clearStoredAdminAuth(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_USER_KEY);
  } catch (e) {
    console.error('Failed to clear auth token:', e);
  }
}

export function getStoredAdminUser() {
  try {
    const data = localStorage.getItem(ADMIN_USER_KEY) || sessionStorage.getItem(ADMIN_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// ==========================================
// RESILIENT NETLIFY / FULL-STACK API HELPER
// ==========================================

async function safeJsonFetch(url: string, options?: RequestInit): Promise<any> {
  let res = await fetch(url, options);
  let contentType = res.headers.get('content-type') || '';

  // If the static server returned HTML (Netlify SPA fallback), try direct Netlify function endpoint
  if (contentType.includes('text/html') && url.startsWith('/api/')) {
    const netlifyUrl = url.replace('/api/', '/.netlify/functions/api/');
    try {
      const netlifyRes = await fetch(netlifyUrl, options);
      const netlifyContentType = netlifyRes.headers.get('content-type') || '';
      if (netlifyContentType.includes('application/json')) {
        res = netlifyRes;
        contentType = netlifyContentType;
      }
    } catch {
      // Fall through to original response processing
    }
  }

  const text = await res.text();
  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    if (text.trim().startsWith('<!DOCTYPE') || contentType.includes('text/html')) {
      throw new Error(
        'The API returned an HTML document instead of JSON. Netlify Functions require netlify.toml to route /api/* requests.'
      );
    }
    throw new Error('Failed to parse server response as JSON');
  }

  if (!res.ok) {
    throw new Error(data?.error || `Request failed with status ${res.status}`);
  }

  return data;
}

// ==========================================
// PUBLIC API
// ==========================================

export async function fetchPublishedCourses(): Promise<{ courses: Course[]; isFallback: boolean }> {
  try {
    const data = await safeJsonFetch('/api/courses');
    if (Array.isArray(data.courses) && data.courses.length > 0) {
      return { courses: data.courses, isFallback: false };
    }
    return { courses: COURSES_DATA, isFallback: true };
  } catch (err) {
    console.warn('[CourseAPI] Backend courses endpoint unavailable, using initial data:', err);
    return { courses: COURSES_DATA, isFallback: true };
  }
}

export async function fetchDatabaseStatus(): Promise<DatabaseStatus | null> {
  try {
    return await safeJsonFetch('/api/db-status');
  } catch (err) {
    console.error('Failed to fetch DB status:', err);
    return null;
  }
}

// ==========================================
// ADMIN AUTHENTICATION
// ==========================================

export async function loginAdmin(email: string, password: string, rememberMe: boolean = true): Promise<AdminAuthResponse> {
  const data = await safeJsonFetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  setStoredAdminAuth(data, rememberMe);
  return data;
}

export async function verifyAdminSession(): Promise<boolean> {
  const token = getStoredAdminToken();
  if (!token) return false;

  try {
    const res = await fetch('/api/admin/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      return true;
    }
    clearStoredAdminAuth();
    return false;
  } catch {
    return false;
  }
}

export async function logoutAdmin(): Promise<void> {
  const token = getStoredAdminToken();
  if (token) {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Ignore network errors on logout
    }
  }
  clearStoredAdminAuth();
}

// ==========================================
// PROTECTED ADMIN COURSE CRUD
// ==========================================

export async function fetchAllAdminCourses(): Promise<Course[]> {
  const token = getStoredAdminToken();
  if (!token) throw new Error('Authentication required');

  const data = await safeJsonFetch('/api/admin/courses', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.courses;
}

export async function createCourseApi(courseData: Partial<Course>): Promise<Course> {
  const token = getStoredAdminToken();
  if (!token) throw new Error('Authentication required');

  const data = await safeJsonFetch('/api/admin/courses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });

  return data.course;
}

export async function updateCourseApi(id: string, courseData: Partial<Course>): Promise<Course> {
  const token = getStoredAdminToken();
  if (!token) throw new Error('Authentication required');

  const data = await safeJsonFetch(`/api/admin/courses/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });

  return data.course;
}

export async function toggleCoursePublicationApi(id: string, isPublished?: boolean): Promise<Course> {
  const token = getStoredAdminToken();
  if (!token) throw new Error('Authentication required');

  const data = await safeJsonFetch(`/api/admin/courses/${encodeURIComponent(id)}/publish`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isPublished }),
  });

  return data.course;
}

export async function deleteCourseApi(id: string): Promise<void> {
  const token = getStoredAdminToken();
  if (!token) throw new Error('Authentication required');

  await safeJsonFetch(`/api/admin/courses/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

