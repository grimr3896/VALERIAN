import { Event } from '../types';

const MONTH_MAP: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
};

/**
 * Parses an event date string like "Sep 18-20, 2026", "Aug 28, 2026", or "Jan 12, 2027"
 * into a start Date object.
 */
export function getEventStartDate(dateStr: string): Date {
  const match = dateStr.match(/([A-Za-z]{3})\s+(\d+)(?:-(\d+))?,\s+(\d{4})/);
  if (!match) return new Date(0);
  const [_, monthName, startDay, , year] = match;
  const month = MONTH_MAP[monthName] ?? 0;
  return new Date(parseInt(year, 10), month, parseInt(startDay, 10), 0, 0, 0);
}

/**
 * Parses an event date string into an end Date object.
 */
export function getEventEndDate(dateStr: string): Date {
  const match = dateStr.match(/([A-Za-z]{3})\s+(\d+)(?:-(\d+))?,\s+(\d{4})/);
  if (!match) return new Date(0);
  const [_, monthName, startDay, endDay, year] = match;
  const month = MONTH_MAP[monthName] ?? 0;
  const day = endDay ? parseInt(endDay, 10) : parseInt(startDay, 10);
  return new Date(parseInt(year, 10), month, day, 23, 59, 59);
}

/**
 * Checks if an event is in the past, respecting the explicit isPast boolean flag or date comparison.
 */
export function isEventPast(event: Event, referenceDate: Date = new Date()): boolean {
  if (typeof event.isPast === 'boolean') {
    return event.isPast;
  }
  const endDate = getEventEndDate(event.date);
  return endDate.getTime() < referenceDate.getTime();
}

/**
 * Sorts upcoming events chronologically (soonest first).
 */
export function sortUpcomingEvents(events: Event[]): Event[] {
  return [...events].sort((a, b) => {
    return getEventStartDate(a.date).getTime() - getEventStartDate(b.date).getTime();
  });
}

/**
 * Sorts past events reverse-chronologically (most recently concluded first).
 */
export function sortPastEvents(events: Event[]): Event[] {
  return [...events].sort((a, b) => {
    return getEventStartDate(b.date).getTime() - getEventStartDate(a.date).getTime();
  });
}

/**
 * Groups events cleanly into upcoming and past categories with proper chronological sorting.
 */
export function groupAndSortEvents(events: Event[], referenceDate: Date = new Date()): {
  upcoming: Event[];
  past: Event[];
} {
  const upcoming: Event[] = [];
  const past: Event[] = [];

  for (const event of events) {
    if (isEventPast(event, referenceDate)) {
      past.push(event);
    } else {
      upcoming.push(event);
    }
  }

  return {
    upcoming: sortUpcomingEvents(upcoming),
    past: sortPastEvents(past)
  };
}
