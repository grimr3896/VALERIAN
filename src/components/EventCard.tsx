import React from 'react';
import { Event } from '../types';
import { Calendar, MapPin, Users } from 'lucide-react';

interface EventCardProps {
  key?: React.Key;
  event: Event;
  onApply: (eventName: string) => void;
  onViewDetails: (eventId: string) => void;
}

export default function EventCard({ event, onApply, onViewDetails }: EventCardProps) {
  const isSoldOut = event.spotsLeft === 0;
  const isAlmostFull = event.spotsLeft > 0 && event.spotsLeft <= 5;

  return (
    <div
      id={`event-card-${event.id}`}
      className="group relative flex flex-col h-full rounded-2xl bg-white border border-gold/20 overflow-hidden hover:border-gold/50 hover:shadow-[0_12px_32px_rgba(27,77,62,0.06)] transition-all duration-300"
    >
      {/* Image banner with status tag */}
      <div className="relative h-56 overflow-hidden bg-neutral-100">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-charcoal/10 to-transparent"></div>

        {/* Status badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-forest text-cream border border-gold/30">
            {event.category}
          </span>
        </div>

        <div className="absolute top-4 right-4">
          {isSoldOut ? (
            <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-red-100 text-red-800 border border-red-200">
              Sold Out
            </span>
          ) : isAlmostFull ? (
            <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
              Only {event.spotsLeft} Spots Left
            </span>
          ) : (
            <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              {event.spotsLeft} Spots Available
            </span>
          )}
        </div>
      </div>

      {/* Content body */}
      <div className="flex-1 flex flex-col p-6">
        <h3 className="font-serif text-xl font-bold tracking-tight text-forest group-hover:text-gold transition-colors duration-200">
          {event.title}
        </h3>

        <div className="mt-4 space-y-2 text-xs text-charcoal/70">
          <div className="flex items-center space-x-2.5">
            <Calendar className="h-4 w-4 text-gold shrink-0" />
            <span className="font-semibold">{event.date}</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <MapPin className="h-4 w-4 text-gold shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Users className="h-4 w-4 text-gold shrink-0" />
            <span>Est. {event.attendance}</span>
          </div>
        </div>

        <p className="mt-4 text-xs md:text-sm text-charcoal/60 line-clamp-2 leading-relaxed font-light flex-1">
          {event.description}
        </p>

        {/* Action buttons */}
        <div className="mt-6 pt-4 border-t border-gold/10 flex items-center justify-between gap-3">
          <button
            onClick={() => onViewDetails(event.id)}
            id={`event-details-btn-${event.id}`}
            className="flex-1 py-2.5 px-4 rounded-xl border border-gold/30 bg-transparent text-forest hover:bg-forest/5 font-sans text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
          >
            Details
          </button>

          <button
            onClick={() => onApply(event.title)}
            id={`event-action-btn-${event.id}`}
            disabled={isSoldOut}
            className={`flex-1 py-2.5 px-4 rounded-xl font-sans text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              isSoldOut
                ? 'bg-neutral-100 border border-neutral-200 text-neutral-400 cursor-not-allowed'
                : 'bg-forest text-cream hover:bg-forest/90 hover:shadow-md hover:shadow-forest/10'
            }`}
          >
            {isSoldOut ? 'Join Waitlist' : 'Apply Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
