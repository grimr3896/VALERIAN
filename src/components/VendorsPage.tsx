import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Flame, 
  Sparkles, 
  Mail, 
  Phone, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  Users, 
  Layers, 
  TrendingUp, 
  Megaphone, 
  Clock, 
  HelpCircle, 
  Loader2,
  CreditCard,
  CalendarCheck,
  ShieldCheck,
  Building,
  Truck,
  ShoppingBag,
  Rocket,
  Award,
  Crown
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { VENDOR_CONFIG, VendorPillar, VendorTier } from '../vendorConfig';

// Initialize EmailJS immediately for this module
emailjs.init('dUpRmObSvyywLE_u_');

interface VendorsPageProps {
  onBack: () => void;
  onPageChange: (page: string) => void;
  prefilledEventName?: string;
}

export default function VendorsPage({ onBack, onPageChange, prefilledEventName }: VendorsPageProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [activePillarFilter, setActivePillarFilter] = useState<'all' | VendorPillar>('all');
  
  // State for Form fields
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    category: '',
    tier: 'starter-booth', // default to starter-booth
    paymentPlan: 'pay-in-full', // default to pay-in-full
    event: 'las-vegas-food-arts', // default to upcoming event
    message: '',
  });

  // Handle prefilled event name on mount or when it changes
  useEffect(() => {
    if (prefilledEventName) {
      const normalizedPrefilled = prefilledEventName.toLowerCase();
      const matched = VENDOR_CONFIG.upcomingEvents.find(evt => 
        normalizedPrefilled.includes(evt.name.toLowerCase()) || 
        evt.name.toLowerCase().includes(normalizedPrefilled)
      );
      if (matched) {
        setFormData(prev => ({ ...prev, event: matched.id }));
      } else {
        setFormData(prev => ({ ...prev, event: 'general' }));
      }

      // Smooth scroll to the form section
      const timer = setTimeout(() => {
        const formElement = document.getElementById('vendor-application-section');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [prefilledEventName]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form field change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to select a tier and scroll smoothly to the application form
  const handleSelectTier = (tierId: string) => {
    setFormData((prev) => ({ ...prev, tier: tierId }));
    const formElement = document.getElementById('vendor-application-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to select an event and scroll smoothly to the application form
  const handleSelectEvent = (eventId: string) => {
    setFormData((prev) => ({ ...prev, event: eventId }));
    const formElement = document.getElementById('vendor-application-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!formData.name || !formData.email || !formData.business || !formData.category || !formData.message) {
      setError('Please fill in all required fields (Full Name, Business Name, Email, Category, and Message).');
      return;
    }

    setLoading(true);

    // Map tier ID to readable tier name for EmailJS 'event' field
    const selectedTierObj = VENDOR_CONFIG.tiers.find(t => t.id === formData.tier);
    const readableTier = selectedTierObj ? `${selectedTierObj.name} (${selectedTierObj.price})` : formData.tier;

    // Map payment plan to readable name
    const selectedPlanObj = VENDOR_CONFIG.paymentOptions.find(p => p.id === formData.paymentPlan);
    const readablePlan = selectedPlanObj ? selectedPlanObj.title : formData.paymentPlan;

    // Map event ID to readable name
    const selectedEventObj = VENDOR_CONFIG.upcomingEvents.find(evt => evt.id === formData.event);
    const readableEvent = selectedEventObj ? selectedEventObj.name : 'General Exhibitor Inquiry';

    // Map template params using our zero-change mapping strategy
    const templateParams = {
      from_name: formData.name,
      business_name: `${formData.business} (Category: ${formData.category})`,
      from_email: formData.email,
      phone: formData.phone || 'N/A',
      event: `${readableEvent} — ${readableTier}`,
      message: formData.message,
      // Pass category and tier interest separately too in case they add custom variables in EmailJS later
      category: formData.category,
      tier_interest: readableTier
    };

    try {
      await emailjs.send(
        'service_j7a181v',
        'template_uwd0or8',
        templateParams,
        'dUpRmObSvyywLE_u_'
      );
      setLoading(false);
      setSubmitted(true);
      
      // Clear the form
      setFormData({
        name: '',
        business: '',
        email: '',
        phone: '',
        category: '',
        tier: 'starter-booth',
        paymentPlan: 'pay-in-full',
        event: 'las-vegas-food-arts',
        message: '',
      });
    } catch (error) {
      setLoading(false);
      console.error('EmailJS error:', error);
      setError('Something went wrong submitting your application. Please email us directly at alex@valerianevents.com');
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError(null);
  };

  // Filter tiers based on selected pillar
  const filteredTiers = activePillarFilter === 'all' 
    ? VENDOR_CONFIG.tiers 
    : VENDOR_CONFIG.tiers.filter(t => t.pillar === activePillarFilter);

  const pillarsList: { id: 'all' | VendorPillar; label: string; count: number; icon: any }[] = [
    { id: 'all', label: 'All Opportunities', count: VENDOR_CONFIG.tiers.length, icon: Sparkles },
    { id: 'marketplace', label: 'Marketplace Booths', count: VENDOR_CONFIG.tiers.filter(t => t.pillar === 'marketplace').length, icon: ShoppingBag },
    { id: 'food', label: 'Food & Culinary', count: VENDOR_CONFIG.tiers.filter(t => t.pillar === 'food').length, icon: Truck },
    { id: 'exhibitor', label: 'Business Exhibitors', count: VENDOR_CONFIG.tiers.filter(t => t.pillar === 'exhibitor').length, icon: Building },
    { id: 'activation', label: 'Brand Activations', count: VENDOR_CONFIG.tiers.filter(t => t.pillar === 'activation').length, icon: Rocket },
    { id: 'sponsorship', label: 'Sponsorship & Partners', count: VENDOR_CONFIG.tiers.filter(t => t.pillar === 'sponsorship').length, icon: Award }
  ];

  return (
    <div className="fade-in space-y-20 pb-24" id="vendors-recruitment-page">
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-white border-b border-gold/15" id="vendors-hero">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=1600&q=80"
            alt="Outdoor market stalls and visitors"
            className="w-full h-full object-cover opacity-5 filter grayscale brightness-95"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-5">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gold/30 bg-white hover:bg-forest/5 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
            id="vendors-back-btn"
          >
            <ArrowLeft className="h-4 w-4 text-gold" />
            <span>Back to Home</span>
          </button>

          <div className="space-y-4 max-w-3xl mx-auto pt-4">
            <span className="px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full bg-forest/10 text-forest border border-gold/20 inline-block">
              Event Participation & Partnership Opportunities
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight leading-tight uppercase">
              Choose the Level That Fits <br className="hidden sm:inline" />
              <span className="text-gold">Your Business & Budget</span>
            </h1>
            <p className="text-charcoal/70 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              From an affordable marketplace booth to a full headline event sponsorship, Valerian Events offers high-converting opportunities for businesses of every scale.
            </p>
          </div>
        </div>
      </section>

      {/* Spots Remaining Urgency Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-2xl bg-gold/10 border border-gold/30 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-charcoal shadow-sm">
          <div className="flex items-center space-x-2.5">
            <Flame className="h-5 w-5 text-gold animate-pulse shrink-0" />
            <span className="text-sm font-medium">
              Curated Placement: <strong className="font-bold text-forest">{VENDOR_CONFIG.spotsRemaining} of {VENDOR_CONFIG.totalSpots}</strong> prime booth spots remaining for upcoming dates.
            </span>
          </div>
          <button
            onClick={() => handleSelectTier('starter-booth')}
            className="px-4 py-1.5 bg-forest hover:bg-forest/90 text-cream text-[10px] font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
          >
            Lock In Your Space
          </button>
        </div>
      </section>

      {/* Pricing Menu & Opportunities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" id="participation-menu-section">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-gold uppercase tracking-widest font-sans">Full Opportunity Menu</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-forest uppercase">Participation & Space Packages</h2>
          <p className="text-charcoal/65 text-xs sm:text-sm font-light leading-relaxed">
            Select the tier aligned with your setup, footprint, and audience engagement goals. All options feature flexible payment terms.
          </p>
        </div>

        {/* Pillar Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-charcoal/5 rounded-2xl max-w-5xl mx-auto border border-gold/15">
          {pillarsList.map((pillar) => {
            const Icon = pillar.icon;
            const isActive = activePillarFilter === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarFilter(pillar.id)}
                className={`flex items-center space-x-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-sans text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-forest text-cream shadow-sm ring-1 ring-gold/30'
                    : 'text-charcoal/70 hover:text-forest hover:bg-white/60'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-gold' : 'text-charcoal/40'}`} />
                <span>{pillar.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-gold/20 text-gold font-bold' : 'bg-charcoal/10 text-charcoal/60'
                }`}>
                  {pillar.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredTiers.map((tier) => {
            const isFeatured = tier.highlightBadge !== undefined;
            const isTopSponsor = tier.pillar === 'sponsorship' && tier.rawPrice >= 10000;

            return (
              <div 
                key={tier.id}
                id={`tier-card-${tier.id}`}
                className={`p-6 sm:p-7 rounded-2xl border flex flex-col justify-between space-y-6 shadow-sm relative overflow-hidden transition-all duration-300 ${
                  isTopSponsor
                    ? 'bg-forest text-cream border-gold/40 ring-1 ring-gold/20'
                    : isFeatured
                    ? 'bg-white border-gold/40 ring-1 ring-gold/20 shadow-md'
                    : 'bg-white text-charcoal border-gold/20'
                }`}
              >
                {tier.highlightBadge && (
                  <div className={`absolute top-0 right-0 px-3 py-1 text-[9px] font-mono font-bold tracking-widest uppercase rounded-bl-xl ${
                    isTopSponsor 
                      ? 'bg-gold text-forest' 
                      : 'bg-gold/15 text-gold border-l border-b border-gold/30'
                  }`}>
                    {tier.highlightBadge}
                  </div>
                )}
                
                <div className="space-y-5">
                  {/* Category & Title */}
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center justify-between pr-16">
                      <span className={`text-[10px] font-mono font-bold tracking-widest uppercase block ${
                        isTopSponsor ? 'text-gold' : 'text-forest/70'
                      }`}>
                        {tier.pillarLabel}
                      </span>
                    </div>

                    <h3 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight ${
                      isTopSponsor ? 'text-cream' : 'text-forest'
                    }`}>
                      {tier.name}
                    </h3>

                    {/* Size & Footprint badge */}
                    <div className="pt-0.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${
                        isTopSponsor
                          ? 'bg-white/10 text-gold border-gold/30'
                          : 'bg-cream/50 text-forest border-gold/20'
                      }`}>
                        Footprint: {tier.size}
                      </span>
                    </div>
                  </div>

                  {/* Clean, Premium Pricing Display (Preserving Premium Value) */}
                  <div className="pt-2 pb-1 text-left border-y border-gold/10 py-3">
                    <div className="flex items-baseline space-x-2">
                      <span className={`text-2xl sm:text-3xl font-serif font-bold ${
                        isTopSponsor ? 'text-gold' : 'text-forest'
                      }`}>
                        {tier.price}
                      </span>
                    </div>
                    <span className={`block text-[10px] font-mono uppercase tracking-wider mt-1 ${
                      isTopSponsor ? 'text-cream/60' : 'text-charcoal/50'
                    }`}>
                      ✨ Flexible payment options available
                    </span>
                  </div>

                  {/* Description & Best For */}
                  <div className="space-y-2 text-left">
                    <p className={`text-xs font-light leading-relaxed ${
                      isTopSponsor ? 'text-cream/80' : 'text-charcoal/70'
                    }`}>
                      {tier.description}
                    </p>
                    {tier.bestFor && (
                      <div className={`p-2.5 rounded-lg text-[11px] leading-relaxed border ${
                        isTopSponsor 
                          ? 'bg-white/5 border-gold/20 text-cream/90' 
                          : 'bg-[#FAF6F0] border-gold/15 text-charcoal/80'
                      }`}>
                        <strong className={isTopSponsor ? 'text-gold' : 'text-forest'}>Best for: </strong>
                        <span className="font-light">{tier.bestFor}</span>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="pt-2">
                    <span className={`block text-[10px] font-mono font-bold uppercase tracking-widest mb-2.5 text-left ${
                      isTopSponsor ? 'text-gold' : 'text-forest/80'
                    }`}>
                      What's Included:
                    </span>
                    <ul className="space-y-2.5 text-xs text-left">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Check className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${
                            isTopSponsor ? 'text-gold' : 'text-forest'
                          }`} />
                          <span className={isTopSponsor ? 'text-cream/80' : 'text-charcoal/75'}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => handleSelectTier(tier.id)}
                    className={`w-full py-3 rounded-xl font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer flex items-center justify-center space-x-1.5 ${
                      isTopSponsor
                        ? 'bg-gold hover:bg-gold/90 text-forest shadow-md'
                        : 'bg-forest hover:bg-forest/95 text-cream shadow-sm'
                    }`}
                  >
                    <span>Apply For {tier.name}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Flexible Payment Options Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="flexible-payment-plans-section">
        <div className="p-8 md:p-12 rounded-3xl bg-white border border-gold/25 shadow-md space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-mono font-bold uppercase tracking-widest border border-gold/25">
              <CreditCard className="h-3.5 w-3.5" />
              <span>Capital Flexibility</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest uppercase">
              Flexible Payment Schedules
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/65 font-light leading-relaxed">
              We provide structured milestone options to preserve your operating cash flow leading up to the festival.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENDOR_CONFIG.paymentOptions.map((option) => (
              <div
                key={option.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 text-left ${
                  option.recommended
                    ? 'bg-[#FAF6F0] border-gold/40 shadow-sm ring-1 ring-gold/20'
                    : 'bg-white border-gold/15'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-lg font-bold text-forest">{option.title}</h4>
                    {option.recommended && (
                      <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 bg-forest text-cream rounded-full">
                        Direct
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-gold font-bold uppercase tracking-wider block">
                    {option.tagline}
                  </span>
                  <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                    {option.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gold/10 space-y-2 text-xs">
                  {option.breakdown.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-1.5 text-charcoal/75">
                      <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Payment Terms & Policy Notice */}
          <div className="p-6 rounded-2xl bg-[#11241E] text-cream border border-gold/30 space-y-4">
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="h-5 w-5 text-gold shrink-0" />
              <h4 className="font-serif text-base font-bold text-cream uppercase tracking-wide">
                Reservation Policy & Space Confirmation Terms
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-cream/80 font-light leading-relaxed">
              {VENDOR_CONFIG.paymentPolicyNotes.map((note, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-gold font-mono font-bold">•</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event Focus: Las Vegas & Late Night Launches */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#11241E] border border-gold/30 p-8 md:p-12 text-cream shadow-xl">
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-gold/20 blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-forest/30 blur-3xl"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Details Left */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase">UPCOMING HIGH-TRAFFIC SHOWCASE</span>
              </div>
              
              <div className="space-y-3">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream tracking-tight uppercase leading-tight">
                  Las Vegas Food, Arts & <br />
                  <span className="text-gold">Street Market Festival</span>
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-cream/80">
                  <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                    📍 200 South 3rd Street, Las Vegas, NV
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                    🗓️ August 28, 2026 (9 AM – 1 PM)
                  </span>
                  <span className="flex items-center gap-1.5 bg-gold/15 text-gold px-2.5 py-1 rounded border border-gold/20 font-bold">
                    🎟️ 65 SPOTS • ALL TIERS OPEN
                  </span>
                </div>
              </div>

              <p className="text-cream/80 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
                Las Vegas Food, Arts & Street Market Festival brings together food lovers, food trucks, local vendors, artists, makers, businesses, and entertainers for a vibrant weekend of commerce and live entertainment. Full utilities provided including power, water, and weather cover.
              </p>

              <div className="border-t border-white/10 pt-5 space-y-3">
                <span className="block text-[10px] font-mono font-bold text-gold tracking-widest uppercase">OPPORTUNITY LEVELS ACCEPTING APPLICATIONS:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-cream/90">
                  <div className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span><strong className="font-semibold text-cream">Marketplace & Crafters</strong> (10'×10' to 10'×20' Corners)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span><strong className="font-semibold text-cream">Food Vendors & Food Trucks</strong> (Dedicated power & greywater)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span><strong className="font-semibold text-cream">Commercial Business Exhibitors</strong> (Lead generation & demos)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span><strong className="font-semibold text-cream">Brand Activations & Sponsors</strong> (Sampling & VIP presence)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Right Card */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 text-center space-y-6">
              <span className="text-[10px] font-mono font-bold tracking-widest text-gold uppercase block">Exhibitor Guarantee</span>
              <ul className="space-y-4 text-xs text-left text-cream/80">
                <li className="flex items-center space-x-3">
                  <div className="p-1 bg-gold/15 text-gold rounded border border-gold/25">
                    <Users className="h-4 w-4" />
                  </div>
                  <span>High-intent food connoisseur & shopper audience</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="p-1 bg-gold/15 text-gold rounded border border-gold/25">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span>Strict product category quotas to prevent over-duplication</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="p-1 bg-gold/15 text-gold rounded border border-gold/25">
                    <Layers className="h-4 w-4" />
                  </div>
                  <span>Full utility backing (power, water, parking, waste)</span>
                </li>
              </ul>
              
              <button
                onClick={() => handleSelectEvent('las-vegas-food-arts')}
                className="w-full py-3.5 bg-gold hover:bg-gold/90 text-forest font-sans text-xs font-bold tracking-widest uppercase rounded-xl transition-all shadow-md cursor-pointer"
              >
                Apply for Las Vegas Festival
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Advantages Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-gold uppercase tracking-widest font-sans">Strategic Advantage</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-forest uppercase">Why Partner With Valerian Events?</h2>
          <p className="text-charcoal/65 text-xs sm:text-sm font-light leading-relaxed">
            We don't just sell spaces—we engineer a high-energy festival ecosystem built entirely around merchant and partner ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white border border-gold/15 rounded-2xl space-y-4 text-left shadow-sm">
            <div className="p-3 bg-forest/5 text-forest rounded-xl border border-gold/10 inline-block">
              <TrendingUp className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-forest">High-Volume Foot Traffic</h3>
            <p className="text-xs text-charcoal/70 font-light leading-relaxed">
              Our festivals attract average crowds of 8,000 to 15,000+ passionate, hungry foodies per weekend event, resulting in highly condensed sales potential.
            </p>
          </div>

          <div className="p-6 bg-white border border-gold/15 rounded-2xl space-y-4 text-left shadow-sm">
            <div className="p-3 bg-forest/5 text-forest rounded-xl border border-gold/10 inline-block">
              <Megaphone className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-forest">No Ticket Barriers for Visitors</h3>
            <p className="text-xs text-charcoal/70 font-light leading-relaxed">
              We leverage an open, accessible festival framework at high-end public hubs to remove friction and pull in massive spontaneous foot traffic.
            </p>
          </div>

          <div className="p-6 bg-white border border-gold/15 rounded-2xl space-y-4 text-left shadow-sm">
            <div className="p-3 bg-forest/5 text-forest rounded-xl border border-gold/10 inline-block">
              <Clock className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-forest">Professional Infrastructure</h3>
            <p className="text-xs text-charcoal/70 font-light leading-relaxed">
              Forget unstable generators. We provide robust low-fluctuation electric current hookups, professional waste compactors, greywater ports, and grease disposal bins on-site.
            </p>
          </div>
        </div>
      </section>

      {/* Vendor Application Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6" id="vendor-application-section">
        <div className="p-8 md:p-10 bg-white border border-gold/20 rounded-2xl shadow-xl shadow-forest/5 space-y-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-forest uppercase">
              Exhibitor & Partner Application Form
            </h3>
            <p className="text-xs text-charcoal/65 mt-1 font-light">
              Submit your brand profile and select your preferred opportunity level to receive priority placement review.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-6 fade-in" id="vendor-form-success">
              <div className="inline-flex p-4 bg-forest/10 text-forest rounded-full border border-forest/20 shadow-[0_0_20px_rgba(27,77,62,0.1)]">
                <CheckCircle2 className="h-10 w-10 text-gold" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold tracking-tight text-forest">Application Received!</h3>
                <p className="text-charcoal/80 text-sm max-w-md mx-auto leading-relaxed font-light">
                  Thank you! Our curated vendor and partnership team has received your application and will reach out to you within 24 business hours.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-cream border border-gold/20 max-w-sm mx-auto text-xs text-charcoal/80 space-y-2">
                <span className="block font-bold text-forest tracking-wider uppercase text-[10px]">What Happens Next?</span>
                <p className="font-light leading-relaxed">
                  We will evaluate your category synergy, confirm layout availability, and email your official approval notice along with your selected payment schedule.
                </p>
              </div>
              <button
                onClick={resetForm}
                className="px-6 py-3 rounded-full border border-gold/30 bg-transparent text-forest hover:bg-neutral-50 text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" id="vendors-apply-form">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold leading-relaxed flex items-start space-x-2.5">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Contact Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                    Contact Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Martha Razine"
                    className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal placeholder-charcoal/45 text-sm outline-none transition-all duration-200"
                  />
                </div>

                {/* Business Name */}
                <div className="space-y-1.5">
                  <label htmlFor="business" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                    Business / Brand Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="business"
                    name="business"
                    required
                    value={formData.business}
                    onChange={handleChange}
                    placeholder="e.g. Artisan Kitchen Co."
                    className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal placeholder-charcoal/45 text-sm outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. contact@artisankitchen.com"
                    className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal placeholder-charcoal/45 text-sm outline-none transition-all duration-200"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. (702) 555-0199"
                    className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal placeholder-charcoal/45 text-sm outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Product/Category */}
                <div className="space-y-1.5">
                  <label htmlFor="category" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                    Product / Business Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Artisan Bakery, Food Truck, Jewelry, Corporate"
                    className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal placeholder-charcoal/45 text-sm outline-none transition-all duration-200"
                  />
                </div>

                {/* Event Preference */}
                <div className="space-y-1.5">
                  <label htmlFor="event" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                    Target Festival / Event <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="event"
                      name="event"
                      value={formData.event}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
                    >
                      {VENDOR_CONFIG.upcomingEvents.map((evt) => (
                        <option key={evt.id} value={evt.id}>
                          {evt.name} ({evt.location})
                        </option>
                      ))}
                      <option value="general">Multi-City Tour / All Upcoming Events</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tier Interest Grouped Dropdown */}
              <div className="space-y-1.5">
                <label htmlFor="tier" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                  Opportunity / Space Level <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="tier"
                    name="tier"
                    value={formData.tier}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal text-sm outline-none transition-all duration-200 appearance-none cursor-pointer font-medium"
                  >
                    <optgroup label="🛍️ MARKETPLACE BOOTHS">
                      {VENDOR_CONFIG.tiers.filter(t => t.pillar === 'marketplace').map(t => (
                        <option key={t.id} value={t.id}>{t.name} ({t.size}) — {t.price}</option>
                      ))}
                    </optgroup>

                    <optgroup label="🚚 FOOD & CULINARY">
                      {VENDOR_CONFIG.tiers.filter(t => t.pillar === 'food').map(t => (
                        <option key={t.id} value={t.id}>{t.name} ({t.size}) — {t.price}</option>
                      ))}
                    </optgroup>

                    <optgroup label="🏢 BUSINESS EXHIBITOR PACKAGES">
                      {VENDOR_CONFIG.tiers.filter(t => t.pillar === 'exhibitor').map(t => (
                        <option key={t.id} value={t.id}>{t.name} ({t.size}) — {t.price}</option>
                      ))}
                    </optgroup>

                    <optgroup label="🚀 BRAND ACTIVATIONS">
                      {VENDOR_CONFIG.tiers.filter(t => t.pillar === 'activation').map(t => (
                        <option key={t.id} value={t.id}>{t.name} — {t.price}</option>
                      ))}
                    </optgroup>

                    <optgroup label="🤝 SPONSORSHIP & PARTNERSHIPS">
                      {VENDOR_CONFIG.tiers.filter(t => t.pillar === 'sponsorship').map(t => (
                        <option key={t.id} value={t.id}>{t.name} — {t.price}</option>
                      ))}
                    </optgroup>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                  Tell Us About Your Brand, Setup, & Special Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your display setup, trailer dimensions, electrical needs, menu items, or activation vision..."
                  className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal placeholder-charcoal/45 text-sm outline-none transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-forest hover:bg-forest/95 text-cream font-sans text-xs font-bold tracking-widest uppercase transition-all shadow-sm cursor-pointer flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-gold" />
                    <span>TRANSMITTING APPLICATION...</span>
                  </>
                ) : (
                  <span>SUBMIT APPLICATION FOR REVIEW</span>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Repeated Bottom Contact Block */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-8 md:p-10 rounded-2xl bg-[#FAF6F0] border border-gold/20 space-y-6 text-center shadow-sm">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-gold uppercase tracking-widest font-sans">Planning Concierge</span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest uppercase">Speak Directly with Curators</h3>
            <p className="text-xs text-charcoal/70 max-w-md mx-auto leading-relaxed font-light">
              Have questions regarding power, health permits, load-in corridors, or corporate sponsorship packages? We're here to assist.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <a
              href={`mailto:${VENDOR_CONFIG.contact.email}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gold text-forest hover:bg-white text-xs font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Mail className="h-4 w-4 text-gold" />
              <span>{VENDOR_CONFIG.contact.email}</span>
            </a>
            <a
              href={VENDOR_CONFIG.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gold bg-white text-forest hover:bg-forest/5 text-xs font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Phone className="h-4 w-4 text-gold" />
              <span>Call / WhatsApp: {VENDOR_CONFIG.contact.formattedPhone}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
