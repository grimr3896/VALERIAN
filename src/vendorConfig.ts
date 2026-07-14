export interface VendorTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface VendorConfig {
  spotsRemaining: number;
  totalSpots: number;
  tiers: VendorTier[];
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
