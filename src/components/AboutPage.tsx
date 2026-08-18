import React from 'react';
import { 
  ArrowLeft, 
  Users, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  Compass, 
  Award, 
  Calendar, 
  Mail, 
  Phone, 
  Clock, 
  FileCheck, 
  Building, 
  CheckSquare,
  Crown,
  TrendingUp,
  Handshake,
  ChevronRight,
  CheckCircle2,
  Rocket,
  MapPin,
  Briefcase
} from 'lucide-react';
import { TEAM_MEMBERS, TRACK_RECORD_DATA, FOUNDER_DATA } from '../data';

interface AboutPageProps {
  onBack: () => void;
  onContact: () => void;
  onNavigateToSponsorship?: () => void;
}

export default function AboutPage({ onBack, onContact, onNavigateToSponsorship }: AboutPageProps) {
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
          <span className="px-3.5 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full bg-forest/10 text-forest border border-gold/20 inline-block">
            LEADERSHIP, INTEGRITY & TRACK RECORD
          </span>
          <h1 className="font-serif text-3.5xl sm:text-4.5xl md:text-5.5xl font-bold text-forest tracking-tight">
            Connecting Flavor, Craft, & Community
          </h1>
          <p className="text-charcoal/75 font-light text-sm sm:text-base leading-relaxed">
            Valerian Events is an independent festival and experiential marketplace production company. We design and host curated culinary, craft beverage, and artisanal festivals across America’s most vibrant metropolitan hubs.
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
          <p className="text-charcoal/75 text-sm sm:text-base leading-relaxed font-light">
            Founded with a vision to eliminate the predatory 20%–35% gross revenue cuts common in commercial festivals, Valerian Events offers a transparent flat-fee exhibitor package. This guarantees that whether you smoke 500 lbs of brisket or sell out your artisan hot sauces, <strong>you keep 100% of your festival sales</strong>.
          </p>
          <p className="text-charcoal/75 text-sm sm:text-base leading-relaxed font-light">
            Every festival layout is engineered with generous walking corridors, dedicated utility drops, clear-span canopies, and strict category caps to ensure each exhibitor maximizes attendee foot-traffic and transactions.
          </p>

          {/* Core Values Rows */}
          <div className="space-y-4 pt-4 border-t border-gold/15">
            <div className="flex items-start space-x-3.5">
              <Compass className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-forest text-sm uppercase tracking-wider">Aesthetic Integrity</h4>
                <p className="text-xs text-charcoal/60 font-light leading-relaxed mt-0.5">
                  No handwritten cardboard signs or cluttered rails. We build clean, high-contrast, beautiful physical zones that elevate your brand and product presentation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <Award className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-forest text-sm uppercase tracking-wider">Unmatched Curation & Category Caps</h4>
                <p className="text-xs text-charcoal/60 font-light leading-relaxed mt-0.5">
                  We limit our rosters per category (e.g. max 3 BBQ pitmasters, 4 dessert creators per event) to eliminate saturation and maximize sales volume.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <Crown className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-forest text-sm uppercase tracking-wider">Strategic Brand Sponsorships</h4>
                <p className="text-xs text-charcoal/60 font-light leading-relaxed mt-0.5">
                  Curated corporate sponsorships and headline stage integrations that deliver authentic brand value and high impressions without commercial clutter.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Metric Board */}
        <div className="p-8 sm:p-10 bg-forest text-cream rounded-3xl border border-gold/30 shadow-xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-gold font-bold tracking-widest uppercase block">THE VALERIAN PROMISE</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold">Engineered For Producer Success</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-gold/15 space-y-1">
              <span className="font-serif text-3xl font-bold text-gold">100%</span>
              <p className="text-xs text-cream/70 font-light">Sales Retained by Vendors (0% Commission)</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-gold/15 space-y-1">
              <span className="font-serif text-3xl font-bold text-gold">$5M</span>
              <p className="text-xs text-cream/70 font-light">Commercial General Liability Co-Insurance</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-gold/15 space-y-1">
              <span className="font-serif text-3xl font-bold text-gold">150K+</span>
              <p className="text-xs text-cream/70 font-light">Targeted Digital Marketing Impressions/City</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-gold/15 space-y-1">
              <span className="font-serif text-3xl font-bold text-gold">100%</span>
              <p className="text-xs text-cream/70 font-light">14-Day Money-Back Guarantee if Unconfirmed</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gold/10 border border-gold/20 flex items-center space-x-3 text-xs text-cream/80">
            <ShieldCheck className="h-5 w-5 text-gold shrink-0" />
            <p>All permits, power hookups, and venue layouts are vetted with municipal departments.</p>
          </div>
        </div>
      </div>

      {/* MEET THE FOUNDERS & LEADERSHIP SECTION */}
      <section className="space-y-8 pt-4" id="meet-the-team">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono text-gold font-bold tracking-widest uppercase block">EXECUTIVE LEADERSHIP</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest uppercase tracking-tight">Meet the Founders</h2>
          <p className="text-xs sm:text-sm text-charcoal/65 font-light leading-relaxed">
            Real people with decades of collective experience producing premier food and spirits showcases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="bg-white border border-gold/20 rounded-3xl p-6 sm:p-7 space-y-5 shadow-sm hover:shadow-md hover:border-gold/40 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-56 object-cover rounded-2xl border border-gold/20 filter saturate-90 hover:saturate-100 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-forest/90 text-gold text-[9px] font-mono font-bold tracking-wider uppercase border border-gold/30 backdrop-blur-xs">
                    Verified Lead
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-forest">{member.name}</h3>
                  <p className="text-xs font-mono text-gold font-bold uppercase">{member.role}</p>
                </div>

                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-gold/15 space-y-1 text-xs">
                  <div className="flex items-center space-x-2 text-forest font-semibold">
                    <Briefcase className="h-3.5 w-3.5 text-gold shrink-0" />
                    <span>{member.experience}</span>
                  </div>
                  <p className="text-charcoal/60 text-[11px] font-light italic">
                    {member.formerRole}
                  </p>
                </div>

                <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-gold/10 flex items-center justify-between text-xs font-mono text-forest">
                <a href={`mailto:${member.email}`} className="hover:text-gold transition-colors flex items-center space-x-1.5 font-semibold">
                  <Mail className="h-3.5 w-3.5 text-gold" />
                  <span>{member.email}</span>
                </a>
                <span className="text-[10px] text-charcoal/50">{member.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRACK RECORD & DEBUT SEASON ROADMAP */}
      <section className="space-y-8 pt-4" id="track-record">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono text-gold font-bold tracking-widest uppercase block">PROVEN PRODUCER RESULTS</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest uppercase tracking-tight">Our Track Record</h2>
          <p className="text-xs sm:text-sm text-charcoal/65 font-light leading-relaxed">
            From regional showcases to our 2026 debut national tour, here is how our festivals have performed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRACK_RECORD_DATA.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border space-y-3 relative ${
                item.year === '2026'
                  ? 'bg-forest text-cream border-gold/40 shadow-lg'
                  : 'bg-white text-forest border-gold/20 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold ${item.year === '2026' ? 'text-gold' : 'text-gold'}`}>
                  {item.year}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase ${
                  item.year === '2026' ? 'bg-gold/20 text-gold border border-gold/30' : 'bg-forest/5 text-forest'
                }`}>
                  {item.city}
                </span>
              </div>

              <h4 className={`font-serif font-bold text-base ${item.year === '2026' ? 'text-cream' : 'text-forest'}`}>
                {item.event}
              </h4>

              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-semibold">
                  <Users className="h-3.5 w-3.5 text-gold shrink-0" />
                  <span className={item.year === '2026' ? 'text-gold' : 'text-forest'}>{item.attendance}</span>
                </div>
                <p className={`text-xs font-light leading-relaxed ${item.year === '2026' ? 'text-cream/70' : 'text-charcoal/60'}`}>
                  {item.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Sponsorship Callout */}
      <section className="space-y-8 pt-4">
        <div className="p-8 sm:p-10 bg-[#FAF6F0] border border-gold/25 rounded-3xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-gold font-bold tracking-widest uppercase block">CORPORATE & BRAND EXPOSURE</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest uppercase">
                Strategic Sponsorship Opportunities
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/70 font-light max-w-2xl leading-relaxed">
                Connect your brand with thousands of affluent food lovers, families, and culinary tastemakers. Packages range from Entry Tiers to Executive Title Partnerships ($250 to $7,500+).
              </p>
            </div>

            {onNavigateToSponsorship && (
              <button
                onClick={onNavigateToSponsorship}
                className="shrink-0 px-6 py-3.5 rounded-xl bg-forest hover:bg-forest/90 text-gold font-sans text-xs font-bold tracking-widest uppercase transition-all shadow-md cursor-pointer flex items-center space-x-2 border border-gold/30"
              >
                <span>View Advance Sponsorship Portal</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Government Licenses & Regulatory Approvals */}
      <div className="space-y-8 pt-4">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono text-gold font-bold tracking-widest uppercase block">REGULATORY STANDARDS & COMPLIANCE</span>
          <h2 className="font-serif text-2.5xl font-bold text-forest uppercase tracking-tight">Approved Municipal Permits & Insurance</h2>
          <p className="text-xs sm:text-sm text-charcoal/65 font-light max-w-xl mx-auto">
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
                Active Temporary Food Service Establishment (TFSE) multi-city clearances approved by Los Angeles County Department of Public Health, Austin Public Health, and Florida DBPR.
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
                Underwritten with $5,000,000 commercial aggregate general liability and multi-tenant indemnity coverage. Every registered exhibitor and sponsor benefits from verified co-insured protections.
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
                Municipal craft beverage and spirits activation permits processed in collaboration with the California ABC, Texas TABC, and Florida ABT agencies.
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

      {/* Office & Direct Contact Section */}
      <div className="p-8 sm:p-10 bg-[#FAF6F0] border border-gold/20 rounded-3xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-forest uppercase">Corporate Headquarters</h4>
              <p className="text-xs text-charcoal/65 font-light mt-0.5">123 Main St, Suite 200, Las Vegas, NV 89101</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-forest uppercase">Vendor & Sponsor Desk</h4>
              <a href="mailto:vendors@valerianevents.com" className="text-xs text-forest hover:underline font-semibold block mt-0.5">
                vendors@valerianevents.com
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-forest uppercase">Phone Inquiries</h4>
              <a href="tel:5551234567" className="text-xs text-forest hover:underline font-semibold block mt-0.5">
                (555) 123-4567 (Daily 9AM–6PM PT)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Pathway Action Banner */}
      <div className="p-8 sm:p-12 bg-forest border border-gold/30 rounded-3xl text-cream text-center space-y-6 max-w-3xl mx-auto shadow-lg">
        <Sparkles className="h-8 w-8 text-gold mx-auto" />
        <div className="space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold uppercase tracking-wide">
            Partner With Valerian Events
          </h3>
          <p className="text-xs sm:text-sm text-cream/75 font-light leading-relaxed max-w-xl mx-auto">
            Join thousands of culinary artisans, boutique food trucks, and national corporate sponsors across our 2026 festival season.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onContact}
            className="inline-flex items-center space-x-2 py-3 px-6 rounded-xl bg-gold hover:bg-gold/90 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-md"
          >
            <span>Apply As A Vendor</span>
          </button>

          {onNavigateToSponsorship && (
            <button
              onClick={onNavigateToSponsorship}
              className="inline-flex items-center space-x-2 py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-cream border border-gold/40 font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer backdrop-blur-sm"
            >
              <Crown className="h-4 w-4 text-gold" />
              <span>Explore Sponsorship Tiers</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
