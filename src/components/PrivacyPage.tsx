import React from 'react';
import { Eye, ShieldCheck, ArrowLeft, Mail, Lock, Server, FileText, HelpCircle } from 'lucide-react';

interface PrivacyPageProps {
  onBack: () => void;
}

export default function PrivacyPage({ onBack }: PrivacyPageProps) {
  return (
    <div className="fade-in max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="privacy-policy-page">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gold/30 bg-white hover:bg-forest/5 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
        id="privacy-back-btn"
      >
        <ArrowLeft className="h-4 w-4 text-gold" />
        <span>Back to Lineup</span>
      </button>

      {/* Header section */}
      <div className="text-center space-y-3 max-w-2xl mx-auto pb-4 border-b border-gold/15">
        <Eye className="h-10 w-10 text-gold mx-auto" />
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest uppercase tracking-wide">
          Privacy Policy
        </h1>
        <p className="text-charcoal/50 text-xs sm:text-sm font-mono uppercase tracking-wider">
          Last Updated: July 4, 2026 • Security Guidelines
        </p>
      </div>

      {/* Main Privacy Layout */}
      <div className="p-8 sm:p-10 bg-white border border-gold/15 rounded-2xl shadow-sm space-y-8 text-charcoal/85 leading-relaxed font-light text-sm md:text-base">
        
        {/* Intro */}
        <div className="space-y-3">
          <h3 className="font-serif text-lg font-bold text-forest">Our Privacy Commitment</h3>
          <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
            At <strong className="font-semibold text-forest">Valerian Events LLC</strong>, we hold your business credentials and personal details in high regard. This Privacy Policy details how we collect, store, secure, and manage information collected through our web forms, application portals, newsletter signups, or direct phone and email inquiries.
          </p>
          <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
            We are dedicated to maintaining the trust of our vendor network, sponsors, and attendees. We will never sell, lease, or distribute your email databases, phone listings, or financial credentials to third-party marketing companies.
          </p>
        </div>

        {/* Info Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gold/10">
          <div className="p-5 border border-gold/15 rounded-xl space-y-2">
            <Mail className="h-5 w-5 text-gold" />
            <h4 className="font-serif text-sm font-bold text-forest uppercase tracking-wide">Data Collected</h4>
            <p className="text-xs text-charcoal/65 font-light leading-relaxed">
              We gather details such as company name, contact person, email, phone, business description, social media coordinates, booth sizing desires, and permit categories.
            </p>
          </div>

          <div className="p-5 border border-gold/15 rounded-xl space-y-2">
            <Lock className="h-5 w-5 text-gold" />
            <h4 className="font-serif text-sm font-bold text-forest uppercase tracking-wide">How We Store It</h4>
            <p className="text-xs text-charcoal/65 font-light leading-relaxed">
              All form submissions are secured utilizing standard SSL/TLS encryption during transit and saved on protected, firewall-shielded server clusters.
            </p>
          </div>

          <div className="p-5 border border-gold/15 rounded-xl space-y-2">
            <Server className="h-5 w-5 text-gold" />
            <h4 className="font-serif text-sm font-bold text-forest uppercase tracking-wide">Data Usage</h4>
            <p className="text-xs text-charcoal/65 font-light leading-relaxed">
              Collected info is used strictly to curate festival lineups, issue merchant billing invoices, verify insurance coverages, and dispatch logistics info.
            </p>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="space-y-6 pt-6 border-t border-gold/10">
          
          <div className="space-y-2">
            <h3 className="font-serif text-base font-bold text-forest">1.0 Information Collection Sources</h3>
            <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
              We collect information directly from you when you actively fill out our online Contact & Application form, register for event newsletters, or when you correspond with our coordinators via email or phone. 
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-base font-bold text-forest">2.0 Sharing of Collected Information</h3>
            <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
              We restrict access to your information to operations managers who require it to finalize event layouts and coordinate municipal clearances. We share relevant contact info with city safety inspectors, fire marshals, or health department representatives strictly as required by local municipal ordinance.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-base font-bold text-forest">3.0 Digital Storage Security</h3>
            <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
              We utilize multiple layers of physical, technological, and procedural defenses to guard data against leakages or unauthorized modifications. For payment transactions, we rely on established processors (Zelle, PayPal, Square) who execute payments directly on their secure, PCI-compliant infrastructure. We do not store or capture raw credit card details on our local servers.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-base font-bold text-forest">4.0 Cookies & Retargeting Tech</h3>
            <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
              Our web services utilize basic browser cookies to store user preference filters and compile anonymous site performance metrics via analytics. We do not employ intrusive tracking mechanisms or trade your cookies with behavioral advertisement networks.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-base font-bold text-forest">5.0 Control Over Your Personal Information</h3>
            <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">
              You maintain full rights to verify, modify, or permanently purge your database records from our files. Simply transmit a removal request to our lead operations email, and our technical staff will process the request in 48 business hours.
            </p>
          </div>

        </div>

        {/* Safety statement */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#FAF6F0] border border-gold/20 flex items-start space-x-3 text-forest">
          <ShieldCheck className="h-5 w-5 text-gold shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed font-light text-charcoal/75">
            <strong className="font-bold text-forest">Security Assurance:</strong> We use industry-standard encryption protocols. Any changes to our data protection policies will be published on this URL and communicated directly to approved exhibitors in our registry.
          </div>
        </div>

      </div>

      {/* Support Box */}
      <div className="p-6 bg-forest text-cream rounded-2xl border border-gold/30 text-center max-w-2xl mx-auto space-y-3">
        <HelpCircle className="h-8 w-8 text-gold mx-auto" />
        <h4 className="font-serif text-base font-bold text-gold uppercase tracking-wider">Privacy Concerns?</h4>
        <p className="text-xs text-cream/70 font-light leading-relaxed max-w-md mx-auto">
          If you have questions about how we manage your brand details, or if you wish to remove your files from our email roster, reach out directly.
        </p>
        <div className="pt-2 text-xs font-mono text-gold font-medium">
          alexsilver3896@gmail.com • (727) 899-6434
        </div>
      </div>
    </div>
  );
}
