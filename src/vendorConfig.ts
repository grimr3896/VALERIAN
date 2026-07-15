export interface VendorTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface UpcomingVendorEvent {
  id: string;
  name: string;
  date: string;
  location: string;
}

export interface VendorConfig {
  spotsRemaining: number;
  totalSpots: number;
  tiers: VendorTier[];
  upcomingEvents: UpcomingVendorEvent[];
  confirmedVendors: { name: string; logo?: string }[];
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    formattedPhone: string;
  };
}

export const VENDOR_CONFIG: VendorConfig = {
  spotsRemaining: 12,
  totalSpots: 20,
  tiers: [
    {
      id: 'standard',
      name: 'Standard Booth',
      price: '[EDIT PRICE] $250/event',
      description: 'Ideal for small-batch spice makers, hot sauce brands, pantry labels, and artisanal lifestyle goods.',
      features: [
        '10x10 Reserved Event Space Canopy',
        'Standard 15A Electricity Access',
        'Inclusion in the Festival digital directory',
        'Professional waste & greywater disposal',
        '24-Hour on-site event security'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Spot',
      price: '[EDIT PRICE] $450/event',
      description: 'Designed for active hot-food preparation, experiential showcases, or brands seeking high-visibility corner setups.',
      features: [
        'High-visibility 10x15 Corner Booth placement',
        'Dedicated 20A low-fluctuation electric current',
        '1x Featured Social Media Spotlight (40k+ reach)',
        'Direct access to greywater & ice supply ports',
        'Overnight secure compound coverage'
      ]
    },
    {
      id: 'anchor',
      name: 'Anchor Vendor / Food Truck',
      price: '[EDIT PRICE] $750/event',
      description: 'Reserved for premium food trucks, mobile beverage lounges, and prominent anchor culinary brands.',
      features: [
        'Prime Food Truck Lane spot or full 10x20 footprint',
        'High-capacity 30A electricity hookup',
        'Dedicated social media campaign & email feature',
        'Priority load-in/load-out concierge services',
        '4x VIP Event Credentials for team access'
      ]
    }
  ],
  upcomingEvents: [
    {
      id: 'late-night-bites',
      name: 'Late Night Bites & Spirits Market',
      date: 'Fall 2026 (TBD)',
      location: 'Los Angeles, CA'
    },
    {
      id: 'taco-tequila',
      name: 'Taco & Tequila Street Fiesta',
      date: 'Aug 16, 2026',
      location: 'Las Vegas, NV'
    },
    {
      id: 'whiskey-bbq',
      name: 'Whiskey & BBQ Fest',
      date: 'Apr 10-11, 2027',
      location: 'Miami, FL'
    },
    {
      id: 'hot-sauce-expo',
      name: 'American Hot Sauce & Spicy Food Expo',
      date: 'Jul 11, 2026',
      location: 'Austin, TX'
    },
    {
      id: 'street-eats',
      name: 'USA Street Eats & Craft Drinks Festival',
      date: 'Aug 21-23, 2026',
      location: 'Las Vegas, NV'
    },
    {
      id: 'miami-summer',
      name: 'Miami Summer Vendor Market & Food Truck Festival',
      date: 'Jul 25-26, 2026',
      location: 'Miami, FL'
    }
  ],
  /* 
    Confirmed Vendors List
    IMPORTANT: This is set to an empty array by default to avoid showing fake or placeholder names.
    Populate with real, confirmed vendor names (and optionally logo paths) before going live.
  */
  confirmedVendors: [],
  contact: {
    email: 'alex@valerianevents.com',
    phone: '+17276336611',
    whatsapp: 'https://wa.me/17276336611',
    formattedPhone: '(727) 633-6611'
  }
};
