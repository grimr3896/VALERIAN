import React from 'react';
import { ArrowLeft, ShieldCheck, CheckCircle2, Clock, HelpCircle, FileText, Mail } from 'lucide-react';

interface RefundPolicyPageProps {
  onBack: () => void;
  onContact: () => void;
}

export default function RefundPolicyPage({ onBack, onContact }: RefundPolicyPageProps) {
  return (
    <div className="fade-in max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="refund-policy-page">
      {/* Back Button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gold/30 bg-white hover:bg-forest/5 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
          id="refund-back-btn"
        >
          <ArrowLeft className="h-4 w-4 text-gold" />
          <span>Back to Lineup</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full bg-forest/10 text-forest border border-gold/20 inline-flex items-center space-x-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" />
          <span>OFFICIAL VENDOR POLICY</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest uppercase tracking-tight">
          Refund & Cancellation Policy
        </h1>
        <p className="text-charcoal/70 text-sm sm:text-base font-light leading-relaxed">
          Valerian Events operates with complete fee transparency and strong vendor protections.
        </p>
      </div>

      {/* Core Policy Points */}
      <div className="space-y-6">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gold/25 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-forest">
            <div className="p-2.5 rounded-xl bg-forest/5 text-forest">
              <CheckCircle2 className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-serif text-xl font-bold uppercase tracking-wide">
              1. 100% Unconfirmed Application Guarantee
            </h3>
          </div>
          <p className="text-sm text-charcoal/75 font-light leading-relaxed">
            If your vendor or sponsor application is not approved and confirmed with an assigned booth space within <strong>14 calendar days</strong> of submission, your payment is automatically refunded in full (100%) to your original payment method. Zero processing fees are deducted.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gold/25 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-forest">
            <div className="p-2.5 rounded-xl bg-forest/5 text-forest">
              <Clock className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-serif text-xl font-bold uppercase tracking-wide">
              2. Vendor Cancellation Timelines
            </h3>
          </div>
          <ul className="space-y-3 text-sm text-charcoal/75 font-light">
            <li className="flex items-start space-x-2">
              <span className="font-bold text-forest min-w-[140px]">• 30+ Days Prior:</span>
              <span>Full refund minus a flat $25 administrative processing fee, or 100% transfer credit to any future 2026 festival.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-bold text-forest min-w-[140px]">• 15–29 Days Prior:</span>
              <span>50% refund or 100% transfer credit toward any upcoming city festival.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-bold text-forest min-w-[140px]">• Under 14 Days:</span>
              <span>Non-refundable due to finalized site layout, electrical engineering, and municipal health permits already submitted. Transfer credit may be granted for medical or documented emergencies.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gold/25 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-forest">
            <div className="p-2.5 rounded-xl bg-forest/5 text-forest">
              <ShieldCheck className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-serif text-xl font-bold uppercase tracking-wide">
              3. Rain-or-Shine & Weather Contingency
            </h3>
          </div>
          <p className="text-sm text-charcoal/75 font-light leading-relaxed">
            All Valerian Events venues feature covered or clear-span weather contingencies. In the rare event of extreme severe weather (e.g. municipal emergency declarations, hurricane warnings, or mandatory park closures), 100% event credits will be issued for the rescheduled date or any future festival stop.
          </p>
        </div>
      </div>

      {/* Support Box */}
      <div className="p-6 rounded-2xl bg-forest text-cream flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif text-lg font-bold text-gold">Questions about your payment or refund request?</h4>
          <p className="text-xs text-cream/70 font-light">Contact our billing concierge at info@valerianevents.com.</p>
        </div>
        <button
          onClick={onContact}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-gold hover:bg-gold/90 text-forest text-xs font-bold tracking-widest uppercase transition-all shadow-md cursor-pointer"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
}
