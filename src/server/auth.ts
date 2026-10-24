import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { AdminAuthResponse } from '../types';

// Admin credentials configured securely on server side
// Never exposed to client code or browser bundles
const ENV_ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ENV_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const DEFAULT_ADMIN_EMAIL = 'admin@learnwithaida.com';
const DEFAULT_ADMIN_PASSWORD = 'AidaAdmin2026!Secure';
const FOUNDER_ADMIN_EMAIL = 'mentorsvalley@gmail.com';
const FOUNDER_ADMIN_PASSWORD = 'Amijan40@';

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

  const inputEmail = email.trim().toLowerCase();
  const inputPass = password.trim();

  // Validate against configured environment credentials, founder credentials, or default admin credentials
  const matchesEnv = ENV_ADMIN_EMAIL && ENV_ADMIN_PASSWORD &&
    inputEmail === ENV_ADMIN_EMAIL.trim().toLowerCase() &&
    timingSafeCompare(inputPass, ENV_ADMIN_PASSWORD.trim());

  const matchesFounder = inputEmail === FOUNDER_ADMIN_EMAIL.toLowerCase() &&
    timingSafeCompare(inputPass, FOUNDER_ADMIN_PASSWORD);

  const matchesDefault = inputEmail === DEFAULT_ADMIN_EMAIL.toLowerCase() &&
    timingSafeCompare(inputPass, DEFAULT_ADMIN_PASSWORD);

  if (!matchesEnv && !matchesFounder && !matchesDefault) {
    return null;
  }

  const authenticatedEmail = matchesEnv
    ? ENV_ADMIN_EMAIL!
    : (matchesFounder ? FOUNDER_ADMIN_EMAIL : DEFAULT_ADMIN_EMAIL);

  // Generate cryptographically secure token
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  const expiresAt = now + SESSION_TTL_MS;

  activeSessions.set(token, {
    token,
    email: authenticatedEmail,
    createdAt: now,
    expiresAt,
  });

  return {
    token,
    user: {
      email: authenticatedEmail,
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
