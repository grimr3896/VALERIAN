import { Event, PageType } from '../types';

/**
 * Generates a clean URL slug from a title string
 */
export function generateEventSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Returns the effective slug for an event
 */
export function getEventSlug(event: Event): string {
  if (event.slug && event.slug.trim()) {
    return event.slug.trim();
  }
  return generateEventSlug(event.title);
}

/**
 * Finds an event from a list by slug, ID, ticket URL ID, or fuzzy name
 */
export function findEventInList(query: string, events: Event[]): Event | undefined {
  if (!query || !query.trim()) return undefined;

  const normalized = query.trim().toLowerCase();
  const slugified = generateEventSlug(query);
  const cleanId = normalized.replace(/[^a-z0-9_-]/g, '');

  // 1. Direct ID match (e.g. "ev-33", "ev-07", "ev-32")
  const idMatch = events.find(e => e.id.toLowerCase() === normalized || e.id.toLowerCase() === cleanId);
  if (idMatch) return idMatch;

  // 2. Direct slug match
  const slugMatch = events.find(e => {
    const eSlug = getEventSlug(e);
    return eSlug === normalized || eSlug === slugified;
  });
  if (slugMatch) return slugMatch;

  // 3. Ticket link / Eventbrite ticket ID match (e.g. "1997926883090", "1992705609119")
  const ticketMatch = events.find(e => {
    if (!e.ticketLink) return false;
    return e.ticketLink.toLowerCase().includes(normalized);
  });
  if (ticketMatch) return ticketMatch;

  // 4. Starts with / contains slug segment match
  const subSlugMatch = events.find(e => {
    const eSlug = getEventSlug(e);
    return (
      eSlug.startsWith(slugified) ||
      slugified.startsWith(eSlug) ||
      eSlug.includes(slugified) ||
      slugified.includes(eSlug)
    );
  });
  if (subSlugMatch) return subSlugMatch;

  // 5. Title substring or exact match
  const titleMatch = events.find(e => {
    const eTitle = e.title.toLowerCase();
    return eTitle.includes(normalized) || normalized.includes(eTitle);
  });
  if (titleMatch) return titleMatch;

  return undefined;
}

/**
 * Parses initial URL parameters (search query, hash, pathname) to determine initial page and event
 */
export function parseInitialUrlState(events: Event[]): {
  page: PageType;
  selectedEventId: string | null;
  searchQuery: string;
  activeFilter?: 'All' | 'Los Angeles' | 'New York City' | 'Miami' | 'Austin' | 'Las Vegas' | 'Atlanta' | 'Houston';
} {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash ? window.location.hash.replace(/^#\/?/, '') : '';
    const path = window.location.pathname ? window.location.pathname.replace(/^\//, '') : '';

    // Check for event query parameters: ?event=... or ?id=... or ?slug=... or ?event_id=...
    const eventQuery = 
      searchParams.get('event') || 
      searchParams.get('id') || 
      searchParams.get('slug') || 
      searchParams.get('event_id') || 
      searchParams.get('e');

    if (eventQuery) {
      const matched = findEventInList(eventQuery, events);
      if (matched) {
        return {
          page: 'event-detail',
          selectedEventId: matched.id,
          searchQuery: ''
        };
      }
    }

    // Check for hash-based event route e.g. #/event/taste-shop-usa or #event/ev-07
    if (hash.startsWith('event/') || hash.startsWith('events/')) {
      const hashEventQuery = hash.replace(/^events?\//, '');
      const matched = findEventInList(hashEventQuery, events);
      if (matched) {
        return {
          page: 'event-detail',
          selectedEventId: matched.id,
          searchQuery: ''
        };
      }
    }

    // Check for path-based event route e.g. /event/taste-shop-usa
    if (path.startsWith('event/') || path.startsWith('events/')) {
      const pathEventQuery = path.replace(/^events?\//, '');
      const matched = findEventInList(pathEventQuery, events);
      if (matched) {
        return {
          page: 'event-detail',
          selectedEventId: matched.id,
          searchQuery: ''
        };
      }
    }

    // Check for general search query: ?search=... or ?q=...
    const generalSearch = searchParams.get('search') || searchParams.get('q') || searchParams.get('query');
    if (generalSearch) {
      // Check if it's an exact match for an event
      const matched = findEventInList(generalSearch, events);
      if (matched) {
        return {
          page: 'event-detail',
          selectedEventId: matched.id,
          searchQuery: generalSearch
        };
      }
      return {
        page: 'events',
        selectedEventId: null,
        searchQuery: generalSearch
      };
    }

    // Check for page param: ?page=events, ?page=vendors, etc.
    const pageParam = searchParams.get('page') as PageType | null;
    const validPages: PageType[] = [
      'home', 'events', 'vendor-info', 'vendors', 'contact', 
      'event-detail', 'vendor-kit', 'terms-of-service', 
      'privacy-policy', 'sponsorship-deck', 'about'
    ];

    if (pageParam && validPages.includes(pageParam)) {
      return {
        page: pageParam,
        selectedEventId: null,
        searchQuery: ''
      };
    }

    // Check for city filter param: ?city=Miami or ?tag=Las Vegas
    const cityParam = searchParams.get('city') || searchParams.get('tag');
    if (cityParam) {
      const validCities = ['Los Angeles', 'New York City', 'Miami', 'Austin', 'Las Vegas', 'Atlanta', 'Houston'] as const;
      const matchedCity = validCities.find(c => c.toLowerCase() === cityParam.toLowerCase());
      if (matchedCity) {
        return {
          page: 'events',
          selectedEventId: null,
          searchQuery: '',
          activeFilter: matchedCity
        };
      }
    }
  } catch (err) {
    console.error('Error parsing URL state:', err);
  }

  return {
    page: 'home',
    selectedEventId: null,
    searchQuery: ''
  };
}

/**
 * Synchronizes the current page and event state into browser URL history
 */
export function updateBrowserUrl(
  page: PageType, 
  eventId: string | null, 
  events: Event[], 
  replace: boolean = false,
  searchQuery?: string
): void {
  try {
    let newUrl = window.location.pathname;
    const params = new URLSearchParams();

    if (page === 'event-detail' && eventId) {
      const event = events.find(e => e.id === eventId);
      if (event) {
        const slug = getEventSlug(event);
        params.set('event', slug);
      } else {
        params.set('event', eventId);
      }
    } else if (page !== 'home') {
      params.set('page', page);
      if (page === 'events' && searchQuery && searchQuery.trim()) {
        params.set('search', searchQuery.trim());
      }
    } else if (searchQuery && searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }

    const queryString = params.toString();
    newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;

    if (replace) {
      window.history.replaceState({ page, eventId }, '', newUrl);
    } else {
      // Don't push identical URL state repeatedly
      const currentFullUrl = `${window.location.pathname}${window.location.search}`;
      if (currentFullUrl !== newUrl) {
        window.history.pushState({ page, eventId }, '', newUrl);
      }
    }
  } catch (err) {
    console.error('Error updating browser URL:', err);
  }
}

/**
 * Generates a full shareable deep link URL for an event
 */
export function getEventShareUrl(event: Event): string {
  const slug = getEventSlug(event);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  return `${origin}${pathname}?event=${slug}`;
}
