import { createClient } from '@supabase/supabase-js';
import { escapeHtml, insertRow, jsonError, sendTransactionalEmail, validEmail } from '../server/services.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.setHeader('Allow', 'POST'), jsonError(res, 405, 'Method not allowed.');
  const authorization = typeof req.headers?.authorization === 'string' ? req.headers.authorization : '';
  const accessToken = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : '';
  if (!accessToken) return jsonError(res, 401, 'Please create an account or sign in before submitting an application.');
  const supabase = createClient(
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '',
    process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
  const { data: authData, error: authError } = await supabase.auth.getUser(accessToken);
  if (authError || !authData.user) return jsonError(res, 401, 'Your session is invalid or expired. Please sign in again.');

  const body = req.body || {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const business = typeof body.businessName === 'string' ? body.businessName.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const event = typeof body.eventInterest === 'string' ? body.eventInterest.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (name.length < 2 || name.length > 100 || !validEmail(email) || message.length < 5 || message.length > 5000) {
    return jsonError(res, 400, 'Please provide a valid name, email address, and message.');
  }
  if (business.length > 150 || phone.length > 50 || event.length > 250) return jsonError(res, 400, 'One or more fields are too long.');
  try {
    await insertRow('contact_messages', { name, business_name: business || null, email, phone: phone || null, event_interest: event || null, message, status: 'new' });
    const details = `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Business:</strong> ${escapeHtml(business || 'Not provided')}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p><p><strong>Event:</strong> ${escapeHtml(event || 'General inquiry')}</p><p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`;
    await sendTransactionalEmail('info@valerianevents.com', 'New website contact inquiry', details, email);
    await sendTransactionalEmail(email, 'We received your message | Valerian Events', `<p>Hello ${escapeHtml(name)},</p><p>Thank you for contacting Valerian Events. Your message has been received and our team will review it and respond as soon as possible.</p><p>Regards,<br>Valerian Events Team</p>`);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact submission failed:', error);
    return jsonError(res, 500, 'We could not submit your message right now. Please try again or email info@valerianevents.com.');
  }
}
