import React from 'react';
import { ArrowLeft, ShieldCheck, Mail, CreditCard } from 'lucide-react';
import { Event } from '../types';

interface VendorPaymentPageProps {
  event: Event;
  onBack: () => void;
  onSuccessReturn?: () => void;
}

export default function VendorPaymentPage({ event, onBack }: VendorPaymentPageProps) {
  return (
    <main className="min-h-[60vh] max-w-3xl mx-auto px-4 py-16">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-forest hover:text-gold mb-8">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <section className="bg-white border border-gold/30 rounded-2xl p-8 md:p-12 text-center shadow-xl">
        <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-forest" />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-3">Secure payment notice</p>
        <h1 className="font-serif text-3xl text-forest font-bold mb-4">Payment portal temporarily unavailable</h1>
        <p className="text-charcoal/75 leading-relaxed mb-3">
          Your application for <strong>{event.title}</strong> can still be submitted for review.
          Our team will send an invoice and a secure payment link after your application is approved.
        </p>
        <p className="text-sm text-charcoal/65 mb-7">
          For your protection, do not send card numbers, expiry dates, or security codes by email or through this website.
        </p>
        <a href="mailto:info@valerianevents.com" className="inline-flex items-center gap-2 rounded-xl bg-forest text-white px-6 py-3 text-sm font-bold">
          <Mail className="w-4 h-4" /> Contact Vendor Support
        </a>
      </section>
    </main>
  );
}
