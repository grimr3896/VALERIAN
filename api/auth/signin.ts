import { createClient } from '@supabase/supabase-js';
import { jsonError } from '../../server/services';

const supabase = createClient(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '', process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '', { auth: { persistSession: false, autoRefreshToken: false } });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.setHeader('Allow', 'POST'), jsonError(res, 405, 'Method not allowed.');
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || password.length > 128) return jsonError(res, 400, 'Please provide a valid email and password.');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.session || !data.user) return jsonError(res, 401, error?.message || 'Unable to sign in.');
  return res.status(200).json({ token: data.session.access_token, user: { id: data.user.id, name: String(data.user.user_metadata?.full_name || ''), email: data.user.email || email, businessName: String(data.user.user_metadata?.business_name || ''), createdAt: data.user.created_at } });
}
