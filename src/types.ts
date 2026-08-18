export interface Event {
  id: string;
  slug?: string;
  title: string;
  date: string;
  location: string;
  image: string;
  spotsLeft: number;
  totalSpots: number;
  tag: 'Los Angeles' | 'New York City' | 'Miami' | 'Austin' | 'Las Vegas' | 'Atlanta' | 'Houston' | 'All';
  category: string;
  description: string;
  cost: string;
  attendance: string;
  highlight: string;
  ticketLink?: string;
  isPast?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface VendorCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export type PageType = 'home' | 'events' | 'vendor-info' | 'vendors' | 'contact' | 'event-detail' | 'terms-of-service' | 'privacy-policy' | 'refund-policy' | 'sponsorship-deck' | 'about' | 'faq';

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  eventInterest: string;
  message: string;
}
