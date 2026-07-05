import React from 'react';
import { FileText, DollarSign, Calendar, ShieldCheck, HelpCircle, ArrowLeft, Layers, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface VendorKitPageProps {
  onBack: () => void;
  onApply: () => void;
}

export default function VendorKitPage({ onBack, onApply }: VendorKitPageProps) {
  return (
    <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="vendor-kit-page">
      {/* Page Header */}
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gold/30 bg-white hover:bg-forest/5 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
          id="vendor-kit-back-btn"
        >
          <ArrowLeft className="h-4 w-4 text-gold" />
          <span>Back to Lineup</span>
        </button>

        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full bg-forest/10 text-forest border border-gold/20 inline-block">
            Exhibitor Resources
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
            Vendor Information Kit
          </h1>
          <p className="text-charcoal/60 font-light text-sm sm:text-base leading-relaxed">
            Everything you need to know about space configurations, curated rates, logistics, and policies to ensure a profitable showcase with Valerian Events.
          </p>
        </div>
      </div>

      {/* Main Structural Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Main Kit content (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Booth Categories & Space Pricing */}
          <div className="p-6 sm:p-8 bg-white border border-gold/15 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center space-x-3 border-b border-gold/10 pb-4">
              <Layers className="h-6 w-6 text-gold" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest uppercase tracking-tight">
                1. Space Options & Pricing Tiers
              </h2>
            </div>

            <p className="text-charcoal/70 text-sm leading-relaxed font-light">
              We offer three premium booth options engineered to showcase culinary artistry and luxury artisanal craft. All configurations are fully integrated into our standard visitor pathways.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Standard Craft */}
              <div className="p-5 rounded-xl bg-[#FAF6F0]/65 border border-gold/20 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-gold font-bold tracking-wider uppercase block">Artisan Booth</span>
                  <h3 className="font-serif text-lg font-bold text-forest">Standard Craft</h3>
                  <p className="text-xs text-charcoal/65 font-light leading-relaxed">
                    Ideal for small-batch spice makers, hot sauce brands, pantry labels, and culinary lifestyle goods.
                  </p>
                </div>
                <div className="pt-3 border-t border-gold/10">
                  <span className="block text-xs text-charcoal/40 font-mono">Booths start at</span>
                  <span className="text-2xl font-bold text-forest font-serif">$350</span>
                  <span className="text-xs text-charcoal/50"> / flat fee</span>
                </div>
              </div>

              {/* Card 2: Culinary Pro */}
              <div className="p-5 rounded-xl bg-forest text-cream border border-gold/30 flex flex-col justify-between space-y-4 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 bg-gold/15 rounded-bl-xl text-[8px] font-bold tracking-widest text-gold uppercase font-mono">
                  Most Requested
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-gold font-bold tracking-wider uppercase block">Gourmet Space</span>
                  <h3 className="font-serif text-lg font-bold text-cream">Culinary Master</h3>
                  <p className="text-xs text-cream/70 font-light leading-relaxed">
                    Designed for active hot food preparation, BBQ smoking setups, premium food trailers, and experiential displays.
                  </p>
                </div>
                <div className="pt-3 border-t border-gold/15">
                  <span className="block text-xs text-cream/40 font-mono">Booths start at</span>
                  <span className="text-2xl font-bold text-gold font-serif">$550</span>
                  <span className="text-xs text-cream/50"> / flat fee</span>
                </div>
              </div>

              {/* Card 3: Mobile Fleet */}
              <div className="p-5 rounded-xl bg-[#FAF6F0]/65 border border-gold/20 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-gold font-bold tracking-wider uppercase block">Mobile Unit</span>
                  <h3 className="font-serif text-lg font-bold text-forest">Food Truck Elite</h3>
                  <p className="text-xs text-charcoal/65 font-light leading-relaxed">
                    Specialized space allocated for luxury food trucks, mobile beverage lounges, and fully equipped vehicle kitchens.
                  </p>
                </div>
                <div className="pt-3 border-t border-gold/10">
                  <span className="block text-xs text-charcoal/40 font-mono">Spots start at</span>
                  <span className="text-2xl font-bold text-forest font-serif">$750</span>
                  <span className="text-xs text-charcoal/50"> / flat fee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: What's Included */}
          <div className="p-6 sm:p-8 bg-white border border-gold/15 rounded-2xl shadow-sm space-y-5">
            <div className="flex items-center space-x-3 border-b border-gold/10 pb-4">
              <Sparkles className="h-6 w-6 text-gold" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest uppercase tracking-tight">
                2. Standard Exhibitor Package
              </h2>
            </div>
            
            <p className="text-charcoal/75 text-sm leading-relaxed font-light">
              Unlike ordinary public events that charge high retail commission splits, Valerian Events maintains a strictly flat-fee system. <strong className="font-bold">You retain 100% of your retail sales.</strong> Every booth booking includes:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-charcoal/75">
              <div className="flex items-start space-x-2.5 p-3 rounded-lg hover:bg-[#FAF6F0] transition-colors duration-200">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-forest font-sans">Premium Canopy Setup</h4>
                  <p className="text-xs font-light text-charcoal/60 mt-0.5">Commercial-grade wind-resistant 10x10 canopy, pre-weighted and anchored securely.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 p-3 rounded-lg hover:bg-[#FAF6F0] transition-colors duration-200">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-forest font-sans">Power & Utility Feeds</h4>
                  <p className="text-xs font-light text-charcoal/60 mt-0.5">Dedicated 110V/15A electric connection ready for equipment. Upgrades up to 220V are available.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 p-3 rounded-lg hover:bg-[#FAF6F0] transition-colors duration-200">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-forest font-sans">Overnight Safety Guard</h4>
                  <p className="text-xs font-light text-charcoal/60 mt-0.5">Secure fenced perimeter with professional overnight watch. Leave your setup intact with peace of mind.</p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 p-3 rounded-lg hover:bg-[#FAF6F0] transition-colors duration-200">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-forest font-sans">Brand Amplification Assets</h4>
                  <p className="text-xs font-light text-charcoal/60 mt-0.5">Listing in the official Valerian digital map directory and premium curated social media showcases.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Step-by-Step Application */}
          <div className="p-6 sm:p-8 bg-white border border-gold/15 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center space-x-3 border-b border-gold/10 pb-4">
              <FileText className="h-6 w-6 text-gold" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest uppercase tracking-tight">
                3. The Application Sequence
              </h2>
            </div>

            <div className="relative border-l border-gold/30 ml-4 pl-6 space-y-6">
              <div className="relative">
                <div className="absolute -left-[35px] top-0 bg-gold text-forest w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono">1</div>
                <h4 className="font-serif text-sm font-bold text-forest uppercase tracking-wide">Submit Inquiry Profiler</h4>
                <p className="text-xs text-charcoal/60 leading-relaxed font-light mt-1">
                  Fill out our online contact/application form detailing your product categories, visual layout desires, and electric requirements.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[35px] top-0 bg-gold text-forest w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono">2</div>
                <h4 className="font-serif text-sm font-bold text-forest uppercase tracking-wide">Curator Selection Audit</h4>
                <p className="text-xs text-charcoal/60 leading-relaxed font-light mt-1">
                  Our jury evaluates applications to prevent oversaturation of specific product sectors. This protects sales density for every selected brand.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[35px] top-0 bg-gold text-forest w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono">3</div>
                <h4 className="font-serif text-sm font-bold text-forest uppercase tracking-wide">Secure Space Deposit</h4>
                <p className="text-xs text-charcoal/60 leading-relaxed font-light mt-1">
                  Upon approval, complete payment of the flat-rate booth fee to lock down your exact event coordinates. No spot is held without complete fee receipt.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Authorized Payments */}
          <div className="p-6 sm:p-8 bg-white border border-gold/15 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center space-x-3 border-b border-gold/10 pb-4">
              <DollarSign className="h-6 w-6 text-gold" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest uppercase tracking-tight">
                4. Payment Protocols
              </h2>
            </div>

            <p className="text-charcoal/70 text-sm leading-relaxed font-light">
              To keep administrative overhead minimal and avoid processing surcharge splits, we facilitate several secure transactional methods. Checks are not accepted.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gold/15 rounded-xl bg-[#FAF6F0]/40 space-y-2">
                <span className="font-serif text-sm font-bold text-forest block">Zelle Secure (Preferred)</span>
                <p className="text-xs font-mono text-charcoal/60 font-light">
                  Send to: <strong className="font-semibold text-forest">vendors@valerianevents.com</strong>
                </p>
                <p className="text-[10px] text-charcoal/40 font-light leading-snug">Instant confirmation with zero added fees. Ideal for rapid lock-in.</p>
              </div>

              <div className="p-4 border border-gold/15 rounded-xl bg-[#FAF6F0]/40 space-y-2">
                <span className="font-serif text-sm font-bold text-forest block">PayPal Merchant Invoice</span>
                <p className="text-xs text-charcoal/60 font-light">
                  A custom secured billing link will be dispatched via email.
                </p>
                <p className="text-[10px] text-charcoal/40 font-light leading-snug">Accepts credit/debit, Venmo, and PayPal credit lines securely.</p>
              </div>

              <div className="p-4 border border-gold/15 rounded-xl bg-[#FAF6F0]/40 space-y-2">
                <span className="font-serif text-sm font-bold text-forest block">Square Register Invoicing</span>
                <p className="text-xs text-charcoal/60 font-light">
                  Pay instantly via credit card, Apple Pay, or Android Pay portal.
                </p>
                <p className="text-[10px] text-charcoal/40 font-light leading-snug">Securely encrypted card processing directly managed by Square systems.</p>
              </div>
            </div>
          </div>

          {/* Section 5: Rules & Compliance Regulations */}
          <div className="p-6 sm:p-8 bg-red-950/5 border border-red-900/15 rounded-2xl space-y-5">
            <div className="flex items-center space-x-3 border-b border-red-900/10 pb-4">
              <AlertTriangle className="h-6 w-6 text-red-700" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-red-950 uppercase tracking-tight">
                5. Mandatory Rules & Compliance
              </h2>
            </div>

            <p className="text-charcoal/75 text-sm leading-relaxed font-light">
              To preserve our luxury curation standard and ensure compliance with municipal fire and medical standards, every exhibitor must adhere to these policies. No exceptions.
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-charcoal/75">
              <div className="flex items-start space-x-2.5">
                <ShieldCheck className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <p className="font-light leading-relaxed">
                  <strong className="font-bold text-forest">Waste Management:</strong> Exhibitors are 100% responsible for their workspace debris and grease disposal. All trash must be transferred to on-site designated commercial dumpsters before event checkout. Standard graywater dumping on fields is strictly prohibited.
                </p>
              </div>

              <div className="flex items-start space-x-2.5">
                <ShieldCheck className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <p className="font-light leading-relaxed">
                  <strong className="font-bold text-forest">Visual Standards:</strong> Canopy banners, custom signage, and active menu boards must be professional and high-contrast. Cardboard signs, handwritten pricing cards, and low-resolution banner graphics are banned to preserve our premier luxury brand atmosphere.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Quick Deadlines and Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Deadlines Box */}
          <div className="p-6 bg-white border border-gold/15 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center space-x-2 text-forest">
              <Calendar className="h-5 w-5 text-gold" />
              <h3 className="font-serif text-sm font-bold tracking-wider uppercase">Important Deadlines</h3>
            </div>

            <div className="space-y-4">
              <div className="pb-3 border-b border-gold/10 space-y-1">
                <span className="block text-[10px] text-charcoal/40 font-mono tracking-wider uppercase">July Lineups (LA/Austin)</span>
                <span className="block text-xs font-bold text-forest">July 20, 2026</span>
                <span className="block text-xs text-charcoal/50 font-light">Curation review closes for summer slots.</span>
              </div>

              <div className="pb-3 border-b border-gold/10 space-y-1">
                <span className="block text-[10px] text-charcoal/40 font-mono tracking-wider uppercase">COI & Permit Submissions</span>
                <span className="block text-xs font-bold text-forest">14 Days Before Event</span>
                <span className="block text-xs text-charcoal/50 font-light">All insurance credentials must be finalized.</span>
              </div>

              <div className="space-y-1">
                <span className="block text-[10px] text-charcoal/40 font-mono tracking-wider uppercase">Late Entry Waitlist Clears</span>
                <span className="block text-xs font-bold text-red-800">7 Days Before Event</span>
                <span className="block text-xs text-charcoal/50 font-light">Unpaid spaces are automatically allocated to waitlist applicants.</span>
              </div>
            </div>
          </div>

          {/* Action Box */}
          <div className="p-6 bg-forest rounded-2xl border border-gold/30 text-cream space-y-5 text-center">
            <h4 className="font-serif text-lg font-bold text-gold uppercase tracking-wider">Ready to apply?</h4>
            <p className="text-xs text-cream/70 font-light leading-relaxed">
              Unlock premier consumer access. Submit your brand concept, booth sizes, and electrical requirements directly to our curators.
            </p>
            <button
              onClick={onApply}
              className="w-full py-3 px-4 rounded-xl bg-gold hover:bg-gold/90 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-lg"
            >
              Submit Application
            </button>
          </div>

          {/* Contact Support */}
          <div className="p-6 bg-[#FAF6F0]/40 border border-gold/15 rounded-2xl space-y-3">
            <h4 className="font-serif text-xs font-bold text-forest uppercase tracking-wider flex items-center space-x-1.5">
              <HelpCircle className="h-4 w-4 text-gold" />
              <span>Need Assistance?</span>
            </h4>
            <p className="text-xs text-charcoal/60 leading-relaxed font-light">
              For custom power installations, double booth spaces, or sponsorship integrations, consult with our operations concierge:
            </p>
            <div className="pt-2 border-t border-gold/10 text-xs font-mono text-forest/80 space-y-1">
              <div>Email: vendors@valerianevents.com</div>
              <div>Phone: (727) 899-6434</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
