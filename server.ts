import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const PORT = Number(process.env.PORT) || 3000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY environment variables.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});

function getBearerToken(req: Request): string | null {
  const value = req.headers.authorization;
  const match = typeof value === 'string' ? value.match(/^Bearer\s+(.+)$/i) : null;
  return match?.[1]?.trim() || null;
}

function toPublicUser(user: {
  id: string;
  email?: string;
  created_at?: string;
  user_metadata?: Record<string, unknown>;
}) {
  return {
    id: user.id,
    name: String(user.user_metadata?.full_name || ''),
    email: user.email || '',
    businessName: String(user.user_metadata?.business_name || ''),
    createdAt: user.created_at || new Date().toISOString(),
  };
}

async function startServer(): Promise<void> {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '16kb' }));

  app.post('/api/auth/signup', async (req: Request, res: Response) => {
    const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const businessName = typeof req.body?.businessName === 'string' ? req.body.businessName.trim() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';

    if (name.length < 2 || name.length > 80) return res.status(400).json({ error: 'Full name must be between 2 and 80 characters.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return res.status(400).json({ error: 'Please enter a valid email address.' });
    if (businessName.length > 120) return res.status(400).json({ error: 'Business name must be 120 characters or fewer.' });
    if (password.length < 8 || password.length > 128) return res.status(400).json({ error: 'Password must be between 8 and 128 characters.' });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, business_name: businessName || null } },
    });
    if (error) return res.status(400).json({ error: error.message });
    if (!data.session) {
      return res.status(200).json({
        requiresEmailConfirmation: true,
        error: 'Your account has been created. Check your email for the confirmation link, then sign in.',
      });
    }
    return res.status(201).json({ token: data.session.access_token, user: toPublicUser(data.user) });
  });

  app.post('/api/auth/signin', async (req: Request, res: Response) => {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || password.length > 128) {
      return res.status(400).json({ error: 'Please provide a valid email and password.' });
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session || !data.user) return res.status(401).json({ error: error?.message || 'Unable to sign in.' });
    return res.json({ token: data.session.access_token, user: toPublicUser(data.user) });
  });

  app.get('/api/auth/me', async (req: Request, res: Response) => {
    const token = getBearerToken(req);
    if (!token) return res.status(401).json({ error: 'Authentication required.' });
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return res.status(401).json({ error: 'Invalid or expired session.' });
    return res.json({ user: toPublicUser(data.user) });
  });

  // Supabase access tokens expire server-side; the client clears its in-memory copy on logout.
  app.post('/api/auth/logout', (_req: Request, res: Response) => res.json({ ok: true }));

  app.use('/api', (_req: Request, res: Response) => res.status(404).json({ error: 'API endpoint not found.' }));

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const path = await import('node:path');
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => res.sendFile(path.resolve(distDir, 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => console.log(`Valerian Events server listening on port ${PORT}`));
}

startServer().catch((error) => {
  console.error('Failed to start Valerian Events server:', error);
  process.exit(1);
});
