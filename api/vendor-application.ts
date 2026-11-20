import { escapeHtml, insertRow, jsonError, sendTransactionalEmail, validEmail } from '../server/services';

const pillars = ['marketplace', 'food', 'exhibitor', 'activation', 'sponsorship'];

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.setHeader('Allow', 'POST'), jsonError(res, 405, 'Method not allowed.');
  const body = req.body || {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const business = typeof body.businessName === 'string' ? body.businessName.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const category = typeof body.category === 'string' ? body.category.trim() : '';
  const pillar = pillars.includes(body.pillar) ? body.pillar : 'marketplace';
  const tierId = typeof body.tierId === 'string' ? body.tierId.trim() : '';
  const tierName = typeof body.tierName === 'string' ? body.tierName.trim() : '';
  const paymentPlan = typeof body.paymentPlan === 'string' ? body.paymentPlan.trim() : '';
  const eventId = typeof body.eventId === 'string' ? body.eventId.trim() : '';
  const eventName = typeof body.eventName === 'string' ? body.eventName.trim() : 'General Exhibitor Inquiry';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (name.length < 2 || name.length > 100 || business.length < 2 || business.length > 150 || !validEmail(email) || !tierId || tierId.length > 100 || !tierName || tierName.length > 180 || message.length > 5000) {
    return jsonError(res, 400, 'Please complete the required application fields with valid information.');
  }
  if (phone.length > 50 || category.length > 120 || eventName.length > 200 || paymentPlan.length > 100) return jsonError(res, 400, 'One or more fields are too long.');
  try {
    let application;
    if (pillar === 'sponsorship') {
      application = await insertRow('sponsorship_inquiries', {
        contact_name: name, organization_name: business, email, phone: phone || null,
        package_name: tierName, event_name: eventName, message: message || null, status: 'new',
      });
    } else {
      application = await insertRow('vendor_applications', {
        contact_name: name, business_name: business, email, phone: phone || null,
        category: category || null, pillar, tier_id: tierId, tier_name: tierName,
        payment_plan: paymentPlan || null, event_id: eventId || null, event_name: eventName,
        message: message || null, status: 'pending',
      });
    }
    const ref = application?.id || 'received';
    const summary = `<p><strong>Application reference:</strong> ${escapeHtml(ref)}</p><p><strong>Contact:</strong> ${escapeHtml(name)}</p><p><strong>Business:</strong> ${escapeHtml(business)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p><p><strong>Category:</strong> ${escapeHtml(category || pillar)}</p><p><strong>Opportunity:</strong> ${escapeHtml(tierName)}</p><p><strong>Event:</strong> ${escapeHtml(eventName)}</p><p><strong>Payment plan:</strong> ${escapeHtml(paymentPlan || 'To be discussed')}</p><p><strong>Message:</strong><br>${escapeHtml(message || 'No additional message')}</p>`;
    await sendTransactionalEmail('info@valerianevents.com', `New ${pillar} application — ${business}`, summary, email);
    await sendTransactionalEmail(email, 'Application received | Valerian Events', `<p>Hello ${escapeHtml(name)},</p><p>Thank you for applying to participate with Valerian Events. We have received your application for <strong>${escapeHtml(eventName)}</strong>.</p><p><strong>Application reference:</strong> ${escapeHtml(ref)}</p><p>Your application is pending review. Our team will contact you with next steps, including an invoice and secure payment instructions if approved. No payment has been taken.</p><p>Regards,<br>Valerian Events Team</p>`);
    return res.status(201).json({ ok: true, reference: ref });
  } catch (error) {
    console.error('Vendor application failed:', error);
    return jsonError(res, 500, 'We could not submit your application right now. Please try again or contact info@valerianevents.com.');
  }
}
