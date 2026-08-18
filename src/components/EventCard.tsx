import React, { useState } from 'react';
import { Event } from '../types';
import { Calendar, MapPin, Users, Clock, DollarSign, ChevronDown, ChevronUp, ShieldCheck, Check, ArrowRight } from 'lucide-react';

interface EventCardProps {
  key?: React.Key;
  event: Event;
  onApply: (eventName: string) => void;
  onViewDetails: (eventId: string) => void;
}

export default function EventCard({ event, onApply, onViewDetails }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isSoldOut = event.spotsLeft === 0;
  const isAlmostFull = event.spotsLeft > 0 && event.spotsLeft <= 5;

  // Derive city booth cost estimate based on tag/city
  const getBoothFee = (cityTag: string) => {
    switch (cityTag) {
      case 'Las Vegas': return '$350 / weekend';
      case 'Miami': return '$450 / weekend';
      case 'Los Angeles': return '$450 / weekend';
      case 'Austin': return '$400 / weekend';
      case 'Houston': return '$400 / weekend';
      case 'New York City': return '$500 / weekend';
      default: return '$350 - $450 / weekend';
    }
  };

  return (
    <div
      id={`event-card-${event.id}`}
      className="group relative flex flex-col h-full rounded-2xl bg-white border border-gold/20 overflow-hidden hover:border-gold/50 hover:shadow-[0_12px_32px_rgba(27,77,62,0.06)] transition-all duration-300"
    >
      {/* Image banner with status tag */}
      <div className="relative h-52 overflow-hidden bg-neutral-100">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent"></div>

        {/* Status badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2">
          <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-forest text-cream border border-gold/30">
            {event.category}
          </span>
          <span className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider uppercase rounded-full bg-gold text-forest shadow-xs">
            {event.tag}
          </span>
        </div>

        <div className="absolute top-3.5 right-3.5">
          {event.isPast ? (
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-neutral-200 text-neutral-700 border border-neutral-300">
              Concluded
            </span>
          ) : isSoldOut ? (
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-red-100 text-red-800 border border-red-200">
              Sold Out
            </span>
          ) : isAlmostFull ? (
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-amber-100 text-amber-800 border border-amber-300 animate-pulse font-semibold">
              {event.spotsLeft} Spots Left
            </span>
          ) : (
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              {event.spotsLeft} Spots Open
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3.5 right-3.5 flex justify-between items-center text-[11px] text-white/90 font-mono">
          <span className="bg-charcoal/60 px-2 py-0.5 rounded backdrop-blur-xs">
            Fee: {getBoothFee(event.tag)}
          </span>
          <span className="bg-charcoal/60 px-2 py-0.5 rounded backdrop-blur-xs">
            0% Commission
          </span>
        </div>
      </div>

      {/* Content body */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 space-y-3.5">
        <h3 className="font-serif text-xl font-bold tracking-tight text-forest group-hover:text-gold transition-colors duration-200">
          {event.title}
        </h3>

        {/* Structured Spec Badges */}
        <div className="space-y-2 text-xs text-charcoal/70">
          <div className="flex items-center space-x-2">
            <Calendar className="h-3.5 w-3.5 text-gold shrink-0" />
            <span className="font-semibold text-charcoal">{event.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-3.5 w-3.5 text-gold shrink-0" />
            <span>Expected Attendance: <strong className="text-forest">{event.attendance}</strong></span>
          </div>
        </div>

        <p className="text-xs text-charcoal/65 line-clamp-2 leading-relaxed font-light">
          {event.description}
        </p>

        {/* Expandable Info Toggle */}
        <div className="pt-2 border-t border-gold/15">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-forest hover:text-gold transition-colors cursor-pointer"
          >
            <span>{isExpanded ? 'Hide Event Specs' : 'View Key Event Specs'}</span>
            {isExpanded ? <ChevronUp className="h-3.5 w-3.5 text-gold" /> : <ChevronDown className="h-3.5 w-3.5 text-gold" />}
          </button>

          {isExpanded && (
            <div className="mt-2.5 p-3 rounded-xl bg-cream/40 border border-gold/20 text-xs space-y-2 fade-in">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-charcoal/60">Event Hours:</span>
                <span className="font-semibold text-forest">11:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-charcoal/60">Vendor Setup:</span>
                <span className="font-semibold text-forest">7:00 AM – 10:30 AM</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-charcoal/60">Standard Booth:</span>
                <span className="font-bold text-forest">{getBoothFee(event.tag)}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-charcoal/60">Application Deadline:</span>
                <span className="font-semibold text-gold">Rolling (14 Days Prior)</span>
              </div>
              <div className="pt-1.5 border-t border-gold/10 text-[10px] text-charcoal/70 space-y-1">
                <div className="flex items-center space-x-1.5">
                  <Check className="h-3 w-3 text-gold shrink-0" />
                  <span>Includes 10x10 space, table, 2 chairs, power & parking</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Check className="h-3 w-3 text-gold shrink-0" />
                  <span>100% refundable if unconfirmed within 14 days</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-auto pt-4 border-t border-gold/10 flex items-center justify-between gap-2.5">
          <button
            onClick={() => onViewDetails(event.id)}
            id={`event-details-btn-${event.id}`}
            className="flex-1 py-2.5 px-3 rounded-xl border border-gold/30 bg-transparent text-forest hover:bg-forest/5 font-sans text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer text-center"
          >
            Full Details
          </button>

          <button
            onClick={() => onApply(event.title)}
            id={`event-action-btn-${event.id}`}
            disabled={isSoldOut || event.isPast}
            className={`flex-1 py-2.5 px-3 rounded-xl font-sans text-xs font-bold tracking-wider uppercase transition-all cursor-pointer text-center ${
              event.isPast || isSoldOut
                ? 'bg-neutral-100 border border-neutral-200 text-neutral-400 cursor-not-allowed shadow-none'
                : 'bg-forest text-cream hover:bg-forest/90 shadow-sm'
            }`}
          >
            {event.isPast ? 'Concluded' : isSoldOut ? 'Waitlist' : 'Apply Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
