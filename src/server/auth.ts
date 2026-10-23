import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { AdminAuthResponse } from '../types';

// Admin credentials configured securely on server side
// Never exposed to client code or browser bundles
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@learnwithaida.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'AidaAdmin2026!Secure';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface Session {
  token: string;
  email: string;
  createdAt: number;
  expiresAt: number;
}

// In-memory active session store
const activeSessions = new Map<string, Session>();

// Constant-time string comparison to prevent timing attacks
function timingSafeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, 'utf-8');
    const bufB = Buffer.from(b, 'utf-8');
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

// Authenticate admin with credentials
export function authenticateAdminCredentials(email: string, password: string): AdminAuthResponse | null {
  if (!email || !password) return null;

  const emailMatch = email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase();
  const passwordMatch = timingSafeCompare(password.trim(), ADMIN_PASSWORD.trim());

  if (!emailMatch || !passwordMatch) {
    return null;
  }

  // Generate cryptographically secure token
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  const expiresAt = now + SESSION_TTL_MS;

  activeSessions.set(token, {
    token,
    email: ADMIN_EMAIL,
    createdAt: now,
    expiresAt,
  });

  return {
    token,
    user: {
      email: ADMIN_EMAIL,
      role: 'admin',
      name: 'Muhammad Ejaz (Administrator)',
    },
    expiresAt: new Date(expiresAt).toISOString(),
  };
}

// Validate session token
export function validateSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const session = activeSessions.get(token);
  if (!session) return false;

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return false;
  }

  return true;
}

// Revoke session token (logout)
export function revokeSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  return activeSessions.delete(token);
}

// Express middleware to protect admin routes
export function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Unauthorized: Admin authentication token required.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!validateSessionToken(token)) {
    res.status(401).json({
      error: 'Unauthorized: Session expired or invalid token. Please log in again.',
    });
    return;
  }

  next();
}
