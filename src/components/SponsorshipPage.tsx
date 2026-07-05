import React, { useState } from 'react';
import { Award, Target, Users, Sparkles, TrendingUp, DollarSign, ArrowLeft, Send, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';

interface SponsorshipPageProps {
  onBack: () => void;
  onApplyForSponsorship: (tierName: string) => void;
}

export default function SponsorshipPage({ onBack, onApplyForSponsorship }: SponsorshipPageProps) {
  // Calculator state
  const [selectedTier, setSelectedTier] = useState<'bronze' | 'silver' | 'gold' | 'title'>('silver');
  const [addElectricPremium, setAddElectricPremium] = useState<boolean>(false);
  const [addDedicatedPost, setAddDedicatedPost] = useState<boolean>(false);
  const [addStageShoutout, setAddStageShoutout] = useState<boolean>(false);

  // Constants for tiers
  const tierDetails = {
    bronze: {
      name: 'Bronze Patron',
      price: 1500,
      impressions: '15,000+',
      boothSize: '10x10 space',
      socials: 'Logo in general sponsor feed',
      flyers: 'General listing in festival map',
      stage: 'N/A',
      colorClass: 'border-amber-700/30 bg-amber-500/5 text-amber-800'
    },
    silver: {
      name: 'Silver Partner',
      price: 3500,
      impressions: '45,000+',
      boothSize: '10x20 premium corner',
      socials: '2 dedicated brand showcase posts',
      flyers: 'Featured logo in physical directories',
      stage: 'Logo on general sponsor banner',
      colorClass: 'border-slate-400/35 bg-slate-300/5 text-slate-700'
    },
    gold: {
      name: 'Gold Presenter',
      price: 7500,
      impressions: '120,000+',
      boothSize: '20x20 central hub',
      socials: '4 dedicated posts + inclusion in all press releases',
      flyers: 'Premium banner placement + VIP lounge branding',
      stage: 'Live brand shoutouts from the host stage',
      colorClass: 'border-gold/45 bg-[#FAF6F0] text-gold'
    },
    title: {
      name: 'Title Presenting Sponsor',
      price: 15000,
      impressions: '350,000+',
      boothSize: 'Double flagship pavilions + VIP lounge branding',
      socials: 'Complete digital & physical co-branding (e.g. "Valerian Events in partnership with [Your Brand]")',
      flyers: 'Dedicated logo on all media passes & entrance banners',
      stage: 'Official naming rights for the main stage',
      colorClass: 'border-[#1b4d3e]/55 bg-[#1b4d3e]/5 text-[#1b4d3e]'
    }
  };

  // Calculate customized price & estimated impressions
  const basePrice = tierDetails[selectedTier].price;
  let addOnsPrice = 0;
  let addOnImpressions = 0;

  if (addElectricPremium) {
    addOnsPrice += 250;
    addOnImpressions += 2000;
  }
  if (addDedicatedPost) {
    addOnsPrice += 500;
    addOnImpressions += 8000;
  }
  if (addStageShoutout) {
    addOnsPrice += 1000;
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
            2026 Brand Integration Deck
          </h1>
          <p className="text-charcoal/60 font-light text-sm sm:text-base leading-relaxed">
            Connect your brand directly with affluent culinary connoisseurs, artisan foodies, and viral creators at America's most curated food festivals.
          </p>
        </div>
      </div>

      {/* Grid: Demographics, Reach, and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-gold/15 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-gold">
            <Users className="h-6 w-6" />
            <h3 className="font-serif text-base font-bold text-forest uppercase tracking-wider">Target Demographics</h3>
          </div>
          <p className="text-xs text-charcoal/60 font-light leading-relaxed">
            Our audience is highly concentrated: millennial and Gen-Z food connoisseurs, culinary influencers, active social media creators, and high-income homeowners seeking premium artisan experiences.
          </p>
          <ul className="space-y-1.5 text-xs text-charcoal/75 pt-2 font-mono">
            <li>• Age Distribution: 24–45 (78%)</li>
            <li>• Average Household Income: $115k+</li>
            <li>• Engagement: Average 2.5h on site</li>
          </ul>
        </div>

        <div className="p-6 bg-white border border-gold/15 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-gold">
            <TrendingUp className="h-6 w-6" />
            <h3 className="font-serif text-base font-bold text-forest uppercase tracking-wider">Amplification Reach</h3>
          </div>
          <p className="text-xs text-charcoal/60 font-light leading-relaxed">
            Every Valerian festival is highly covered by regional culinary media, food bloggers, and local news outlets. Benefit from digital and on-site physical branding that persists long after the gates close.
          </p>
          <ul className="space-y-1.5 text-xs text-charcoal/75 pt-2 font-mono">
            <li>• Average Attendance: 15k+ / weekend</li>
            <li>• Social Impressions: 1.2M+ / event</li>
            <li>• PR mentions: 15+ local print & TV</li>
          </ul>
        </div>

        <div className="p-6 bg-white border border-gold/15 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-gold">
            <Award className="h-6 w-6" />
            <h3 className="font-serif text-base font-bold text-forest uppercase tracking-wider">Curation Standards</h3>
          </div>
          <p className="text-xs text-charcoal/60 font-light leading-relaxed">
            We limit commercial sponsorship slots to avoid event clutter. By preserving high spacing standards, your brand benefits from immense visibility and maximum engagement rates without competing noise.
          </p>
          <ul className="space-y-1.5 text-xs text-charcoal/75 pt-2 font-mono">
            <li>• Only 1 Title Sponsor / event</li>
            <li>• Max 4 Gold Presenters</li>
            <li>• Completely clean aesthetic rails</li>
          </ul>
        </div>
      </div>

      {/* Main Grid: Packages Deck & Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Traditional Sponsorship Packages (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest border-b border-gold/10 pb-3 uppercase tracking-tight flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-gold" />
            <span>Sponsorship Packages</span>
          </h2>

          <div className="space-y-4">
            {Object.entries(tierDetails).map(([key, details]) => (
              <div 
                key={key}
                onClick={() => setSelectedTier(key as any)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                  selectedTier === key 
                    ? 'border-gold bg-[#FAF6F0] shadow-md ring-1 ring-gold/25' 
                    : 'border-gold/15 bg-white hover:border-gold/30 hover:shadow-sm'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      key === 'bronze' ? 'bg-amber-700' :
                      key === 'silver' ? 'bg-slate-400' :
                      key === 'gold' ? 'bg-gold' : 'bg-forest'
                    }`}></span>
                    <h3 className="font-serif text-base font-bold text-forest">{details.name}</h3>
                  </div>
                  <p className="text-xs text-charcoal/60 font-light max-w-sm sm:max-w-md">
                    Space: {details.boothSize} • Impressions: {details.impressions}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-charcoal/40 font-mono">Starts at</span>
                  <span className="text-lg font-bold text-forest font-serif">${details.price.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Cost/ROI Calculator (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-forest border-b border-gold/10 pb-3 uppercase tracking-tight flex items-center space-x-2">
            <BarChart2 className="h-5 w-5 text-gold" />
            <span>Interactive ROI Estimator</span>
          </h2>

          <div className="p-6 bg-white border border-gold/20 rounded-2xl shadow-md space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] text-charcoal/50 font-bold tracking-wider uppercase font-sans">1. Active Tier Selection</label>
              <div className="text-sm font-serif font-bold text-forest flex items-center space-x-1.5 pt-0.5">
                <ChevronRight className="h-4 w-4 text-gold" />
                <span>{tierDetails[selectedTier].name}</span>
              </div>
            </div>

            {/* Custom Integration Add-ons */}
            <div className="space-y-3 pt-3 border-t border-gold/10">
              <label className="text-[10px] text-charcoal/50 font-bold tracking-wider uppercase font-sans block mb-1">2. Custom Integration Add-ons</label>
              
              {/* Add-on 1 */}
              <label className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-cream/20 border border-transparent hover:border-gold/10 transition-all cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={addElectricPremium}
                  onChange={(e) => setAddElectricPremium(e.target.checked)}
                  className="mt-0.5 rounded border-gold/30 text-forest focus:ring-forest h-4 w-4"
                />
                <div className="text-xs">
                  <div className="font-bold text-forest">High-Wattage 220V Electric feed</div>
                  <div className="text-charcoal/50 font-light">+2,000 extra brand impressions • $250 flat</div>
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
                  <div className="font-bold text-forest">Extra Dedicated Social Feature</div>
                  <div className="text-charcoal/50 font-light">+8,000 extra brand impressions • $500 flat</div>
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
                  <div className="font-bold text-forest">Stage Shoutout & VIP Lounge access</div>
                  <div className="text-charcoal/50 font-light">+15,000 extra brand impressions • $1,000 flat</div>
                </div>
              </label>
            </div>

            {/* Price & ROI Outputs */}
            <div className="pt-4 border-t border-gold/15 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-forest/5 border border-forest/15">
                  <span className="block text-[9px] text-charcoal/40 font-mono uppercase tracking-wider">Curation Investment</span>
                  <span className="text-xl font-bold font-serif text-forest">${finalPrice.toLocaleString()}</span>
                </div>
                <div className="p-4 rounded-xl bg-gold/5 border border-gold/20">
                  <span className="block text-[9px] text-charcoal/40 font-mono uppercase tracking-wider">Est. Impressions</span>
                  <span className="text-xl font-bold font-serif text-gold">{finalImpressions}</span>
                </div>
              </div>

              {/* Dynamic Package Summary bullet list */}
              <div className="p-4 bg-[#FAF6F0] rounded-xl border border-gold/25 space-y-2">
                <h4 className="font-serif text-xs font-bold text-forest uppercase tracking-wide">Included Curation Benefits:</h4>
                <div className="space-y-1.5 text-xs text-charcoal/70 leading-relaxed font-light">
                  <div className="flex items-start space-x-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                    <span>Space Allocation: {tierDetails[selectedTier].boothSize}</span>
                  </div>
                  <div className="flex items-start space-x-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                    <span>Social Media: {tierDetails[selectedTier].socials}</span>
                  </div>
                  <div className="flex items-start space-x-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                    <span>Directory Inclusion: {tierDetails[selectedTier].flyers}</span>
                  </div>
                  {tierDetails[selectedTier].stage !== 'N/A' && (
                    <div className="flex items-start space-x-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                      <span>Stage Integration: {tierDetails[selectedTier].stage}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive Submit CTA */}
              <button
                onClick={() => onApplyForSponsorship(tierDetails[selectedTier].name)}
                className="w-full py-3 px-4 rounded-xl bg-forest hover:bg-forest/95 text-cream font-sans text-xs font-bold tracking-widest uppercase shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="h-4 w-4 text-gold shrink-0" />
                <span>Submit Partnership Deck Request</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study or Testimonial Section */}
      <div className="p-8 sm:p-10 bg-gradient-to-br from-white to-cream/20 border border-gold/15 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-bl-full pointer-events-none" />
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] text-gold font-mono tracking-widest uppercase block font-semibold">PARTNERSHIP TESTIMONIAL</span>
          <h3 className="font-serif text-lg sm:text-2xl font-bold text-forest italic leading-relaxed">
            "Sponsoring Valerian Events put our premium artisan hot honey brand in front of more qualified, high-spending culinary buyers than any national food expo we've ever attended."
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
