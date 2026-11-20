import { createClient } from '@supabase/supabase-js';
import { jsonError } from '../../server/services.js';

const supabase = createClient(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '', process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '', { auth: { persistSession: false, autoRefreshToken: false } });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.setHeader('Allow', 'POST'), jsonError(res, 405, 'Method not allowed.');
  const { name, email, businessName, password } = req.body || {};
  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const cleanBusiness = typeof businessName === 'string' ? businessName.trim() : '';
  if (cleanName.length < 2 || cleanName.length > 80 || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(cleanEmail) || cleanEmail.length > 254 || typeof password !== 'string' || password.length < 8 || password.length > 128 || cleanBusiness.length > 120) return jsonError(res, 400, 'Please check your name, email, business name, and password.');
  const { data, error } = await supabase.auth.signUp({ email: cleanEmail, password, options: { data: { full_name: cleanName, business_name: cleanBusiness || null } } });
  if (error) return jsonError(res, 400, error.message);
  if (!data.session) return res.status(200).json({ requiresEmailConfirmation: true, error: 'Your account has been created. Check your email for the confirmation link, then sign in.' });
  return res.status(201).json({ token: data.session.access_token, user: { id: data.user.id, name: cleanName, email: data.user.email || cleanEmail, businessName: cleanBusiness, createdAt: data.user.created_at } });
}
