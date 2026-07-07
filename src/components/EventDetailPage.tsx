import React from 'react';
import { Event } from '../types';
import { Calendar, MapPin, Users, DollarSign, Sparkles, ArrowLeft, Ticket, CheckCircle2, ChevronRight, Shield, ShieldCheck } from 'lucide-react';
import { FOUNDER_DATA } from '../data';

interface EventDetailPageProps {
  event: Event;
  onApply: (eventName: string) => void;
  onBack: () => void;
}

export default function EventDetailPage({ event, onApply, onBack }: EventDetailPageProps) {
  const isSoldOut = event.spotsLeft === 0;
  const isAlmostFull = event.spotsLeft > 0 && event.spotsLeft <= 5;
  const spotsSecured = event.totalSpots - event.spotsLeft;
  const percentFull = Math.round((spotsSecured / event.totalSpots) * 100);

  return (
    <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" id={`event-detail-${event.id}`}>
      {/* Navigation Breadcrumb & Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gold/30 bg-white hover:bg-forest/5 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
          id="event-detail-back-btn"
        >
          <ArrowLeft className="h-4 w-4 text-gold" />
          <span>Back to Lineup</span>
        </button>

        <div className="hidden sm:flex items-center space-x-2 text-xs text-charcoal/50 font-mono tracking-wider">
          <span className="hover:text-forest transition-colors cursor-pointer" onClick={onBack}>EVENTS</span>
          <ChevronRight className="h-3.5 w-3.5 text-gold/65" />
          <span className="text-forest font-medium uppercase">{event.title}</span>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column - main image and info (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Visual Banner with floating status */}
          <div className="relative rounded-2xl border border-gold/20 overflow-hidden shadow-xl bg-neutral-100 aspect-video max-h-[500px]">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent"></div>

            {/* Float tags */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3 items-end justify-between">
              <div>
                <span className="px-3.5 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-full bg-gold text-forest shadow-md border border-white/20">
                  {event.category}
                </span>
                <h1 className="mt-2.5 font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-md leading-none">
                  {event.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Quick Specifications Deck */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white border border-gold/15 rounded-2xl shadow-sm space-y-1.5 hover:border-gold/30 transition-all duration-300">
              <span className="block text-[10px] text-charcoal/50 font-bold tracking-wider uppercase font-sans">Date & Schedule</span>
              <div className="flex items-center space-x-2 text-forest">
                <Calendar className="h-4 w-4 text-gold shrink-0" />
                <span className="text-sm font-bold">{event.date}</span>
              </div>
            </div>

            <div className="p-5 bg-white border border-gold/15 rounded-2xl shadow-sm space-y-1.5 hover:border-gold/30 transition-all duration-300">
              <span className="block text-[10px] text-charcoal/50 font-bold tracking-wider uppercase font-sans">Venue City</span>
              <div className="flex items-center space-x-2 text-forest">
                <MapPin className="h-4 w-4 text-gold shrink-0" />
                <span className="text-sm font-bold truncate">{event.location}</span>
              </div>
            </div>

            <div className="p-5 bg-white border border-gold/15 rounded-2xl shadow-sm space-y-1.5 hover:border-gold/30 transition-all duration-300">
              <span className="block text-[10px] text-charcoal/50 font-bold tracking-wider uppercase font-sans">Est. Foot Traffic</span>
              <div className="flex items-center space-x-2 text-forest">
                <Users className="h-4 w-4 text-gold shrink-0" />
                <span className="text-sm font-bold">{event.attendance}</span>
              </div>
            </div>
          </div>

          {/* About description */}
          <div className="p-8 bg-white border border-gold/15 rounded-2xl shadow-sm space-y-4">
            <h2 className="font-serif text-xl font-bold text-forest border-b border-gold/10 pb-3">Festival Curation Profile</h2>
            <p className="text-charcoal/80 text-sm md:text-base leading-relaxed font-light">
              {event.description}
            </p>
          </div>

          {/* Inclusion benefits */}
          <div className="p-8 bg-gradient-to-br from-white to-cream/30 border border-gold/25 rounded-2xl shadow-sm space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Sparkles className="h-24 w-24 text-gold" />
            </div>

            <div className="flex items-center space-x-3 text-gold">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-forest">Exhibitor Inclusion package</h3>
            </div>
            
            <p className="text-charcoal/85 text-xs md:text-sm leading-relaxed font-light">
              {event.highlight}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gold/10 text-xs text-charcoal/70">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>COI verification assistance and guidelines provided.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>Dedicated power hookups and safety checks.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>Overnight logistics, waste management, and security.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>Inclusion in professional festival media assets.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Side panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Capacity and application ticket container */}
          <div className="p-6 bg-white border-2 border-gold/30 rounded-2xl shadow-md space-y-6 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-forest/5 rounded-bl-full pointer-events-none" />

            <div className="space-y-1">
              <span className="block text-[10px] text-charcoal/50 font-bold tracking-wider uppercase font-sans">Availability Status</span>
              <div>
                {isSoldOut ? (
                  <span className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-red-100 text-red-800 border border-red-200">
                    Fully Booked
                  </span>
                ) : isAlmostFull ? (
                  <span className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                    Only {event.spotsLeft} Spots Left
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {event.spotsLeft} Openings Available
                  </span>
                )}
              </div>
            </div>

            {/* Booking progress */}
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-charcoal/70">Booth Allocation</span>
                <span className="text-forest font-bold">{spotsSecured} / {event.totalSpots} Secured ({percentFull}%)</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-neutral-100 border border-gold/15 overflow-hidden">
                <div
                  className="h-full bg-forest transition-all duration-700 rounded-full"
                  style={{ width: `${percentFull}%` }}
                ></div>
              </div>
            </div>

            {/* Application checklist */}
            <div className="p-4 rounded-xl bg-cream/35 border border-gold/15 space-y-3">
              <h4 className="font-serif text-xs font-bold tracking-wide uppercase text-forest flex items-center space-x-1.5">
                <ShieldCheck className="h-4 w-4 text-gold" />
                <span>Guaranteed Curation Standards</span>
              </h4>
              <ul className="space-y-2 text-xs text-charcoal/75 font-light">
                <li className="flex items-center space-x-2">
                  <span className="h-1 w-1 rounded-full bg-gold shrink-0"></span>
                  <span>Flat fee - 100% retail sales kept</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1 w-1 rounded-full bg-gold shrink-0"></span>
                  <span>10x10 premium canopy included</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="h-1 w-1 rounded-full bg-gold shrink-0"></span>
                  <span>Standard 110V/15A electric feed</span>
                </li>
              </ul>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => onApply(event.title)}
              id={`event-detail-action-btn-${event.id}`}
              className={`w-full py-3.5 px-4 rounded-xl font-sans text-xs font-bold tracking-widest uppercase shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                isSoldOut
                  ? 'bg-neutral-100 border border-neutral-200 text-neutral-400 cursor-not-allowed hover:shadow-none'
                  : 'bg-forest text-cream hover:bg-forest/95 hover:shadow-md hover:shadow-forest/20'
              }`}
            >
              <Ticket className="h-4 w-4 text-gold shrink-0" />
              <span>{isSoldOut ? 'Join Vendor Waitlist' : 'Apply for this Event'}</span>
            </button>

            {/* Eventbrite Ticket Button for Attendees */}
            {event.ticketLink && (
              <a
                href={event.ticketLink}
                target="_blank"
                rel="noopener noreferrer"
                id={`event-detail-ticket-btn-${event.id}`}
                className="w-full py-3 px-4 rounded-xl font-sans text-xs font-bold tracking-widest uppercase border border-[#F05537] text-[#F05537] hover:bg-[#F05537]/5 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span className="text-sm">🎟️</span>
                <span>Get Eventbrite Tickets</span>
              </a>
            )}
          </div>
 
          {/* Quick Support Deck */}
          <div className="p-6 bg-forest rounded-2xl border border-gold/30 text-cream space-y-4">
            <h4 className="font-serif text-sm font-bold tracking-wider text-gold uppercase">{FOUNDER_DATA.name}</h4>
            <span className="block text-[10px] text-cream/60 font-mono uppercase tracking-wider">{FOUNDER_DATA.title}</span>
            <p className="text-xs text-cream/80 font-light leading-relaxed">
              "We maintain high curation standards to preserve sales margins for every exhibitor. Reach out immediately to evaluate your concept."
            </p>
            <div className="pt-2 border-t border-white/10 text-xs text-cream/70 space-y-2 font-mono">
              <div className="flex items-center space-x-1.5">
                <span className="text-gold">Email:</span>
                <a href={`mailto:${FOUNDER_DATA.email}`} className="hover:text-gold transition-colors">{FOUNDER_DATA.email}</a>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-gold">WhatsApp:</span>
                <a href={`https://wa.me/1${FOUNDER_DATA.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors flex items-center space-x-1">
                  <svg
                    className="h-3.5 w-3.5 text-[#25D366] fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                  </svg>
                  <span className="font-semibold underline">{FOUNDER_DATA.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
