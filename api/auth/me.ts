import { createClient } from '@supabase/supabase-js';
import { jsonError } from '../../server/services';

const supabase = createClient(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '', process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '', { auth: { persistSession: false, autoRefreshToken: false } });

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.setHeader('Allow', 'GET'), jsonError(res, 405, 'Method not allowed.');
  const header = req.headers.authorization;
  const token = typeof header === 'string' ? header.match(/^Bearer\s+(.+)$/i)?.[1] : null;
  if (!token) return jsonError(res, 401, 'Authentication required.');
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return jsonError(res, 401, 'Invalid or expired session.');
  return res.status(200).json({ user: { id: data.user.id, name: String(data.user.user_metadata?.full_name || ''), email: data.user.email || '', businessName: String(data.user.user_metadata?.business_name || ''), createdAt: data.user.created_at } });
}
