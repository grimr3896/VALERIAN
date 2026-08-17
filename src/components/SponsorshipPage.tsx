import React, { useState } from 'react';
import { Award, Target, Users, Sparkles, TrendingUp, DollarSign, ArrowLeft, Send, CheckCircle2, ChevronRight, BarChart2, Lightbulb, Handshake, Megaphone, Palette, GraduationCap, HeartHandshake, Gift } from 'lucide-react';
import { VENDOR_CONFIG } from '../vendorConfig';

interface SponsorshipPageProps {
  onBack: () => void;
  onApplyForSponsorship: (tierName: string) => void;
}

export default function SponsorshipPage({ onBack, onApplyForSponsorship }: SponsorshipPageProps) {
  // Calculator state
  const [selectedTier, setSelectedTier] = useState<'community' | 'supporting' | 'gold' | 'presenting'>('supporting');
  const [addElectricPremium, setAddElectricPremium] = useState<boolean>(false);
  const [addDedicatedPost, setAddDedicatedPost] = useState<boolean>(false);
  const [addStageShoutout, setAddStageShoutout] = useState<boolean>(false);

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

  // Calculate customized price & estimated impressions
  const basePrice = tierDetails[selectedTier].price;
  let addOnsPrice = 0;
  let addOnImpressions = 0;

  if (addElectricPremium) {
    addOnsPrice += 150;
    addOnImpressions += 2000;
  }
  if (addDedicatedPost) {
    addOnsPrice += 250;
    addOnImpressions += 8000;
  }
  if (addStageShoutout) {
    addOnsPrice += 350;
    addOnImpressions += 15000;
  }

  const finalPrice = basePrice + addOnsPrice;
  const baseImpNum = parseInt(tierDetails[selectedTier].impressions.replace(/,/g, '').replace(/\+/g, ''));
  const finalImpressions = (baseImpNum + addOnImpressions).toLocaleString() + '+';

  return (
    <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="sponsorship-deck-page">
      {/* Page Header */}
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gold/30 bg-white hover:bg-forest/5 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
          id="sponsorship-back-btn"
        >
          <ArrowLeft className="h-4 w-4 text-gold" />
          <span>Back to Lineup</span>
        </button>

        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full bg-forest/10 text-forest border border-gold/20 inline-block">
            Sponsorship & Brand Integration
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
            Sponsorship Levels & Opportunities
          </h1>
          <p className="text-charcoal/60 font-light text-sm sm:text-base leading-relaxed">
            Connect your organization directly with thousands of attendees, foodies, and families across our premier festival network.
          </p>
        </div>
      </div>

      {/* Main Grid: Sponsorship Levels & Interactive Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Sponsorship Levels (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest border-b border-gold/10 pb-3 uppercase tracking-tight flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-gold" />
            <span>Sponsorship Levels</span>
          </h2>

          <div className="space-y-4">
            {(Object.keys(tierDetails) as Array<keyof typeof tierDetails>).map((key) => {
              const details = tierDetails[key];
              const isSelected = selectedTier === key;
              return (
                <div 
                  key={key}
                  onClick={() => setSelectedTier(key)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer space-y-3 ${
                    isSelected 
                      ? 'border-gold bg-[#FAF6F0] shadow-md ring-1 ring-gold/25' 
                      : 'border-gold/15 bg-white hover:border-gold/30 hover:shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-full ${
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
                    <div className="text-right">
                      <span className="text-xl font-bold text-forest font-serif">
                        {details.priceDisplay || `$${details.price.toLocaleString()}`}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 pt-2 border-t border-gold/10">
                    {details.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-charcoal/75 leading-relaxed font-light">
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Interactive Cost & Benefit Estimator (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest border-b border-gold/10 pb-3 uppercase tracking-tight flex items-center space-x-2">
            <BarChart2 className="h-5 w-5 text-gold" />
            <span>Interactive Sponsorship Planner</span>
          </h2>

          <div className="p-6 bg-white border border-gold/20 rounded-2xl shadow-md space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] text-charcoal/50 font-bold tracking-wider uppercase font-sans">1. Active Tier Selection</label>
              <div className="text-base font-serif font-bold text-forest flex items-center space-x-1.5 pt-0.5">
                <ChevronRight className="h-4 w-4 text-gold" />
                <span>{tierDetails[selectedTier].name} — {tierDetails[selectedTier].priceDisplay || `$${tierDetails[selectedTier].price.toLocaleString()}`}</span>
              </div>
              <p className="text-xs text-charcoal/60 font-light italic">{tierDetails[selectedTier].tagline}</p>
            </div>

            {/* Custom Integration Add-ons */}
            <div className="space-y-3 pt-3 border-t border-gold/10">
              <label className="text-[10px] text-charcoal/50 font-bold tracking-wider uppercase font-sans block mb-1">2. Optional Festival Add-ons</label>
              
              {/* Add-on 1 */}
              <label className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-cream/20 border border-transparent hover:border-gold/10 transition-all cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={addElectricPremium}
                  onChange={(e) => setAddElectricPremium(e.target.checked)}
                  className="mt-0.5 rounded border-gold/30 text-forest focus:ring-forest h-4 w-4"
                />
                <div className="text-xs">
                  <div className="font-bold text-forest">Dedicated Power Hookup (20A/110V)</div>
                  <div className="text-charcoal/50 font-light">+2,000 extra brand impressions • $150 flat</div>
                </div>
              </label>

              {/* Add-on 2 */}
              <label className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-cream/20 border border-transparent hover:border-gold/10 transition-all cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={addDedicatedPost}
                  onChange={(e) => setAddDedicatedPost(e.target.checked)}
                  className="mt-0.5 rounded border-gold/30 text-forest focus:ring-forest h-4 w-4"
                />
                <div className="text-xs">
                  <div className="font-bold text-forest">Extra Dedicated Social Media Feature</div>
                  <div className="text-charcoal/50 font-light">+8,000 extra brand impressions • $250 flat</div>
                </div>
              </label>

              {/* Add-on 3 */}
              <label className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-cream/20 border border-transparent hover:border-gold/10 transition-all cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={addStageShoutout}
                  onChange={(e) => setAddStageShoutout(e.target.checked)}
                  className="mt-0.5 rounded border-gold/30 text-forest focus:ring-forest h-4 w-4"
                />
                <div className="text-xs">
                  <div className="font-bold text-forest">Additional Stage Mentions & VIP Hospitality</div>
                  <div className="text-charcoal/50 font-light">+15,000 extra brand impressions • $350 flat</div>
                </div>
              </label>
            </div>

            {/* Price & ROI Outputs */}
            <div className="pt-4 border-t border-gold/15 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-forest/5 border border-forest/15">
                  <span className="block text-[9px] text-charcoal/40 font-mono uppercase tracking-wider">Total Investment</span>
                  <span className="text-xl font-bold font-serif text-forest">
                    {selectedTier === 'presenting' 
                      ? (addOnsPrice > 0 ? `$${(2500 + addOnsPrice).toLocaleString()}+` : '$2,500+') 
                      : `$${finalPrice.toLocaleString()}`}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-gold/5 border border-gold/20">
                  <span className="block text-[9px] text-charcoal/40 font-mono uppercase tracking-wider">Est. Impressions</span>
                  <span className="text-xl font-bold font-serif text-gold">{finalImpressions}</span>
                </div>
              </div>

              {/* Interactive Submit CTA */}
              <button
                onClick={() => onApplyForSponsorship(tierDetails[selectedTier].name)}
                className="w-full py-3.5 px-4 rounded-xl bg-forest hover:bg-forest/95 text-cream font-sans text-xs font-bold tracking-widest uppercase shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="h-4 w-4 text-gold shrink-0" />
                <span>Apply for {tierDetails[selectedTier].name}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 CUSTOM SPONSORSHIP OPPORTUNITIES SECTION */}
      <div className="p-8 sm:p-10 bg-white border border-gold/20 rounded-3xl shadow-sm space-y-8">
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

