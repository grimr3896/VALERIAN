import React, { useState } from 'react';
import { Event } from '../types';
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Sparkles, 
  ArrowLeft, 
  Ticket, 
  CheckCircle2, 
  ChevronRight, 
  Shield, 
  ShieldCheck, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink,
  Download,
  Clock,
  Car,
  Zap,
  HelpCircle
} from 'lucide-react';
import { FOUNDER_DATA } from '../data';
import { getEventSlug, getEventShareUrl } from '../utils/urlRouter';

interface EventDetailPageProps {
  event: Event;
  onApply: (eventName: string) => void;
  onBack: () => void;
}

export default function EventDetailPage({ event, onApply, onBack }: EventDetailPageProps) {
  const [copied, setCopied] = useState(false);
  const isSoldOut = event.spotsLeft === 0;
  const isAlmostFull = event.spotsLeft > 0 && event.spotsLeft <= 5;
  const spotsSecured = event.totalSpots - event.spotsLeft;
  const percentFull = Math.round((spotsSecured / event.totalSpots) * 100);

  const isNightMarket = event.id === 'ev-32';
  const eventSlug = getEventSlug(event);
  const shareUrl = getEventShareUrl(event);

  const getCityPricing = (cityTag: string) => {
    switch (cityTag) {
      case 'Las Vegas': return { standard: '$350', corner: '$500', foodTruck: '$450' };
      case 'Miami': return { standard: '$450', corner: '$600', foodTruck: '$550' };
      case 'Los Angeles': return { standard: '$450', corner: '$600', foodTruck: '$550' };
      case 'Austin': return { standard: '$400', corner: '$550', foodTruck: '$500' };
      case 'Houston': return { standard: '$400', corner: '$550', foodTruck: '$500' };
      case 'New York City': return { standard: '$500', corner: '$650', foodTruck: '$600' };
      default: return { standard: '$350', corner: '$500', foodTruck: '$450' };
    }
  };

  const pricing = getCityPricing(event.tag);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const el = document.createElement('textarea');
        el.value = shareUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: `Check out ${event.title} on Valerian Events!`,
          url: shareUrl,
        });
      } catch (err) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div 
      className={`fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 transition-all duration-500 relative ${
        isNightMarket 
          ? 'bg-gradient-to-b from-[#091512] to-[#12221C] rounded-3xl p-6 sm:p-8 md:p-10 border border-gold/20 text-cream my-8 shadow-2xl' 
          : ''
      }`} 
      id={`event-detail-${event.id}`}
    >
      {/* Navigation Breadcrumb & Back button & Share */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
              isNightMarket
                ? 'border-gold/40 bg-gold/5 hover:bg-gold/15 text-cream hover:text-gold'
                : 'border-gold/30 bg-white hover:bg-forest/5 text-forest font-semibold'
            }`}
            id="event-detail-back-btn"
          >
            <ArrowLeft className="h-4 w-4 text-gold" />
            <span>Back to All Events</span>
          </button>

          <button
            onClick={handleNativeShare}
            id="event-detail-share-btn"
            className={`inline-flex items-center space-x-2 px-3.5 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer text-xs font-semibold ${
              isNightMarket
                ? 'border-gold/30 bg-gold/10 hover:bg-gold/20 text-gold'
                : 'border-gold/30 bg-white hover:bg-gold/10 text-forest'
            }`}
            title="Share this event page link"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-500 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 text-gold" />
                <span className="hidden sm:inline">Share Event URL</span>
              </>
            )}
          </button>
        </div>

        <div className={`hidden sm:flex items-center space-x-2 text-xs font-mono tracking-wider ${isNightMarket ? 'text-cream/50' : 'text-charcoal/50'}`}>
          <span className="hover:text-forest transition-colors cursor-pointer" onClick={onBack}>EVENTS</span>
          <ChevronRight className="h-3.5 w-3.5 text-gold/65" />
          <span className={`font-medium uppercase truncate max-w-xs ${isNightMarket ? 'text-gold' : 'text-forest'}`}>{event.title}</span>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left column - main image and info (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Visual Banner */}
          <div className={`relative rounded-2xl overflow-hidden shadow-xl aspect-video max-h-[480px] transition-all duration-300 ${
            isNightMarket 
              ? 'border-2 border-gold/40 shadow-[0_0_25px_rgba(212,175,55,0.15)] bg-forest/30' 
              : 'border border-gold/20 bg-neutral-100'
          }`}>
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3 items-end justify-between">
              <div>
                <span className="px-3.5 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-full bg-gold text-forest shadow-md border border-white/20">
                  {event.category} • {event.tag}
                </span>
                <h1 className="mt-2.5 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-md leading-none">
                  {event.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Quick Specifications Deck (4 Key Metrics) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className={`p-4 rounded-2xl shadow-sm space-y-1 ${
              isNightMarket ? 'bg-white/5 border border-gold/25 text-cream' : 'bg-white border border-gold/15 text-forest'
            }`}>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-gold font-sans">Date</span>
              <div className="flex items-center space-x-1.5">
                <Calendar className="h-3.5 w-3.5 text-gold shrink-0" />
                <span className="text-xs sm:text-sm font-bold truncate">{event.date}</span>
              </div>
            </div>

            <div className={`p-4 rounded-2xl shadow-sm space-y-1 ${
              isNightMarket ? 'bg-white/5 border border-gold/25 text-cream' : 'bg-white border border-gold/15 text-forest'
            }`}>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-gold font-sans">Event Hours</span>
              <div className="flex items-center space-x-1.5">
                <Clock className="h-3.5 w-3.5 text-gold shrink-0" />
                <span className="text-xs sm:text-sm font-bold truncate">11 AM – 8 PM</span>
              </div>
            </div>

            <div className={`p-4 rounded-2xl shadow-sm space-y-1 ${
              isNightMarket ? 'bg-white/5 border border-gold/25 text-cream' : 'bg-white border border-gold/15 text-forest'
            }`}>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-gold font-sans">Venue City</span>
              <div className="flex items-center space-x-1.5">
                <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
                <span className="text-xs sm:text-sm font-bold truncate">{event.location}</span>
              </div>
            </div>

            <div className={`p-4 rounded-2xl shadow-sm space-y-1 ${
              isNightMarket ? 'bg-white/5 border border-gold/25 text-cream' : 'bg-white border border-gold/15 text-forest'
            }`}>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-gold font-sans">Attendance</span>
              <div className="flex items-center space-x-1.5">
                <Users className="h-3.5 w-3.5 text-gold shrink-0" />
                <span className="text-xs sm:text-sm font-bold truncate">{event.attendance}</span>
              </div>
            </div>
          </div>

          {/* About description */}
          <div className={`p-8 rounded-2xl shadow-sm space-y-4 ${
            isNightMarket ? 'bg-white/5 border border-gold/20 text-cream' : 'bg-white border border-gold/15 text-charcoal/80'
          }`}>
            <h2 className={`font-serif text-xl font-bold border-b pb-3 ${isNightMarket ? 'text-gold border-gold/20' : 'text-forest border-gold/10'}`}>
              Festival Curation Profile & Concept
            </h2>
            <p className={`text-sm leading-relaxed font-light ${isNightMarket ? 'text-cream/90' : 'text-charcoal/80'}`}>
              {event.description}
            </p>
          </div>

          {/* Booth Fee Structure Breakdown */}
          <div className="p-8 rounded-2xl bg-white border border-gold/20 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-gold/15 pb-3">
              <div>
                <span className="text-[10px] font-mono text-gold font-bold uppercase tracking-wider block">Transparent Pricing</span>
                <h3 className="font-serif text-xl font-bold text-forest uppercase">Booth Fee Breakdown for {event.tag}</h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 bg-forest/5 text-forest font-bold rounded-full border border-gold/20">
                100% Sales Kept (0% Cut)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-cream/40 border border-gold/20 space-y-2">
                <span className="text-[10px] font-mono text-forest/70 font-bold uppercase block">Standard 10'×10' Booth</span>
                <span className="text-2xl font-serif font-bold text-forest">{pricing.standard}</span>
                <span className="text-[10px] text-charcoal/60 block">Includes 1 table, 2 chairs, 110V power & 2-car parking</span>
              </div>

              <div className="p-4 rounded-xl bg-cream/40 border border-gold/20 space-y-2">
                <span className="text-[10px] font-mono text-forest/70 font-bold uppercase block">Premium Corner Space</span>
                <span className="text-2xl font-serif font-bold text-forest">{pricing.corner}</span>
                <span className="text-[10px] text-charcoal/60 block">Double aisle exposure, 10'×20' canopy footprint</span>
              </div>

              <div className="p-4 rounded-xl bg-cream/40 border border-gold/20 space-y-2">
                <span className="text-[10px] font-mono text-forest/70 font-bold uppercase block">Food Truck / Mobile Rig</span>
                <span className="text-2xl font-serif font-bold text-forest">{pricing.foodTruck}</span>
                <span className="text-[10px] text-charcoal/60 block">Dedicated 30A/50A electric & greywater access</span>
              </div>
            </div>
          </div>

          {/* Full Vendor Inclusions */}
          <div className="p-8 border rounded-2xl shadow-sm space-y-5 bg-gradient-to-br from-white to-cream/30 border-gold/25">
            <div className="flex items-center space-x-3 text-forest">
              <Sparkles className="h-5 w-5 text-gold" />
              <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-forest">
                What's Included With Every Vendor Space
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-charcoal/80">
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span><strong>Heavy-Duty Canopy & Table Setup:</strong> Commercial 10x10 canopy, 6-foot draped table, and 2 chairs.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span><strong>Electricity Hookup:</strong> 110V/15A standard electric outlet with dedicated circuit breaker protection.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span><strong>Free Parking:</strong> Guaranteed complimentary parking passes for up to 2 merchant vehicles/trailers.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span><strong>$5M General Liability Co-Insurance:</strong> Event umbrella insurance included; COI verification assistance.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span><strong>Waste & Overnight Security:</strong> On-site grease disposal, greywater dumps, and 24-hour guarded security.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span><strong>Marketing Promotion:</strong> Direct inclusion in pre-event foodie newsletters (12k+ list) & social reels.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Side panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Capacity and application ticket container */}
          <div className="p-6 border-2 rounded-2xl shadow-md space-y-6 bg-white border-gold/30 text-charcoal">
            <div className="space-y-1">
              <span className="block text-[10px] font-bold tracking-wider uppercase font-sans text-charcoal/50">Space Availability</span>
              <div>
                {event.isPast ? (
                  <span className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-neutral-200 text-neutral-700 border border-neutral-300">
                    Concluded
                  </span>
                ) : isSoldOut ? (
                  <span className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-red-100 text-red-800 border border-red-200">
                    Fully Booked
                  </span>
                ) : isAlmostFull ? (
                  <span className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-amber-100 text-amber-800 border border-amber-300 animate-pulse font-bold">
                    Only {event.spotsLeft} Spots Left
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
                    {event.spotsLeft} Openings Available
                  </span>
                )}
              </div>
            </div>

            {/* Booking progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-charcoal/70">Booth Allocation</span>
                <span className="font-bold text-forest">{spotsSecured} / {event.totalSpots} Secured ({percentFull}%)</span>
              </div>
              <div className="h-2.5 w-full rounded-full overflow-hidden bg-neutral-100 border border-gold/15">
                <div
                  className="h-full transition-all duration-700 rounded-full bg-forest"
                  style={{ width: `${percentFull}%` }}
                ></div>
              </div>
            </div>

            {/* Setup & Logistics Times */}
            <div className="p-4 rounded-xl bg-cream/40 border border-gold/20 text-xs space-y-2">
              <span className="font-bold text-forest uppercase tracking-wider text-[10px] block">Event Timetable</span>
              <div className="flex justify-between">
                <span className="text-charcoal/70">Vendor Setup:</span>
                <span className="font-semibold text-forest">7:00 AM – 10:30 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70">Doors Open:</span>
                <span className="font-semibold text-forest">11:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70">Festival Closes:</span>
                <span className="font-semibold text-forest">8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70">Apply By:</span>
                <span className="font-semibold text-gold">14 Days Prior to Event</span>
              </div>
            </div>

            {/* Refund & Approval Guarantee Box */}
            <div className="p-4 rounded-xl bg-forest/5 border border-gold/20 text-xs space-y-1.5">
              <div className="flex items-center space-x-2 text-forest font-bold text-[11px] uppercase">
                <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
                <span>100% Refund Guarantee</span>
              </div>
              <p className="text-[11px] text-charcoal/70 font-light leading-relaxed">
                Full 100% refund issued immediately if your space application is not approved or confirmed within 14 days.
              </p>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => onApply(event.title)}
              id={`event-detail-action-btn-${event.id}`}
              disabled={isSoldOut || event.isPast}
              className={`w-full py-4 px-4 rounded-xl font-sans text-xs font-bold tracking-widest uppercase shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                event.isPast || isSoldOut
                  ? 'bg-neutral-100 border border-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-forest text-cream hover:bg-forest/95'
              }`}
            >
              <Ticket className="h-4 w-4 text-gold shrink-0" />
              <span>{event.isPast ? 'Exhibition Concluded' : isSoldOut ? 'Join Vendor Waitlist' : `Apply for ${event.title}`}</span>
            </button>
          </div>

          {/* Quick Support Deck */}
          <div className="p-6 bg-forest rounded-2xl border border-gold/30 text-cream space-y-3">
            <h4 className="font-serif text-sm font-bold tracking-wider text-gold uppercase">Direct Vendor Inquiries</h4>
            <p className="text-xs text-cream/80 font-light leading-relaxed">
              Have questions about booth sizing, health permits, or load-in logistics? Our team responds within 24 business hours.
            </p>
            <div className="pt-2 border-t border-white/10 text-xs text-cream/80 space-y-1.5 font-mono">
              <div>Email: <a href="mailto:info@valerianevents.com" className="text-gold hover:underline">info@valerianevents.com</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
