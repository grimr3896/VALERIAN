import React, { useState } from 'react';
import { 
  Award, 
  Target, 
  Users, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  BarChart2, 
  Lightbulb, 
  Handshake, 
  Megaphone, 
  Palette, 
  GraduationCap, 
  HeartHandshake, 
  Gift,
  Crown,
  CreditCard,
  Building,
  ShieldCheck,
  Zap,
  Star
} from 'lucide-react';
import { VENDOR_CONFIG } from '../vendorConfig';

interface SponsorshipPageProps {
  onBack: () => void;
  onApplyForSponsorship: (tierName: string) => void;
}

export default function SponsorshipPage({ onBack, onApplyForSponsorship }: SponsorshipPageProps) {
  interface SponsorshipTierInfo {
    name: string;
    price: number;
    priceDisplay?: string;
    tagline: string;
    impressions: string;
    boothSize: string;
    bullets: string[];
    colorClass: string;
  }

  // Constants for tiers
  const tierDetails: Record<'community' | 'supporting' | 'gold' | 'presenting', SponsorshipTierInfo> = {
    community: {
      name: 'Community Partner',
      price: 250,
      tagline: 'Get your name in front of the crowd.',
      impressions: '15,000+',
      boothSize: '10×10 vendor space to meet attendees face-to-face',
      bullets: [
        '10×10 vendor space to meet attendees face-to-face',
        'Name listed among official event sponsors',
        'Logo/name featured on select promotional materials',
        'Social media shoutout to our festival audience',
        'Distribute your own approved flyers, cards, or samples'
      ],
      colorClass: 'border-amber-700/30 bg-amber-500/5 text-amber-800'
    },
    supporting: {
      name: 'Supporting Sponsor',
      price: 500,
      tagline: 'Everything above, plus a bigger spotlight.',
      impressions: '35,000+',
      boothSize: '10×10 vendor space plus room to display signage',
      bullets: [
        'Prominent logo placement across event materials',
        'A dedicated social media feature (not just a mention)',
        'Live shoutout from the host/MC on event day',
        '10×10 vendor space plus room to display signage',
        'Freedom to hand out your own promotional materials'
      ],
      colorClass: 'border-slate-400/35 bg-slate-300/5 text-slate-700'
    },
    gold: {
      name: 'Gold Sponsor',
      price: 1000,
      tagline: 'Stand out as a headline supporter.',
      impressions: '75,000+',
      boothSize: 'Premium activation space for a bigger presence',
      bullets: [
        'Premium sponsor billing with a larger logo footprint',
        'Multiple social media mentions in the run-up to the event',
        'Repeated shoutouts throughout event day',
        'Premium activation space for a bigger presence',
        'Bring branded giveaways attendees actually take home',
        '"Gold Sponsor" recognition woven throughout the event'
      ],
      colorClass: 'border-gold/45 bg-[#FAF6F0] text-gold'
    },
    presenting: {
      name: 'Presenting Sponsor',
      price: 2500,
      priceDisplay: '$2,500+',
      tagline: 'Be the name people remember.',
      impressions: '150,000+',
      boothSize: 'Premium activation space in the best spot at the festival',
      bullets: [
        'Top-tier "Presented by [Your Brand]" recognition across all materials',
        'The most prominent logo placement of any sponsorship tier',
        'Premium activation space in the best spot at the festival',
        'Multiple social promotions leading up to and during the event',
        'Ongoing stage/MC recognition all day long',
        'Bring branded giveaways or run a custom activation',
        'Featured as a headline partner in all event coverage',
        "Package tailored to your specific goals — ask us what's possible"
      ],
      colorClass: 'border-[#1b4d3e]/55 bg-[#1b4d3e]/5 text-[#1b4d3e]'
    }
  };

  // 👑 EXECUTIVE SPONSORSHIP TIERS
  interface ExecutiveTier {
    id: string;
    name: string;
    badge?: string;
    tagline: string;
    footprint: string;
    price: string;
    description: string;
    bestFor: string;
    includedNote?: string;
    deliverables: string[];
    ctaText: string;
    highlight?: boolean;
    isExclusive?: boolean;
  }

  const executiveTiers: ExecutiveTier[] = [
    {
      id: 'neighborhood-sponsor',
      name: 'NEIGHBORHOOD SPONSOR',
      tagline: 'Establish your presence in the community.',
      footprint: "10' × 10' Vendor/Booth Space",
      price: '$750',
      description: 'Get a foothold at the event with direct attendee engagement, official sponsor recognition, and room to grow into higher tiers as your goals scale.',
      bestFor: 'Local businesses, growing regional brands, and organizations building their first sponsorship presence at a larger-scale event.',
      deliverables: [
        '10×10 vendor/booth space',
        'Name listed in official sponsor directory (print + digital)',
        'Logo on select event promotional materials',
        '1 dedicated social media mention',
        'Distribute your own approved flyers/samples at your booth'
      ],
      ctaText: 'Apply For Neighborhood Sponsor'
    },
    {
      id: 'spotlight-sponsor',
      name: 'SPOTLIGHT SPONSOR',
      badge: 'High Reach',
      tagline: 'Everything above, plus a bigger spotlight.',
      footprint: "10' × 20' Upgraded Space + Signage",
      price: '$1,800',
      highlight: true,
      description: 'Step up into expanded space and real audience reach — including a segment of our subscriber list — with live recognition on event day.',
      bestFor: 'Growing regional brands and businesses ready to move beyond a basic booth into active audience engagement.',
      includedNote: 'Everything in Neighborhood Sponsor, plus:',
      deliverables: [
        'Upgraded 10×20 space',
        'Partial email list feature (segment of the 12,000 subscribers)',
        '2 social media posts in the lead-up to the event',
        'Live shoutout from the host/MC on event day',
        'Signage display rights at your booth'
      ],
      ctaText: 'Apply For Spotlight Sponsor'
    },
    {
      id: 'marquee-sponsor',
      name: 'MARQUEE SPONSOR',
      badge: 'Headline Supporter',
      tagline: 'Stand out as a headline supporter.',
      footprint: "20' × 20' Premium Activation Space",
      price: '$3,500',
      description: 'Full-list email reach, repeated stage recognition, and a premium activation footprint — built for brands that want to be unmistakably present all day.',
      bestFor: 'Established companies and regional institutions seeking headline-level visibility without full event exclusivity.',
      includedNote: 'Everything in Spotlight Sponsor, plus:',
      deliverables: [
        'Premium 20×20 activation space',
        'Full email blast to the entire subscriber list',
        'Multiple stage/MC mentions throughout the day',
        'Dedicated branded giveaway or sampling zone',
        '"Marquee Sponsor" recognition across event materials'
      ],
      ctaText: 'Apply For Marquee Sponsor'
    },
    {
      id: 'title-sponsor',
      name: 'TITLE SPONSOR',
      badge: 'Top Tier Partnership',
      tagline: 'Be the name people remember.',
      footprint: 'Prime Flagship Activation Space + Category Exclusivity',
      price: '$7,500+',
      isExclusive: true,
      description: 'The highest level of partnership available — full co-branding, category exclusivity, and a coordinated multi-channel campaign built around your goals.',
      bestFor: 'Regional and national brands seeking total category dominance and maximum event-wide visibility.',
      includedNote: 'Everything in Marquee Sponsor, plus:',
      deliverables: [
        'Category exclusivity — you\'re the only sponsor in your industry at the event',
        '"Presented by [Your Brand]" naming rights on all materials',
        'Full digital campaign push (email + social + press, if applicable)',
        'Custom activation or negotiated add-ons — open above $7,500 for larger brands'
      ],
      ctaText: 'Apply For Title Sponsor'
    }
  ];

  // Custom opportunities list
  const customOpportunities = [
    { title: 'Community outreach initiatives', icon: HeartHandshake, desc: 'Engage local neighborhoods, public programs, and community initiatives.' },
    { title: 'Promotional activations or demos', icon: Sparkles, desc: 'Interactive experiential brand activations and live attendee product trials.' },
    { title: 'Educational/informational booths', icon: GraduationCap, desc: 'Informative workshops, resource centers, and educational touchpoints.' },
    { title: 'Branded activities for families', icon: Users, desc: 'Kid zones, family game pavilions, craft stations, and photo opportunities.' },
    { title: 'Product or service demonstrations', icon: Megaphone, desc: 'Live on-stage or in-booth product demos to showcase quality and utility.' },
    { title: 'Media and promotional partnerships', icon: TrendingUp, desc: 'Co-branded marketing, influencer broadcasts, and press syndication.' },
    { title: 'In-kind sponsorships (equipment, prizes, services)', icon: Gift, desc: 'Equipment provision, raffle prizes, staging gear, or logistical services.' }
  ];

  return (
    <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16" id="sponsorship-deck-page">
      
      {/* ========================================================================= */}
      {/* 🌟 HERO SECTION: ADVANCE SPONSORSHIP                                      */}
      {/* ========================================================================= */}
      <section className="relative rounded-3xl overflow-hidden bg-[#0d2a21] text-cream border border-gold/35 shadow-2xl" id="sponsorship-hero">
        {/* Ambient background styling */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=80"
            alt="Festival crowd and atmosphere"
            className="w-full h-full object-cover opacity-15 filter brightness-75 contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a21] via-[#0d2a21]/80 to-transparent" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-forest/40 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 p-8 sm:p-12 lg:p-14 space-y-10">
          {/* Top navigation row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gold/30 bg-white/10 hover:bg-white/20 text-cream font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer backdrop-blur-sm"
              id="sponsorship-back-btn"
            >
              <ArrowLeft className="h-4 w-4 text-gold" />
              <span>Back to Overview</span>
            </button>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full bg-gold/15 text-gold border border-gold/30 backdrop-blur-sm flex items-center space-x-1.5">
                <Crown className="h-3 w-3 text-gold" />
                <span>2026 FESTIVAL PARTNERSHIPS</span>
              </span>
            </div>
          </div>

          {/* Hero Core Content */}
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-gold/30 text-gold text-xs font-mono tracking-widest uppercase">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span>Official Advance Sponsorship Portal</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream uppercase leading-[1.1]">
              Command The Spotlight At Our <span className="text-gold italic font-serif">Premier Festivals</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg font-light text-cream/80 leading-relaxed max-w-2xl">
              Connect your organization with over <strong className="text-gold font-medium">10,000+ high-intent attendees</strong>, culinary enthusiasts, and regional families. Gain prominent signage, live stage mentions, guaranteed footprints, and multi-channel digital exposure.
            </p>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#standard-sponsorship-levels"
              className="px-5 py-3 rounded-xl bg-gold hover:bg-gold/90 text-forest font-sans text-xs font-bold tracking-wider uppercase transition-all shadow-lg shadow-gold/20 flex items-center space-x-2 cursor-pointer"
            >
              <span>Standard Tiers ($250 – $2,500+)</span>
              <ChevronRight className="h-4 w-4" />
            </a>

            <a
              href="#executive-sponsorship-section"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-cream border border-gold/30 font-sans text-xs font-bold tracking-wider uppercase transition-all flex items-center space-x-2 cursor-pointer backdrop-blur-sm"
            >
              <Crown className="h-3.5 w-3.5 text-gold" />
              <span>Executive Packages ($750 – $7,500+)</span>
            </a>

            <a
              href="#custom-sponsorship-opportunities"
              className="px-5 py-3 rounded-xl bg-transparent hover:bg-white/5 text-gold border border-gold/20 font-sans text-xs font-bold tracking-wider uppercase transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Lightbulb className="h-3.5 w-3.5 text-gold" />
              <span>Custom Activations</span>
            </a>
          </div>

          {/* High-Impact Statistics / Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gold/20">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-gold/15 backdrop-blur-sm space-y-1">
              <div className="flex items-center space-x-2 text-gold">
                <Users className="h-4 w-4" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cream/60">Audience</span>
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-gold">10K – 15K+</div>
              <p className="text-[11px] text-cream/70 font-light leading-snug">Attendees engaged in-person per festival</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-gold/15 backdrop-blur-sm space-y-1">
              <div className="flex items-center space-x-2 text-gold">
                <TrendingUp className="h-4 w-4" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cream/60">Digital Reach</span>
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-gold">150,000+</div>
              <p className="text-[11px] text-cream/70 font-light leading-snug">Impressions across email & social blasts</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-gold/15 backdrop-blur-sm space-y-1">
              <div className="flex items-center space-x-2 text-gold">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cream/60">Turnkey Support</span>
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-gold">100%</div>
              <p className="text-[11px] text-cream/70 font-light leading-snug">Dedicated space, power & production staff</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-gold/15 backdrop-blur-sm space-y-1">
              <div className="flex items-center space-x-2 text-gold">
                <CreditCard className="h-4 w-4" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cream/60">Payment Plans</span>
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-gold">Flexible</div>
              <p className="text-[11px] text-cream/70 font-light leading-snug">2-pay & 3-pay milestone installment options</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Sponsorship Levels */}
      <section className="space-y-6" id="standard-sponsorship-levels">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-gold/15 pb-4 gap-2">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-forest/70 block">
              Entry & Growth Packages
            </span>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-gold" />
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest uppercase tracking-tight">
                Advance Sponsorship Levels
              </h2>
            </div>
          </div>
          <p className="text-xs text-charcoal/60 font-light max-w-md">
            Direct attendee touchpoints, logo visibility, and stage announcements designed for fast ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {(Object.keys(tierDetails) as Array<keyof typeof tierDetails>).map((key) => {
            const details = tierDetails[key];
            const isTop = key === 'presenting';
            return (
              <div 
                key={key}
                id={`tier-card-${key}`}
                className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 transition-all duration-300 ${
                  isTop 
                    ? 'border-gold/50 bg-[#FAF6F0] shadow-md ring-1 ring-gold/25' 
                    : 'border-gold/20 bg-white hover:border-gold/40 hover:shadow-md'
                }`}
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        key === 'community' ? 'bg-amber-700' :
                        key === 'supporting' ? 'bg-slate-400' :
                        key === 'gold' ? 'bg-gold' : 'bg-forest'
                      }`}></span>
                      <h3 className="font-serif text-lg font-bold text-forest uppercase tracking-wide">{details.name}</h3>
                    </div>
                    <p className="text-xs font-serif italic text-gold font-medium">
                      "{details.tagline}"
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-cream/40 border border-gold/15 flex items-baseline justify-between">
                    <span className="text-[10px] font-mono text-charcoal/50 uppercase tracking-wider">Investment</span>
                    <span className="text-2xl font-bold text-forest font-serif">
                      {details.priceDisplay || `$${details.price.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold font-serif text-forest uppercase tracking-wider block">Deliverables:</span>
                    <ul className="space-y-2">
                      {details.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-charcoal/75 leading-relaxed font-light">
                          <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-gold/15">
                  <button
                    onClick={() => onApplyForSponsorship(details.name)}
                    className="w-full py-2.5 px-3 rounded-xl bg-forest hover:bg-forest/90 text-cream font-sans text-xs font-bold tracking-widest uppercase transition-all shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5 text-gold" />
                    <span>Apply for {details.name}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 👑 EXECUTIVE SPONSORSHIP PACKAGES                                         */}
      {/* ========================================================================= */}
      <section className="p-8 sm:p-12 bg-white border border-gold/25 rounded-3xl shadow-sm space-y-10" id="executive-sponsorship-section">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full bg-forest text-gold border border-gold/30 inline-flex items-center space-x-1.5">
              <Crown className="h-3 w-3 text-gold" />
              <span>EXECUTIVE SPONSORSHIP</span>
            </span>
            <span className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full bg-gold/15 text-forest border border-gold/30">
              PREMIER PACKAGES
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-forest tracking-tight uppercase">
            Executive Sponsorship Packages
          </h2>
          <p className="text-charcoal/70 font-light text-sm sm:text-base italic leading-relaxed">
            For brands and organizations seeking expanded reach, larger footprints, and deeper audience engagement.
          </p>
        </div>

        {/* 4 Detailed Executive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {executiveTiers.map((tier) => (
            <div 
              key={tier.id}
              id={`executive-tier-${tier.id}`}
              className={`p-7 sm:p-8 rounded-2xl border flex flex-col justify-between space-y-6 relative transition-all duration-300 ${
                tier.isExclusive 
                  ? 'bg-forest text-cream border-gold/50 shadow-lg ring-1 ring-gold/30' 
                  : tier.highlight
                  ? 'bg-[#FAF6F0] border-gold/40 shadow-md ring-1 ring-gold/25'
                  : 'bg-white border-gold/20 hover:border-gold/40 hover:shadow-md'
              }`}
            >
              {/* Badge if present */}
              {tier.badge && (
                <div className={`absolute top-0 right-0 px-3.5 py-1 text-[9px] font-mono font-bold tracking-widest uppercase rounded-bl-xl ${
                  tier.isExclusive 
                    ? 'bg-gold text-forest' 
                    : 'bg-gold/20 text-forest border-l border-b border-gold/30'
                }`}>
                  {tier.badge}
                </div>
              )}

              <div className="space-y-4">
                {/* Header info */}
                <div className="space-y-1">
                  <span className={`text-[10px] font-mono font-bold tracking-widest uppercase block ${
                    tier.isExclusive ? 'text-gold' : 'text-forest/60'
                  }`}>
                    Executive Tier
                  </span>
                  <h3 className={`font-serif text-2xl font-bold uppercase tracking-tight ${
                    tier.isExclusive ? 'text-cream' : 'text-forest'
                  }`}>
                    {tier.name}
                  </h3>
                  <p className={`text-xs italic font-serif ${
                    tier.isExclusive ? 'text-gold' : 'text-gold'
                  }`}>
                    "{tier.tagline}"
                  </p>
                </div>

                {/* Footprint & Pricing banner */}
                <div className={`p-4 rounded-xl border space-y-1.5 ${
                  tier.isExclusive 
                    ? 'bg-white/5 border-gold/20 text-cream' 
                    : 'bg-cream/40 border-gold/15 text-charcoal'
                }`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <span className={`block text-[10px] font-mono uppercase tracking-wider ${
                        tier.isExclusive ? 'text-cream/50' : 'text-charcoal/50'
                      }`}>
                        Footprint
                      </span>
                      <span className={`font-mono text-xs font-semibold ${
                        tier.isExclusive ? 'text-cream' : 'text-forest'
                      }`}>
                        {tier.footprint}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`block text-[10px] font-mono uppercase tracking-wider ${
                        tier.isExclusive ? 'text-cream/50' : 'text-charcoal/50'
                      }`}>
                        Investment
                      </span>
                      <span className={`font-serif text-2xl font-bold ${
                        tier.isExclusive ? 'text-gold' : 'text-forest'
                      }`}>
                        {tier.price}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gold/10 flex items-center space-x-1 text-[11px] text-gold font-medium">
                    <Sparkles className="h-3 w-3 shrink-0" />
                    <span>Flexible payment options available</span>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-xs leading-relaxed font-light ${
                  tier.isExclusive ? 'text-cream/80' : 'text-charcoal/75'
                }`}>
                  {tier.description}
                </p>

                {/* Best For Box */}
                <div className={`p-3 rounded-lg border text-xs leading-relaxed ${
                  tier.isExclusive 
                    ? 'bg-white/5 border-gold/15 text-cream/90' 
                    : 'bg-[#FAF6F0] border-gold/15 text-charcoal/80'
                }`}>
                  <strong className={`font-semibold ${tier.isExclusive ? 'text-gold' : 'text-forest'}`}>Best for: </strong>
                  <span>{tier.bestFor}</span>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-2 pt-2">
                  <div className={`text-xs font-bold font-serif uppercase tracking-wider ${
                    tier.isExclusive ? 'text-gold' : 'text-forest'
                  }`}>
                    {tier.includedNote ? (
                      <span>What's Included: <span className="font-normal italic lowercase font-sans text-charcoal/60 dark:text-cream/60">({tier.includedNote})</span></span>
                    ) : (
                      <span>What's Included:</span>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {tier.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-xs font-light leading-relaxed">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${
                          tier.isExclusive ? 'text-gold' : 'text-gold'
                        }`} />
                        <span className={tier.isExclusive ? 'text-cream/90' : 'text-charcoal/80'}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-gold/15">
                <button
                  onClick={() => onApplyForSponsorship(`Executive: ${tier.name}`)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer ${
                    tier.isExclusive
                      ? 'bg-gold hover:bg-gold/90 text-forest shadow-gold/20'
                      : 'bg-forest hover:bg-forest/90 text-cream'
                  }`}
                >
                  <Send className={`h-3.5 w-3.5 ${tier.isExclusive ? 'text-forest' : 'text-gold'}`} />
                  <span>{tier.ctaText}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 💳 Flexible Payment Options Breakdown Banner */}
        <div className="p-6 sm:p-8 bg-[#FAF6F0] border border-gold/30 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-forest text-gold">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-forest uppercase tracking-wide">
                Flexible Payment Options <span className="text-xs font-normal italic font-sans text-charcoal/60 lowercase">(applies across all Executive tiers)</span>
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white border border-gold/15 space-y-1">
              <span className="font-serif font-bold text-forest text-sm block">Pay in Full</span>
              <p className="text-xs text-charcoal/65 font-light leading-relaxed">
                Space confirmed immediately upon approval with full placement guarantee.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-gold/15 space-y-1">
              <span className="font-serif font-bold text-forest text-sm block">2-Payment Split</span>
              <p className="text-xs text-charcoal/65 font-light leading-relaxed">
                50% deposit to lock the space, 50% due 14 days before the event date.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-gold/15 space-y-1">
              <span className="font-serif font-bold text-forest text-sm block">3-Payment Split</span>
              <p className="text-xs text-charcoal/65 font-light leading-relaxed">
                <em className="font-medium text-gold">(Marquee/Title tiers)</em> Thirds due at booking, midpoint, and before load-in.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-gold/15 space-y-1">
              <span className="font-serif font-bold text-forest text-sm block">Custom Corporate Terms</span>
              <p className="text-xs text-charcoal/65 font-light leading-relaxed">
                <em className="font-medium text-gold">(Title tier)</em> Invoicing, ACH, and wire terms available for qualifying corporate sponsors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 CUSTOM SPONSORSHIP OPPORTUNITIES SECTION */}
      <div className="p-8 sm:p-10 bg-white border border-gold/20 rounded-3xl shadow-sm space-y-8" id="custom-sponsorship-opportunities">
        <div className="max-w-3xl space-y-3">
          <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full bg-gold/15 text-forest border border-gold/30 inline-block">
            Tailored Partnerships
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            Custom Sponsorship Opportunities
          </h2>
          <p className="text-charcoal/70 font-light text-sm sm:text-base leading-relaxed">
            Every organization has different goals — we can build around yours, including:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {customOpportunities.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="p-5 rounded-2xl bg-[#FAF6F0]/70 border border-gold/20 hover:border-gold/50 hover:shadow-md transition-all duration-300 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-forest/10 border border-gold/25 flex items-center justify-center text-forest">
                    <IconComponent className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-forest">{item.title}</h3>
                  <p className="text-xs text-charcoal/65 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-gold/10">
                  <span className="text-[11px] font-mono font-medium text-gold uppercase tracking-wider">Custom Proposal Available</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 rounded-2xl bg-forest text-cream flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-cream">Have a unique activation or partnership concept in mind?</h4>
            <p className="text-xs text-cream/70 font-light">Tell us what you'd like to achieve, and our team will craft a custom proposal.</p>
          </div>
          <button
            onClick={() => onApplyForSponsorship('Custom Sponsorship Opportunity')}
            className="shrink-0 px-6 py-3 rounded-xl bg-gold hover:bg-gold/90 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-all shadow-md cursor-pointer"
          >
            Request Custom Proposal
          </button>
        </div>
      </div>

      {/* Case Study or Testimonial Section */}
      <div className="p-8 sm:p-10 bg-gradient-to-br from-white to-cream/20 border border-gold/15 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-bl-full pointer-events-none" />
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] text-gold font-mono tracking-widest uppercase block font-semibold">PARTNERSHIP TESTIMONIAL</span>
          <h3 className="font-serif text-lg sm:text-2xl font-bold text-forest italic leading-relaxed">
            "Sponsoring Valerian Events put our brand in front of thousands of qualified, high-spending festival attendees with unparalleled stage and on-site visibility."
          </h3>
          <div className="pt-2 border-t border-gold/10">
            <span className="block font-bold text-forest text-sm font-sans uppercase tracking-wider">marcus vance</span>
            <span className="block text-xs text-charcoal/50 font-mono">CHIEF OF BRANDING, SPICED BEE HONEY CORP</span>
          </div>
        </div>
      </div>
    </div>
  );
}

