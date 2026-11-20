import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  businessName?: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
}

interface PublicUser {
  id: string;
  name: string;
  email: string;
  businessName?: string;
  createdAt: string;
}

interface SessionPayload {
  sub: string;
  email: string;
  jti: string;
  iat: number;
  exp: number;
}

interface AuthenticatedRequest extends Request {
  authUser?: PublicUser;
  authPayload?: SessionPayload;
}

const PORT = Number(process.env.PORT) || 3000;
const SESSION_TTL_SECONDS = 60 * 60 * 24; // 24 hours
const SESSION_SECRET = process.env.AUTH_SESSION_SECRET || crypto.randomBytes(32).toString('hex');

const DATA_DIR = path.resolve(process.cwd(), '.data');
const USERS_FILE = path.resolve(DATA_DIR, 'users.json');

// Track revoked session IDs (jti -> expiration timestamp in seconds)
const revokedTokens = new Map<string, number>();

function pruneRevokedTokens(): void {
  const nowSec = Math.floor(Date.now() / 1000);
  for (const [jti, exp] of revokedTokens.entries()) {
    if (exp <= nowSec) {
      revokedTokens.delete(jti);
    }
  }
}

function ensureUserStore(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true, mode: 0o700 });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, '[]', { encoding: 'utf8', mode: 0o600 });
  }
}

function readUsers(): StoredUser[] {
  ensureUserStore();
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]): void {
  ensureUserStore();
  const tmpFile = path.resolve(DATA_DIR, `users.${crypto.randomUUID()}.tmp.json`);
  fs.writeFileSync(tmpFile, JSON.stringify(users, null, 2), { encoding: 'utf8', mode: 0o600 });
  fs.renameSync(tmpFile, USERS_FILE);
}

function sanitizeUser(user: StoredUser): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    ...(user.businessName ? { businessName: user.businessName } : {}),
    createdAt: user.createdAt,
  };
}

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function verifyPassword(password: string, salt: string, expectedHashHex: string): boolean {
  const derived = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHashHex, 'hex');
  if (derived.length !== expected.length) return false;
  return crypto.timingSafeEqual(derived, expected);
}

function signSessionToken(user: StoredUser): string {
  const nowSec = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: user.id,
    email: user.email,
    jti: crypto.randomUUID(),
    iat: nowSec,
    exp: nowSec + SESSION_TTL_SECONDS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${signature}`;
}

function verifySessionToken(token: string): SessionPayload | null {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [encodedPayload, providedSig] = parts;
  if (!encodedPayload || !providedSig) return null;

  const expectedSig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  const providedBuf = Buffer.from(providedSig, 'utf8');
  const expectedBuf = Buffer.from(expectedSig, 'utf8');
  if (providedBuf.length !== expectedBuf.length) return null;
  if (!crypto.timingSafeEqual(providedBuf, expectedBuf)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as SessionPayload;
    const nowSec = Math.floor(Date.now() / 1000);
    if (!parsed.sub || !parsed.jti || typeof parsed.exp !== 'number' || parsed.exp <= nowSec) {
      return null;
    }
    if (revokedTokens.has(parsed.jti)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function extractBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header || typeof header !== 'string') return null;
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const token = extractBearerToken(req);
  if (!token) {
    res.status(401).json({ error: 'Authentication required.' });
    return;
  }

  const payload = verifySessionToken(token);
  if (!payload) {
    res.status(401).json({ error: 'Invalid or expired session.' });
    return;
  }

  const users = readUsers();
  const user = users.find((u) => u.id === payload.sub);
  if (!user) {
    res.status(401).json({ error: 'Account not found.' });
    return;
  }

  req.authUser = sanitizeUser(user);
  req.authPayload = payload;
  next();
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function startServer(): Promise<void> {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '16kb' }));

  // Sign Up
  app.post('/api/auth/signup', (req: Request, res: Response) => {
    const body = req.body as Record<string, unknown> | undefined;
    const rawName = typeof body?.name === 'string' ? body.name.trim() : '';
    const rawEmail = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const rawBusiness = typeof body?.businessName === 'string' ? body.businessName.trim() : '';
    const rawPassword = typeof body?.password === 'string' ? body.password : '';

    if (rawName.length < 2 || rawName.length > 80) {
      res.status(400).json({ error: 'Full name must be between 2 and 80 characters.' });
      return;
    }
    if (!EMAIL_REGEX.test(rawEmail) || rawEmail.length > 254) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }
    if (rawBusiness.length > 120) {
      res.status(400).json({ error: 'Business name must be 120 characters or fewer.' });
      return;
    }
    if (rawPassword.length < 8 || rawPassword.length > 128) {
      res.status(400).json({ error: 'Password must be between 8 and 128 characters.' });
      return;
    }

    const users = readUsers();
    const existing = users.find((u) => u.email === rawEmail);
    if (existing) {
      res.status(409).json({ error: 'An account with this email already exists. Please sign in instead.' });
      return;
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = hashPassword(rawPassword, salt);
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name: rawName,
      email: rawEmail,
      ...(rawBusiness ? { businessName: rawBusiness } : {}),
      passwordHash,
      salt,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeUsers(users);

    const token = signSessionToken(newUser);
    res.status(201).json({
      token,
      user: sanitizeUser(newUser),
    });
  });

  // Sign In
  app.post('/api/auth/signin', (req: Request, res: Response) => {
    const body = req.body as Record<string, unknown> | undefined;
    const rawEmail = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const rawPassword = typeof body?.password === 'string' ? body.password : '';

    if (!EMAIL_REGEX.test(rawEmail) || rawEmail.length > 254 || !rawPassword || rawPassword.length > 128) {
      res.status(400).json({ error: 'Please provide a valid email and password.' });
      return;
    }

    const users = readUsers();
    const user = users.find((u) => u.email === rawEmail);
    if (!user || !verifyPassword(rawPassword, user.salt, user.passwordHash)) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const token = signSessionToken(user);
    res.json({
      token,
      user: sanitizeUser(user),
    });
  });

  // Logout (revokes current Bearer token server-side)
  app.post('/api/auth/logout', (req: Request, res: Response) => {
    pruneRevokedTokens();
    const token = extractBearerToken(req);
    if (token) {
      const payload = verifySessionToken(token);
      if (payload) {
        revokedTokens.set(payload.jti, payload.exp);
      }
    }
    res.json({ ok: true });
  });

  // Current Authenticated User
  app.get('/api/auth/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
    res.json({ user: req.authUser });
  });

  // Reject unknown API routes with JSON 404
  app.use('/api', (_req: Request, res: Response) => {
    res.status(404).json({ error: 'API endpoint not found.' });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
