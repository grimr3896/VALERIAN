import React, { useState, useRef } from 'react';
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
  Loader2 
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { VENDOR_CONFIG } from '../vendorConfig';

// Initialize EmailJS immediately for this module
emailjs.init('dUpRmObSvyywLE_u_');

interface VendorsPageProps {
  onBack: () => void;
  onPageChange: (page: string) => void;
}

export default function VendorsPage({ onBack, onPageChange }: VendorsPageProps) {
  const formRef = useRef<HTMLFormElement>(null);
  
  // State for Form fields
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    category: '',
    tier: 'standard', // default to standard
    event: 'late-night-bites', // default to Late Night Bites & Spirits Market
    message: '',
  });

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
    const readableTier = selectedTierObj ? selectedTierObj.name : formData.tier;

    // Map event ID to readable name
    const selectedEventObj = VENDOR_CONFIG.upcomingEvents.find(evt => evt.id === formData.event);
    const readableEvent = selectedEventObj ? selectedEventObj.name : 'General Exhibitor Inquiry';

    // Map template params using our zero-change mapping strategy
    const templateParams = {
      from_name: formData.name,
      business_name: `${formData.business} (Category: ${formData.category})`,
      from_email: formData.email,
      phone: formData.phone || 'N/A',
      event: `${readableEvent} — ${readableTier} Application`,
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
        tier: 'standard',
        event: 'late-night-bites',
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
              Exhibitor Recruitment 2026
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight leading-tight uppercase">
              Reach Thousands of High-Intent <br className="hidden sm:inline" />
              <span className="text-gold">Festival Attendees</span> in One Afternoon
            </h1>
            <p className="text-charcoal/70 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              We engineer premium culinary and luxury makers markets across the nation's premier cities. Apply to access our active, curated, high-volume visitor rosters.
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
              Highly Curated Placement: <strong className="font-bold text-forest">{VENDOR_CONFIG.spotsRemaining} of {VENDOR_CONFIG.totalSpots}</strong> booths left for the upcoming calendar season.
            </span>
          </div>
          <button
            onClick={() => handleSelectTier('standard')}
            className="px-4 py-1.5 bg-forest hover:bg-forest/90 text-cream text-[10px] font-bold tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
          >
            Lock In Your Spot
          </button>
        </div>
      </section>

      {/* Featured Event Focus: Late Night Bites & Spirits Market */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#11241E] border border-gold/30 p-8 md:p-12 text-cream shadow-xl">
          {/* Subtle night-market atmospheric glow effects */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-gold/20 blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-forest/30 blur-3xl"></div>
            {/* Soft string light glowing points */}
            <div className="absolute top-4 left-10 w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_8px_#D4AF37]"></div>
            <div className="absolute top-3 left-28 w-2.5 h-2.5 rounded-full bg-gold/80 animate-pulse delay-100 shadow-[0_0_10px_#D4AF37]"></div>
            <div className="absolute top-5 left-48 w-2 h-2 rounded-full bg-gold/90 animate-pulse delay-300 shadow-[0_0_8px_#D4AF37]"></div>
            <div className="absolute top-4 left-64 w-2.5 h-2.5 rounded-full bg-gold/70 animate-pulse delay-500 shadow-[0_0_10px_#D4AF37]"></div>
            <div className="absolute top-6 left-80 w-2 h-2 rounded-full bg-gold/90 animate-pulse delay-200 shadow-[0_0_8px_#D4AF37]"></div>
            <div className="absolute top-3 right-10 w-2 h-2 rounded-full bg-gold animate-pulse delay-400 shadow-[0_0_8px_#D4AF37]"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Details Left */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase">FEATURED LAUNCH</span>
              </div>
              
              <div className="space-y-3">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream tracking-tight uppercase leading-tight">
                  Late Night Bites <br />
                  <span className="text-gold">& Spirits Market</span>
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-cream/80">
                  <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                    📍 Los Angeles, CA (TBD)
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                    🗓️ Fall 2026 (TBD)
                  </span>
                  <span className="flex items-center gap-1.5 bg-gold/15 text-gold px-2.5 py-1 rounded border border-gold/20 font-bold">
                    🎟️ FREE ENTRY (21+ Skew)
                  </span>
                </div>
              </div>

              <p className="text-cream/80 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
                Differentiating from typical daytime family festivals, this evening open-air night market skews toward a 21+ audience of high-value spenders. Framed by warm overhead string lights, an active live DJ, and sophisticated beverage pairings, we create a high-vibe social space for active buying.
              </p>

              <div className="border-t border-white/10 pt-5 space-y-3">
                <span className="block text-[10px] font-mono font-bold text-gold tracking-widest uppercase">TARGET VENDOR MIX WE ARE RECRUITING:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-cream/90">
                  <div className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span><strong className="font-semibold text-cream">Night Food Trucks & Stalls</strong> (Gourmet street eats, active grills)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span><strong className="font-semibold text-cream">Spirits & Cocktail Brands</strong> (Mezcal, tequila, craft tasting stalls)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span><strong className="font-semibold text-cream">Small-Batch Condiments</strong> (Hot sauce, spices, pantry makers)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span><strong className="font-semibold text-cream">Dessert & Artisan Makers</strong> (Gourmet treats, unique crafts)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Right Card */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 text-center space-y-6">
              <span className="text-[10px] font-mono font-bold tracking-widest text-gold uppercase block">Exhibitor Benefits</span>
              <ul className="space-y-4 text-xs text-left text-cream/80">
                <li className="flex items-center space-x-3">
                  <div className="p-1 bg-gold/15 text-gold rounded border border-gold/25">
                    <Users className="h-4 w-4" />
                  </div>
                  <span>High-converting 21+ evening foodie demographic</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="p-1 bg-gold/15 text-gold rounded border border-gold/25">
                    <Sparkles className="h-4 w-4" />
                    </div>
                  <span>Sampling & direct-to-consumer bottle sales access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="p-1 bg-gold/15 text-gold rounded border border-gold/25">
                    <Layers className="h-4 w-4" />
                  </div>
                  <span>Full utility backing (20A power, ash/ice concierge)</span>
                </li>
              </ul>
              
              <button
                onClick={() => handleSelectEvent('late-night-bites')}
                className="w-full py-3.5 bg-gold hover:bg-gold/90 text-forest font-sans text-xs font-bold tracking-widest uppercase rounded-xl transition-all shadow-md cursor-pointer"
              >
                Apply for Late Night Bites
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* "Why Vendor With Us" Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-gold uppercase tracking-widest font-sans">Strategic Advantage</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-forest uppercase">Why Vendor With Us?</h2>
          <p className="text-charcoal/65 text-xs sm:text-sm font-light leading-relaxed">
            We don't just sell spaces—we design a comprehensive ecosystem built entirely around merchant profitability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Advantage 1 */}
          <div className="p-6 bg-white border border-gold/15 rounded-2xl space-y-4 text-left shadow-sm">
            <div className="p-3 bg-forest/5 text-forest rounded-xl border border-gold/10 inline-block">
              <TrendingUp className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-forest">High-Volume Foot Traffic</h3>
            <p className="text-xs text-charcoal/70 font-light leading-relaxed">
              Our festivals attract average crowds of 8,000 to 15,000+ passionate, hungry foodies per weekend event, resulting in highly condensed sales potential.
            </p>
          </div>

          {/* Advantage 2 */}
          <div className="p-6 bg-white border border-gold/15 rounded-2xl space-y-4 text-left shadow-sm">
            <div className="p-3 bg-forest/5 text-forest rounded-xl border border-gold/10 inline-block">
              <Megaphone className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-forest">No Ticket Barriers for Visitors</h3>
            <p className="text-xs text-charcoal/70 font-light leading-relaxed">
              We leverage an open, accessible festival framework at high-end public hubs (like Miami's Regatta Grove) to remove friction and pull in spontaneous foot traffic.
            </p>
          </div>

          {/* Advantage 3 */}
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

      {/* Pricing Tiers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-gold uppercase tracking-widest font-sans">Space Tiers</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-forest uppercase">Available Vendor Tiers</h2>
          <p className="text-charcoal/65 text-xs sm:text-sm font-light leading-relaxed">
            Select the perfect package configuration matching your culinary setup, product volume, and brand layout needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {VENDOR_CONFIG.tiers.map((tier) => (
            <div 
              key={tier.id}
              className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between space-y-8 shadow-md relative overflow-hidden transition-all duration-300 ${
                tier.id === 'premium' 
                  ? 'bg-forest text-cream border-gold/40 ring-1 ring-gold/20 scale-103 lg:-translate-y-2' 
                  : 'bg-white text-charcoal border-gold/20'
              }`}
            >
              {tier.id === 'premium' && (
                <div className="absolute top-0 right-0 p-3 bg-gold/15 rounded-bl-xl text-[8px] font-bold tracking-widest text-gold uppercase font-mono">
                  Highly Requested
                </div>
              )}
              
              <div className="space-y-6">
                <div className="space-y-2 text-left">
                  <span className={`text-[10px] font-mono font-bold tracking-wider uppercase block ${
                    tier.id === 'premium' ? 'text-gold' : 'text-gold/80'
                  }`}>
                    {tier.name}
                  </span>
                  <h3 className={`font-serif text-xl sm:text-2xl font-bold ${
                    tier.id === 'premium' ? 'text-cream' : 'text-forest'
                  }`}>
                    {tier.id === 'standard' ? 'Standard Booth' : tier.id === 'premium' ? 'Premium Spot' : 'Anchor Space'}
                  </h3>
                  <div className="pt-2">
                    <span className={`text-2xl font-serif font-bold ${
                      tier.id === 'premium' ? 'text-gold' : 'text-forest'
                    }`}>
                      {tier.price}
                    </span>
                    <span className={`block text-[10px] font-mono uppercase tracking-wider ${
                      tier.id === 'premium' ? 'text-cream/50' : 'text-charcoal/40'
                    }`}>
                      Flat-fee per weekend
                    </span>
                  </div>
                  <p className={`text-xs font-light leading-relaxed pt-2 ${
                    tier.id === 'premium' ? 'text-cream/70' : 'text-charcoal/65'
                  }`}>
                    {tier.description}
                  </p>
                </div>

                <div className={`border-t pt-6 ${
                  tier.id === 'premium' ? 'border-gold/15' : 'border-gold/10'
                }`}>
                  <span className={`block text-[10px] font-mono font-bold uppercase tracking-widest mb-3 ${
                    tier.id === 'premium' ? 'text-gold' : 'text-forest/80'
                  }`}>
                    What's Included:
                  </span>
                  <ul className="space-y-3.5 text-xs text-left">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2.5">
                        <Check className={`h-4 w-4 shrink-0 mt-0.5 ${
                          tier.id === 'premium' ? 'text-gold' : 'text-forest'
                        }`} />
                        <span className={tier.id === 'premium' ? 'text-cream/80' : 'text-charcoal/80'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleSelectTier(tier.id)}
                  className={`w-full py-3 rounded-xl font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                    tier.id === 'premium'
                      ? 'bg-gold hover:bg-gold/90 text-forest shadow-md'
                      : 'bg-forest hover:bg-forest/95 text-cream shadow-sm'
                  }`}
                >
                  Apply For This Tier
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Confirmed Vendors / Social Proof (Conditional) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {VENDOR_CONFIG.confirmedVendors.length > 0 ? (
          <div className="p-8 md:p-10 rounded-2xl bg-white border border-gold/15 space-y-8 text-center shadow-sm">
            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-xs font-bold text-gold uppercase tracking-widest font-sans">Active Partners</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest">Confirmed Curated Vendors</h3>
              <p className="text-xs text-charcoal/65 font-light">
                You'll be in stellar company with some of the region's premium entrepreneurs and local culinary craft brands.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-center">
              {VENDOR_CONFIG.confirmedVendors.map((vendor, index) => (
                <div key={index} className="p-4 rounded-xl border border-gold/10 bg-cream/30 text-center flex items-center justify-center h-20 shadow-sm">
                  <span className="font-serif font-bold text-sm text-forest uppercase tracking-wider">{vendor.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 md:p-10 rounded-3xl bg-white border border-gold/15 text-center shadow-sm max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-left max-w-xl">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-gold/10 border border-gold/25 text-gold">
                <Sparkles className="h-4 w-4" />
                <span className="text-[10px] font-bold tracking-wider uppercase font-sans">Category Diversity Policy</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest uppercase">We Limit Vendor Duplication</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                To protect your retail sales and ensure maximum margins for all participating merchants, we enforce strict product diversity quotas. Apply early to lock in your specialty product category!
              </p>
            </div>
            <button
              onClick={() => handleSelectTier('standard')}
              className="px-6 py-3 bg-forest hover:bg-forest/95 text-cream text-xs font-bold tracking-widest uppercase rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Verify Category Availability
            </button>
          </div>
        )}
      </section>

      {/* Vendor Application Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6" id="vendor-application-section">
        <div className="p-8 md:p-10 bg-white border border-gold/20 rounded-2xl shadow-xl shadow-forest/5 space-y-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-forest uppercase">Merchant Registration Form</h3>
            <p className="text-xs text-charcoal/65 mt-1 font-light">Submit your profile below to secure priority evaluation and placement options.</p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-6 fade-in" id="vendor-form-success">
              <div className="inline-flex p-4 bg-forest/10 text-forest rounded-full border border-forest/20 shadow-[0_0_20px_rgba(27,77,62,0.1)]">
                <CheckCircle2 className="h-10 w-10 text-gold" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold tracking-tight text-forest">Application Received!</h3>
                <p className="text-charcoal/80 text-sm max-w-md mx-auto leading-relaxed font-light">
                  Thank you! Our curated vendor coordinator has received your brand profile and will reach out to you within 24 business hours.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-cream border border-gold/20 max-w-sm mx-auto text-xs text-charcoal/80 space-y-2">
                <span className="block font-bold text-forest tracking-wider uppercase text-[10px]">What's Next?</span>
                <p className="font-light leading-relaxed">
                  Check your inbox for a confirmation. We will review your category synergy and send over available booth spacing floorplans.
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
                    placeholder="e.g. John Carter"
                    className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal placeholder-charcoal/45 text-sm outline-none transition-all duration-200"
                  />
                </div>

                {/* Business Name */}
                <div className="space-y-1.5">
                  <label htmlFor="business" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="business"
                    name="business"
                    required
                    value={formData.business}
                    onChange={handleChange}
                    placeholder="e.g. Carter Spice Artisans"
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
                    placeholder="e.g. contact@carterspice.com"
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
                    placeholder="e.g. (305) 555-0144"
                    className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal placeholder-charcoal/45 text-sm outline-none transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Product/Category */}
                <div className="space-y-1.5">
                  <label htmlFor="category" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                    Product / Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Gourmet Hot Sauce, Leather Goods"
                    className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal placeholder-charcoal/45 text-sm outline-none transition-all duration-200"
                  />
                </div>

                {/* Event Preference */}
                <div className="space-y-1.5">
                  <label htmlFor="event" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                    Event Preference <span className="text-red-500">*</span>
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
                      <option value="general">General Exhibitor Roster (All Events)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Tier Interest */}
                <div className="space-y-1.5">
                  <label htmlFor="tier" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                    Tier Interest <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="tier"
                      name="tier"
                      value={formData.tier}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
                    >
                      {VENDOR_CONFIG.tiers.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} — {t.price.replace('[EDIT PRICE] ', '')}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                  Tell Us About Your Brand & Setup <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your active display setup, cooking equipment needed, dimensions, and menu items..."
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
              Have technical questions regarding power, health permits, load-in corridors, or logistics? Get instant clarity.
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
