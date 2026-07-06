import React from 'react';
import { ShieldAlert, Scale, ArrowLeft, Calendar, FileText, HelpCircle, CheckCircle2 } from 'lucide-react';

interface TermsPageProps {
  onBack: () => void;
}

export default function TermsPage({ onBack }: TermsPageProps) {
  return (
    <div className="fade-in max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="terms-of-service-page">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gold/30 bg-white hover:bg-forest/5 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
        id="terms-back-btn"
      >
        <ArrowLeft className="h-4 w-4 text-gold" />
        <span>Back to Lineup</span>
      </button>

      {/* Header section */}
      <div className="text-center space-y-3 max-w-2xl mx-auto pb-4 border-b border-gold/15">
        <Scale className="h-10 w-10 text-gold mx-auto" />
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest uppercase tracking-wide">
          Terms of Service
        </h1>
        <p className="text-charcoal/50 text-xs sm:text-sm font-mono uppercase tracking-wider">
          Last Updated: July 4, 2026 • Legal Agreement
        </p>
      </div>

      {/* Legal Text Sections */}
      <div className="p-8 sm:p-10 bg-white border border-gold/15 rounded-2xl shadow-sm space-y-8 text-charcoal/85 leading-relaxed font-light text-sm md:text-base">
        
        {/* Intro */}
        <div className="space-y-3">
          <h3 className="font-serif text-lg font-bold text-forest">Governing Agreement</h3>
          <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
            Welcome to <strong className="font-semibold text-forest">Valerian Events</strong>. This agreement governs the legal terms and operational codes of conduct between Valerian Events LLC ("Company", "We", "Us") and all exhibiting vendors, sponsors, suppliers, or ticket-holding attendees ("Exhibitor", "You") participating in or accessing our physical food festivals, marketplace lineups, or digital brand directories.
          </p>
          <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
            By submitting an application form, completing space registration, paying deposit funds, or purchasing event admission tickets, you agree to comply with all covenants, declarations, and binding operational guidelines detailed herein.
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-3 pt-6 border-t border-gold/10">
          <h3 className="font-serif text-lg font-bold text-forest uppercase tracking-wide flex items-center space-x-2">
            <span className="text-gold font-mono mr-1.5">1.0</span>
            <span>Fee Collections, Space Deposits, & Booking Lock-In</span>
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal/75">
            1.1 Approval to exhibit does not guarantee coordinates allocation. Allocation is locked solely upon complete receipt of the flat-rate booth fee.
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal/75">
            1.2 Complete transactional balances must be cleared no less than fourteen (14) calendar days prior to physical festival open. If balances remain pending, Valerian Events reserves the right to void booking agreements and transfer coordinates to waitlisted operators.
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal/75">
            1.3 We authorize payments via Zelle (<span className="font-mono text-forest">alex@valerianevents.com</span>), secure PayPal invoices, and digital Square register links. Alternative methods must be approved in writing by operations coordinators.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-3 pt-6 border-t border-gold/10">
          <h3 className="font-serif text-lg font-bold text-forest uppercase tracking-wide flex items-center space-x-2">
            <span className="text-gold font-mono mr-1.5">2.0</span>
            <span>Refund, Cancellation, & Weather Transfer Policy</span>
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal/75">
            2.1 <strong className="font-semibold text-forest">All Booth Registrations are Strictly Non-Refundable.</strong> Because we allocate immense logistical, promotional, and marketing funds in advance of each curate event, we cannot process direct cash refunds under any standard business circumstances.
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal/75">
            2.2 If an Exhibitor submits a written cancellation notice more than thirty (30) calendar days before physical event load-in, We may, at our sole operational discretion, issue a credit voucher redeemable toward a future Valerian Events lineup within twelve (12) calendar months. Cancellations within thirty (30) days of load-in yield a total forfeiture of paid fees.
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal/75">
            2.3 <strong className="font-semibold text-forest">Force Majeure & Inclement Weather:</strong> Valerian Events LLC is not liable for weather disruptions, heavy rain, acts of God, city municipality intervention, civil unrest, or state-mandated health closures. In such cases, events will be rescheduled, and all booked vendor slots will automatically transfer to the new date.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-3 pt-6 border-t border-gold/10">
          <h3 className="font-serif text-lg font-bold text-forest uppercase tracking-wide flex items-center space-x-2">
            <span className="text-gold font-mono mr-1.5">3.0</span>
            <span>Liability, Property Indemnification, & COI mandates</span>
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal/75">
            3.1 Valerian Events LLC, including its founders, staff, contractors, and venue host partners, is not liable for lost, stolen, damaged, or destroyed commercial property, equipment, food inventories, or mobile food truck assets.
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal/75">
            3.2 All hot-food preparation exhibitors, smokers, or operators utilizing high-wattage equipment must maintain commercial general liability insurance of no less than $1,000,000. You must submit a Certificate of Insurance (COI) designating Valerian Events LLC as an additional insured.
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal/75">
            3.3 Exhibitors agree to completely indemnify, defend, and hold harmless Valerian Events LLC from any legal claims, bodily injuries, illnesses, or merchant disputes arising from products sold or distributed at our venues.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-3 pt-6 border-t border-gold/10">
          <h3 className="font-serif text-lg font-bold text-forest uppercase tracking-wide flex items-center space-x-2">
            <span className="text-gold font-mono mr-1.5">4.0</span>
            <span>Exhibitor Presentation, Compliance, & Conduct Codes</span>
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal/75">
            4.1 Exhibitors must maintain high aesthetic standards. Booth setups must look professional, tidy, and fit our curated luxury design standards. Handwritten cardboard signs and low-resolution plastic banners are forbidden.
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal/75">
            4.2 Food preparers must adhere strictly to local health department permits and municipal codes. Non-compliance resulting in a closure by municipal safety inspectors is the sole financial responsibility of the Exhibitor.
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-charcoal/75">
            4.3 Loud sound systems, flashing strobe setups, or solicitation outside of your pre-allocated booth square footage boundary is prohibited unless pre-authorized by our lead curation director.
          </p>
        </div>

        {/* Legal Disclaimer banner */}
        <div className="p-4 sm:p-5 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-amber-900">
          <ShieldAlert className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="font-bold">Important Notice:</strong> By submitting your payment or digital application forms, you recognize that you have read, comprehended, and agreed to every clause of this Terms of Service agreement. Non-compliance with standard regulations may yield immediate event removal without fee recourse.
          </div>
        </div>

      </div>

      {/* Support Box */}
      <div className="p-6 bg-forest text-cream rounded-2xl border border-gold/30 text-center max-w-2xl mx-auto space-y-3">
        <HelpCircle className="h-8 w-8 text-gold mx-auto" />
        <h4 className="font-serif text-base font-bold text-gold uppercase tracking-wider">Legal Inquiries?</h4>
        <p className="text-xs text-cream/70 font-light leading-relaxed max-w-md mx-auto">
          If your legal counsel, compliance officer, or insurance agency requires custom clauses, please send your inquiry to our lead operations office.
        </p>
        <div className="pt-2 text-xs font-mono text-gold font-medium">
          alex@valerianevents.com • (727) 633-6611
        </div>
      </div>
    </div>
  );
}
