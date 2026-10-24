import express, { Request, Response } from 'express';
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
} from './database';
import {
  authenticateAdminCredentials,
  validateSessionToken,
  revokeSessionToken,
  requireAdminAuth,
} from './auth';

export function createApiApp() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // Initialize persistent course storage
  initDatabase();

  const router = express.Router();

  // ==========================================
  // PUBLIC API ENDPOINTS
  // ==========================================

  // Health check
  router.get('/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      academy: 'AIDA — Artificial Intelligence Digital Academy',
      timestamp: new Date().toISOString(),
    });
  });

  // Get published courses for public website
  router.get('/courses', (req: Request, res: Response) => {
    try {
      const courses = getPublishedCourses();
      res.json({ courses, count: courses.length });
    } catch (err: any) {
      console.error('Error fetching public courses:', err);
      res.status(500).json({ error: 'Failed to retrieve courses' });
    }
  });

  // Get single course by ID
  router.get('/courses/:id', (req: Request, res: Response) => {
    const course = getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ course });
  });

  // Database status (admin view)
  router.get('/db-status', (req: Request, res: Response) => {
    const status = getDatabaseStatus();
    res.json(status);
  });

  // ==========================================
  // ADMIN AUTHENTICATION
  // ==========================================

  // Login
  router.post('/admin/login', (req: Request, res: Response) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const auth = authenticateAdminCredentials(email, password);
    if (!auth) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    res.json(auth);
  });

  // Verify active session token
  router.get('/admin/me', requireAdminAuth, (req: Request, res: Response) => {
    res.json({
      authenticated: true,
      user: (req as any).adminUser,
    });
  });

  // Logout
  router.post('/admin/logout', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      revokeSessionToken(token);
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });

  // ==========================================
  // PROTECTED ADMIN COURSE CRUD
  // ==========================================

  // List all courses (including drafts)
  router.get('/admin/courses', requireAdminAuth, (req: Request, res: Response) => {
    try {
      const courses = getAllCourses();
      res.json({ courses, count: courses.length });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch admin courses' });
    }
  });

  // Create new course
  router.post('/admin/courses', requireAdminAuth, (req: Request, res: Response) => {
    try {
      const course = createCourse(req.body);
      res.status(201).json({ success: true, course });
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Failed to create course' });
    }
  });

  // Update existing course
  router.put('/admin/courses/:id', requireAdminAuth, (req: Request, res: Response) => {
    try {
      const course = updateCourse(req.params.id, req.body);
      res.json({ success: true, course });
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Failed to update course' });
    }
  });

  // Toggle publish / unpublish
  router.patch('/admin/courses/:id/publish', requireAdminAuth, (req: Request, res: Response) => {
    try {
      const course = toggleCoursePublication(req.params.id, req.body?.isPublished);
      res.json({ success: true, course });
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Failed to toggle publication status' });
    }
  });

  // Delete course
  router.delete('/admin/courses/:id', requireAdminAuth, (req: Request, res: Response) => {
    try {
      deleteCourse(req.params.id);
      res.json({ success: true, message: 'Course deleted permanently' });
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Failed to delete course' });
    }
  });

  // Mount router on all path representations:
  // 1. /api/... (standard API calls from frontend)
  // 2. /.netlify/functions/api/... (Netlify functions direct invocation)
  // 3. /... (splat rewrite where /api prefix is stripped)
  app.use('/api', router);
  app.use('/.netlify/functions/api', router);
  app.use('/', router);

  return app;
}
