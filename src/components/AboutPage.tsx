import React from 'react';
import { ArrowLeft, Users, ShieldCheck, Heart, Sparkles, Compass, Award, Calendar, Mail, Phone, Clock, FileCheck, Building, CheckSquare } from 'lucide-react';
import { FOUNDER_DATA } from '../data';

interface AboutPageProps {
  onBack: () => void;
  onContact: () => void;
}

export default function AboutPage({ onBack, onContact }: AboutPageProps) {
  return (
    <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="about-us-page">
      {/* Back navigation button */}
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gold/30 bg-white hover:bg-forest/5 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
          id="about-back-btn"
        >
          <ArrowLeft className="h-4 w-4 text-gold" />
          <span>Back to Lineup</span>
        </button>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full bg-forest/10 text-forest border border-gold/20 inline-block">
            Our Story & Creed
          </span>
          <h1 className="font-serif text-3.5xl sm:text-4.5xl md:text-5.5xl font-bold text-forest tracking-tight">
            Connecting Flavor, Craft, & Community
          </h1>
          <p className="text-charcoal/65 font-light text-sm sm:text-base leading-relaxed">
            At Valerian Events, we believe the best stories are shared around a table. We design, coordinate, and host premier culinary and artisanal marketplaces across America’s most vibrant metropolitan cities.
          </p>
        </div>
      </div>

      {/* Narrative & Visual Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Narrative Box */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest uppercase tracking-tight">
            Where Flavor Meets Festival
          </h2>
          <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed font-light">
            Founded with a vision to transcend typical street food fairs, Valerian Events creates highly curated culinary worlds. We replace high-friction retail commission models with an honest, flat-fee exhibitor package. This empowers visionary makers—from low-and-slow BBQ pitmasters to micro-batch hot honey designers—to keep 100% of their earnings.
          </p>
          <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed font-light">
            We are dedicated to high visual standards, ample spacing, and intentional layout geometry. This ensures every vendor enjoys high consumer exposure while visitors discover a spacious, comfortable, and beautifully styled festival environment.
          </p>

          {/* Core Values Rows */}
          <div className="space-y-4 pt-4 border-t border-gold/15">
            <div className="flex items-start space-x-3.5">
              <Compass className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-forest text-sm uppercase tracking-wider">Aesthetic Integrity</h4>
                <p className="text-xs text-charcoal/55 font-light leading-relaxed mt-0.5">
                  No handwritten cardboard signs or cluttered rails. We build clear, high-contrast, beautiful physical zones that respect the premium artistry of your products.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <Award className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-forest text-sm uppercase tracking-wider">Unmatched Curation</h4>
                <p className="text-xs text-charcoal/55 font-light leading-relaxed mt-0.5">
                  We limit our rosters by category. By preventing saturated sectors, we protect the transactional success of our vendors while keeping the overall collection distinct.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Showcase Block */}
        <div className="p-8 sm:p-10 bg-forest text-cream rounded-3xl border border-gold/20 shadow-xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full pointer-events-none" />
          <div className="space-y-2">
            <span className="text-[10px] text-gold font-mono tracking-widest uppercase block font-semibold">THE VALERIAN PROMISE</span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug text-cream">
              An Elevated Benchmark for Food and Craft Curation
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-cream/75 font-light leading-relaxed">
            We don’t believe in mass scale. We believe in meticulous selection. Every spice maker, every mobile chef, and every woodcraft master in our marketplace has been juried and selected for their commitment to authenticity, execution, and local heritage.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gold/15 text-center">
            <div>
              <span className="block text-2xl font-serif font-bold text-gold">15+</span>
              <span className="block text-[9px] text-cream/40 uppercase tracking-widest font-mono">Years Exp</span>
            </div>
            <div>
              <span className="block text-2xl font-serif font-bold text-gold">100%</span>
              <span className="block text-[9px] text-cream/40 uppercase tracking-widest font-mono">Flat Fee</span>
            </div>
            <div>
              <span className="block text-2xl font-serif font-bold text-gold">15k+</span>
              <span className="block text-[9px] text-cream/40 uppercase tracking-widest font-mono">Avg Patrons</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Milestones Timeline */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono text-gold font-bold tracking-widest uppercase block">Historic Milestones</span>
          <h2 className="font-serif text-2.5xl font-bold text-forest uppercase tracking-tight">Our Journey So Far</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-gold/15 rounded-2xl relative space-y-2.5">
            <span className="text-xs font-mono font-bold text-gold">2011 • The Genesis</span>
            <h4 className="font-serif font-bold text-forest">First Showcase</h4>
            <p className="text-xs text-charcoal/60 font-light leading-relaxed">
              Alex Silver launches the first experimental block-party lineup with only 8 small-batch spice makers and local hot food chefs.
            </p>
          </div>

          <div className="p-6 bg-white border border-gold/15 rounded-2xl relative space-y-2.5">
            <span className="text-xs font-mono font-bold text-gold">2016 • Coast to Coast</span>
            <h4 className="font-serif font-bold text-forest">Multicity Expansion</h4>
            <p className="text-xs text-charcoal/60 font-light leading-relaxed">
              Valerian expands operations across Texas and the Florida Gulf, connecting high-end culinary concepts with affluent regional markets.
            </p>
          </div>

          <div className="p-6 bg-white border border-gold/15 rounded-2xl relative space-y-2.5">
            <span className="text-xs font-mono font-bold text-gold">2021 • Curation Reboot</span>
            <h4 className="font-serif font-bold text-forest">Flat-Fee Evolution</h4>
            <p className="text-xs text-charcoal/60 font-light leading-relaxed">
              We officially ban standard retail revenue splits. Implementing a 100% flat-fee layout model, putting the maker’s success first.
            </p>
          </div>

          <div className="p-6 bg-forest border border-gold/35 rounded-2xl relative space-y-2.5 text-cream shadow-md">
            <span className="text-xs font-mono font-bold text-gold">2026 • Modern Hub</span>
            <h4 className="font-serif font-bold text-cream">The Valerian Standard</h4>
            <p className="text-xs text-cream/70 font-light leading-relaxed">
              With a roster of thousands of vetted makers nationwide, we launch our curated digital portal alongside premium physical rosters.
            </p>
          </div>
        </div>
      </div>

      {/* Government Licenses & Regulatory Approvals */}
      <div className="space-y-8 pt-4">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono text-gold font-bold tracking-widest uppercase block">Regulatory Standards & Compliance</span>
          <h2 className="font-serif text-2.5xl font-bold text-forest uppercase tracking-tight">Approved Government Licenses & Permits</h2>
          <p className="text-xs sm:text-sm text-charcoal/60 font-light max-w-xl mx-auto">
            Valerian Events operates in strict compliance with federal, state, and county administrative agencies to guarantee a safe, fully regulated festival workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#FAF6F0]/50 border border-gold/15 rounded-2xl space-y-4 hover:border-gold/30 transition-all duration-300">
            <div className="p-3 bg-forest/5 rounded-xl w-fit">
              <FileCheck className="h-6 w-6 text-gold" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif font-bold text-forest text-sm sm:text-base uppercase tracking-wider">Health Permits & TFSE</h4>
              <p className="text-xs text-charcoal/65 font-light leading-relaxed">
                Active Temporary Food Facility & Temporary Food Service Establishment (TFSE) multi-city clearances approved by Los Angeles County Department of Public Health, Austin Public Health, and Florida DBPR.
              </p>
            </div>
            <div className="pt-2 border-t border-gold/10 flex items-center space-x-1.5 text-[9px] font-mono text-forest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>STATE HEALTH DEPT CLEARANCE</span>
            </div>
          </div>

          <div className="p-6 bg-[#FAF6F0]/50 border border-gold/15 rounded-2xl space-y-4 hover:border-gold/30 transition-all duration-300">
            <div className="p-3 bg-forest/5 rounded-xl w-fit">
              <ShieldCheck className="h-6 w-6 text-gold" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif font-bold text-forest text-sm sm:text-base uppercase tracking-wider">General Liability Insurance</h4>
              <p className="text-xs text-charcoal/65 font-light leading-relaxed">
                Underwritten with $5,000,000 commercial aggregate general liability and multi-tenant indemnity coverage. Every registered exhibitor and venue benefits from verified co-insured protections.
              </p>
            </div>
            <div className="pt-2 border-t border-gold/10 flex items-center space-x-1.5 text-[9px] font-mono text-forest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>$5M AGGREGATE COI SHIELD</span>
            </div>
          </div>

          <div className="p-6 bg-[#FAF6F0]/50 border border-gold/15 rounded-2xl space-y-4 hover:border-gold/30 transition-all duration-300">
            <div className="p-3 bg-forest/5 rounded-xl w-fit">
              <Building className="h-6 w-6 text-gold" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif font-bold text-forest text-sm sm:text-base uppercase tracking-wider">Liquor & Spirits Permits</h4>
              <p className="text-xs text-charcoal/65 font-light leading-relaxed">
                Seamless municipal craft beverage and liquor activation permits processed and filed in strict collaboration with the California ABC, Texas TABC, and Florida ABT agencies.
              </p>
            </div>
            <div className="pt-2 border-t border-gold/10 flex items-center space-x-1.5 text-[9px] font-mono text-forest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>BEVERAGE CONTROL COMPLIANT</span>
            </div>
          </div>

          <div className="p-6 bg-[#FAF6F0]/50 border border-gold/15 rounded-2xl space-y-4 hover:border-gold/30 transition-all duration-300">
            <div className="p-3 bg-forest/5 rounded-xl w-fit">
              <CheckSquare className="h-6 w-6 text-gold" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif font-bold text-forest text-sm sm:text-base uppercase tracking-wider">Assembly & Fire Safety</h4>
              <p className="text-xs text-charcoal/65 font-light leading-relaxed">
                Fully vetted site plans adhering strictly to National Fire Protection Association (NFPA) standards, municipal crowd-flow thresholds, and emergency evacuation lane widths.
              </p>
            </div>
            <div className="pt-2 border-t border-gold/10 flex items-center space-x-1.5 text-[9px] font-mono text-forest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>NFPA COMPLIANCE APPROVED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Founder Spot */}
      <div className="p-8 sm:p-10 bg-[#FAF6F0]/70 border border-gold/15 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Founder Photo */}
        <div className="md:col-span-4 flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 rounded-full border-2 border-gold/30 scale-105 group-hover:scale-110 transition-all duration-300" />
            <img
              src={FOUNDER_DATA.avatar}
              alt="Valerian"
              className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-full shadow-lg border-2 border-gold relative z-10 filter grayscale hover:grayscale-0 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Bio Details */}
        <div className="md:col-span-8 space-y-5">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-semibold tracking-wider text-gold uppercase block">FOUNDER & LEAD ORGANIZER</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest">Valerian — The Organizer</h3>
            <span className="block text-xs font-mono text-charcoal/50">Valerian Events LLC</span>
          </div>

          <div className="space-y-4 text-charcoal/70 text-sm leading-relaxed font-light">
            <p>
              Valerian is the founder and driving force behind Valerian Events, an independent event organization company based in the United States specializing in food and spirits festivals.
            </p>
            <p>
              Valerian Events is a small company with a big vision — creating festival experiences that give vendors a real platform to grow their brand, connect with new customers, and do business in an environment built for success. Every event is personally organized and curated, from vendor selection to venue, atmosphere, and entertainment.
            </p>
            <p>
              The company currently operates three flagship festivals across Los Angeles, Miami, and Austin — bringing together thousands of food lovers, local vendors, artisan brands, and food entrepreneurs under one roof.
            </p>
            <p>
              Valerian is not a corporation. It is an independent organizer who takes pride in knowing every vendor by name, understanding what they need, and delivering events that actually move the needle for small and growing businesses.
            </p>
            <p className="font-serif font-bold text-forest italic pt-1">
              Small company. High standards. Real results.
            </p>
          </div>

          {/* Quick contact rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gold/10 text-xs sm:text-sm font-mono text-charcoal/75">
            <div className="flex items-center space-x-2.5">
              <Mail className="h-4.5 w-4.5 text-gold shrink-0" />
              <span>Email: <a href={`mailto:${FOUNDER_DATA.email}`} className="text-forest hover:underline font-semibold">{FOUNDER_DATA.email}</a></span>
            </div>

            <div className="flex items-center space-x-2.5">
              <svg
                className="h-4.5 w-4.5 text-[#25D366] shrink-0 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
              </svg>
              <span>WhatsApp: <a href={`https://wa.me/1${FOUNDER_DATA.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-forest hover:underline font-semibold">{FOUNDER_DATA.phone}</a></span>
            </div>

            <div className="flex items-start space-x-2.5 sm:col-span-2">
              <Clock className="h-4.5 w-4.5 text-gold shrink-0 mt-0.5" />
              <p className="font-light text-xs text-charcoal/60">
                <strong className="font-bold text-forest uppercase text-[10px] tracking-wider font-sans">Guaranteed Response:</strong> {FOUNDER_DATA.commitment}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="p-8 bg-forest border border-gold/30 rounded-3xl text-cream text-center space-y-4 max-w-3xl mx-auto shadow-lg">
        <Sparkles className="h-8 w-8 text-gold mx-auto" />
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold uppercase tracking-wide">
          Be Part of Our Roster
        </h3>
        <p className="text-xs sm:text-sm text-cream/70 font-light leading-relaxed max-w-xl mx-auto">
          Are you ready to showcase your culinary artistry or artisanal handcrafted goods to thousands of affluent food lovers? Connect with Valerian and our curation directors today.
        </p>
        <button
          onClick={onContact}
          className="inline-flex items-center space-x-2.5 py-3 px-6 rounded-xl bg-gold hover:bg-gold/90 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-md"
        >
          <span>Get in Touch</span>
        </button>
      </div>
    </div>
  );
}
