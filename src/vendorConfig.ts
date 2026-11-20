import { isEventDatePast, getEventStartDate } from './utils/eventDateUtils';

export type VendorPillar = 'marketplace' | 'food' | 'exhibitor' | 'activation' | 'sponsorship';

export interface VendorTier {
  id: string;
  name: string;
  size: string;
  price: string;
  rawPrice: number;
  pillar: VendorPillar;
  pillarLabel: string;
  sponsorClass?: 'sponsor' | 'executive';
  icon: string;
  description: string;
  tagline?: string;
  bestFor?: string;
  highlightBadge?: string;
  features: string[];
}

export interface PaymentOption {
  id: string;
  title: string;
  tagline: string;
  description: string;
  breakdown: string[];
  recommended?: boolean;
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
  customSponsorshipOpportunities?: string[];
  executiveSponsorshipTiers?: {
    id: string;
    name: string;
    tagline: string;
    footprint: string;
    investment: string;
    rawPrice: number;
    description: string;
    bestFor: string;
    highlightBadge?: string;
    includedNote?: string;
    features: string[];
  }[];
  paymentOptions: PaymentOption[];
  paymentPolicyNotes: string[];
  upcomingEvents: UpcomingVendorEvent[];
  pastEvents?: UpcomingVendorEvent[];
  confirmedVendors: { name: string; logo?: string }[];
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    formattedPhone: string;
  };
}

export const ALL_VENDOR_EVENTS: UpcomingVendorEvent[] = [
  {
    "id": "ces-2027",
    "name": "CES 2027",
    "date": "Jan 6–9, 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "nrf-retails-big-show",
    "name": "NRF Retail's Big Show",
    "date": "Jan 10–12, 2027",
    "location": "New York, NY"
  },
  {
    "id": "atlanta-market",
    "name": "Atlanta Market",
    "date": "Jan 12–18, 2027",
    "location": "Atlanta, GA"
  },
  {
    "id": "vmx-veterinary-expo",
    "name": "VMX Veterinary Expo",
    "date": "Jan 16–20, 2027",
    "location": "Orlando, FL"
  },
  {
    "id": "world-of-concrete",
    "name": "World of Concrete",
    "date": "Jan 19–21, 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "shot-show",
    "name": "SHOT Show",
    "date": "Jan 19–22, 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "the-namm-show",
    "name": "The NAMM Show",
    "date": "Jan 26–30, 2027",
    "location": "Anaheim, CA"
  },
  {
    "id": "ippe",
    "name": "IPPE",
    "date": "Jan 26–28, 2027",
    "location": "Atlanta, GA"
  },
  {
    "id": "pga-show",
    "name": "PGA Show",
    "date": "Jan 26–29, 2027",
    "location": "Orlando, FL"
  },
  {
    "id": "international-builders-show",
    "name": "International Builders' Show",
    "date": "Feb 2–4, 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "kbis",
    "name": "KBIS",
    "date": "Feb 2–4, 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "mdm-west",
    "name": "MD&M West",
    "date": "Feb 2–4, 2027",
    "location": "Anaheim, CA"
  },
  {
    "id": "magic-las-vegas",
    "name": "MAGIC Las Vegas",
    "date": "Feb 8–10, 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "world-ag-expo",
    "name": "World Ag Expo",
    "date": "Feb 9–11, 2027",
    "location": "Tulare, CA"
  },
  {
    "id": "natural-products-expo-west",
    "name": "Natural Products Expo West",
    "date": "Mar 2–5, 2027",
    "location": "Anaheim, CA"
  },
  {
    "id": "seafood-expo-north-america",
    "name": "Seafood Expo North America",
    "date": "Mar 2027",
    "location": "Boston, MA"
  },
  {
    "id": "promat",
    "name": "ProMat",
    "date": "Mar 15–18, 2027",
    "location": "Chicago, IL"
  },
  {
    "id": "nab-show",
    "name": "NAB Show",
    "date": "Apr 18–21, 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "npe-the-plastics-show",
    "name": "NPE: The Plastics Show",
    "date": "May 3–7, 2027",
    "location": "Orlando, FL"
  },
  {
    "id": "national-restaurant-association-show",
    "name": "National Restaurant Association Show",
    "date": "May 15–18, 2027",
    "location": "Chicago, IL"
  },
  {
    "id": "art-basel-miami-beach",
    "name": "Art Basel Miami Beach",
    "date": "Dec 4–6, 2026",
    "location": "Miami Beach, FL"
  },
  {
    "id": "shopfest-punta-gorda",
    "name": "Shopfest Punta Gorda",
    "date": "Dec 4–6, 2026",
    "location": "Punta Gorda, FL"
  },
  {
    "id": "art-under-the-oaks",
    "name": "Art Under the Oaks",
    "date": "Jan 16, 2027",
    "location": "Tavernier, FL"
  },
  {
    "id": "sun-shores-art-festival",
    "name": "Sun & Shores Art Festival",
    "date": "Feb 13–14, 2027",
    "location": "Daytona Beach Shores, FL"
  },
  {
    "id": "sanibel-island-rotary-arts-crafts-festival",
    "name": "Sanibel Island Rotary Arts & Crafts Festival",
    "date": "Feb 13–14, 2027",
    "location": "Sanibel, FL"
  },
  {
    "id": "american-craft-made-baltimore",
    "name": "American Craft Made Baltimore",
    "date": "Feb 19–21, 2027",
    "location": "Baltimore, MD"
  },
  {
    "id": "art-fiesta",
    "name": "Art Fiesta",
    "date": "Feb 27–28, 2027",
    "location": "New Smyrna Beach, FL"
  },
  {
    "id": "uptown-art-expo",
    "name": "Uptown Art Expo",
    "date": "Mar 13–14, 2027",
    "location": "Altamonte Springs, FL"
  },
  {
    "id": "sxsw",
    "name": "SXSW",
    "date": "Mar 12–18, 2027",
    "location": "Austin, TX"
  },
  {
    "id": "washington-state-apple-blossom-festival",
    "name": "Washington State Apple Blossom Festival",
    "date": "Apr 22–May 2, 2027",
    "location": "Wenatchee, WA"
  },
  {
    "id": "one-of-a-kind-spring-show",
    "name": "One of a Kind Spring Show",
    "date": "Apr 30–May 2, 2027",
    "location": "Chicago, IL"
  },
  {
    "id": "treasure-coast-renaissance-festival",
    "name": "Treasure Coast Renaissance Festival",
    "date": "Jan 9–Feb 14, 2027",
    "location": "Florida"
  },
  {
    "id": "gulf-coast-renaissance-faire",
    "name": "Gulf Coast Renaissance Faire",
    "date": "Feb 27–Mar 7, 2027",
    "location": "Florida"
  },
  {
    "id": "st-petersburg-renaissance-faire",
    "name": "St. Petersburg Renaissance Faire",
    "date": "Apr 3–25, 2027",
    "location": "St. Petersburg, FL"
  },
  {
    "id": "georgia-renaissance-festival",
    "name": "Georgia Renaissance Festival",
    "date": "Apr 10–May 31, 2027",
    "location": "Fairburn, GA"
  },
  {
    "id": "scarborough-renaissance-festival",
    "name": "Scarborough Renaissance Festival",
    "date": "Apr 10–May 31, 2027",
    "location": "Waxahachie, TX"
  },
  {
    "id": "spring-haven-renaissance-festival",
    "name": "Spring Haven Renaissance Festival",
    "date": "May 1–2, 2027",
    "location": "North Carolina"
  },
  {
    "id": "whidbey-ren-faire",
    "name": "Whidbey Ren Faire",
    "date": "May 22–30, 2027",
    "location": "Washington"
  },
  {
    "id": "new-jersey-renaissance-faire",
    "name": "New Jersey Renaissance Faire",
    "date": "2027 dates to be confirmed",
    "location": "New Jersey"
  },
  {
    "id": "hr-black-food-fest",
    "name": "HR Black Food Fest",
    "date": "Jun 26–27, 2027",
    "location": "Virginia Beach, VA"
  },
  {
    "id": "powergen-international",
    "name": "POWERGEN International",
    "date": "Jan 2027",
    "location": "New Orleans, LA"
  },
  {
    "id": "specialty-food-las-vegas",
    "name": "Specialty Food Las Vegas",
    "date": "Jan 17–19, 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "las-vegas-market-winter",
    "name": "Las Vegas Market Winter",
    "date": "Jan 24–28, 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "the-international-surface-event",
    "name": "The International Surface Event",
    "date": "Jan 26–28, 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "affiliate-summit-west",
    "name": "Affiliate Summit West",
    "date": "Feb 1–3, 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "geo-week",
    "name": "Geo Week",
    "date": "Feb 8–10, 2027",
    "location": "Denver, CO"
  },
  {
    "id": "nrb-convention",
    "name": "NRB Convention",
    "date": "Feb 16–19, 2027",
    "location": "Nashville, TN"
  },
  {
    "id": "champs-trade-show",
    "name": "CHAMPS Trade Show",
    "date": "Feb 17–20, 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "vive-digital-health",
    "name": "ViVE Digital Health",
    "date": "Feb 21–24, 2027",
    "location": "Nashville, TN"
  },
  {
    "id": "minexchange",
    "name": "MINEXCHANGE",
    "date": "Feb 21–24, 2027",
    "location": "Denver, CO"
  },
  {
    "id": "nga-show",
    "name": "NGA Show",
    "date": "Feb 28–Mar 2, 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "asd-market-week",
    "name": "ASD Market Week",
    "date": "Mar 7–10, 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "murtec",
    "name": "MURTEC",
    "date": "Mar 8–10, 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "gdc-festival-of-gaming",
    "name": "GDC Festival of Gaming",
    "date": "Mar 15–19, 2027",
    "location": "San Francisco, CA"
  },
  {
    "id": "satellite-conference",
    "name": "SATELLITE Conference",
    "date": "Mar 2027",
    "location": "Washington, DC"
  },
  {
    "id": "vision-expo",
    "name": "Vision Expo",
    "date": "2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "seafood-expo-north-america-spring-edition",
    "name": "Seafood Expo North America (Spring Edition)",
    "date": "Mar 2027",
    "location": "Boston, MA"
  },
  {
    "id": "work-truck-week",
    "name": "Work Truck Week",
    "date": "Mar 2027",
    "location": "Indianapolis, IN"
  },
  {
    "id": "pack-expo-southeast",
    "name": "PACK EXPO Southeast",
    "date": "Apr 2027",
    "location": "Atlanta, GA"
  },
  {
    "id": "rapid-tct",
    "name": "RAPID + TCT",
    "date": "Apr 2027",
    "location": "Detroit, MI"
  },
  {
    "id": "interphex",
    "name": "INTERPHEX",
    "date": "Apr 2027",
    "location": "New York, NY"
  },
  {
    "id": "automate",
    "name": "Automate",
    "date": "May 2027",
    "location": "Las Vegas, NV"
  },
  {
    "id": "sweets-snacks-expo",
    "name": "Sweets & Snacks Expo",
    "date": "May 2027",
    "location": "Indianapolis, IN"
  },
  {
    "id": "premiere-orlando",
    "name": "Premiere Orlando",
    "date": "May 29–31, 2027",
    "location": "Orlando, FL"
  },
  {
    "id": "neocon",
    "name": "NeoCon",
    "date": "Jun 14–16, 2027",
    "location": "Chicago, IL"
  },
  {
    "id": "vidcon-anaheim",
    "name": "VidCon Anaheim",
    "date": "Jun 24–27, 2027",
    "location": "Anaheim, CA"
  },
  {
    "id": "darknesscon-reno",
    "name": "DarknessCon Reno",
    "date": "Apr 30–May 1, 2027",
    "location": "Reno, NV"
  },
  {
    "id": "darknesscon-boise",
    "name": "DarknessCon Boise",
    "date": "Jun 18–19, 2027",
    "location": "Caldwell, ID"
  },
  {
    "id": "darknesscon-albuquerque",
    "name": "DarknessCon Albuquerque",
    "date": "Aug 6–7, 2027",
    "location": "Albuquerque, NM"
  },
  {
    "id": "darknesscon-denver",
    "name": "DarknessCon Denver",
    "date": "Oct 30, 2027",
    "location": "Thornton, CO"
  },
  {
    "id": "sema-show-2026",
    "name": "SEMA Show 2026",
    "date": "Nov 3–6, 2026",
    "location": "Las Vegas, NV"
  },
  {
    "id": "devlearn-conference-expo",
    "name": "DevLearn Conference & Expo",
    "date": "Nov 4–6, 2026",
    "location": "Las Vegas, NV"
  },
  {
    "id": "sema-fest",
    "name": "SEMA Fest",
    "date": "Nov 6, 2026",
    "location": "Las Vegas, NV"
  },
  {
    "id": "denver-christmas-show",
    "name": "Denver Christmas Show",
    "date": "Nov 6–8, 2026",
    "location": "Denver, CO"
  },
  {
    "id": "new-england-christmas-festival",
    "name": "New England Christmas Festival",
    "date": "Nov 6–8, 2026",
    "location": "Uncasville, CT"
  },
  {
    "id": "northern-virginia-christmas-market",
    "name": "Northern Virginia Christmas Market",
    "date": "Nov 6–8, 2026",
    "location": "Sterling, VA"
  },
  {
    "id": "portland-holiday-market",
    "name": "Portland Holiday Market",
    "date": "Nov 6–8, 2026",
    "location": "Portland, OR"
  },
  {
    "id": "christmas-market-at-trinity-by-the-cove",
    "name": "Christmas Market at Trinity-by-the-Cove",
    "date": "Nov 6–7, 2026",
    "location": "Naples, FL"
  },
  {
    "id": "winter-art-fair-off-the-square",
    "name": "Winter Art Fair Off the Square",
    "date": "Nov 7–8, 2026",
    "location": "Madison, WI"
  },
  {
    "id": "holiday-show-in-the-capital-city",
    "name": "Holiday Show in the Capital City",
    "date": "Nov 7–8, 2026",
    "location": "Concord, NH"
  },
  {
    "id": "madison-bouckville-antiques-show",
    "name": "Madison-Bouckville Antiques Show",
    "date": "Nov 6–8, 2026",
    "location": "Bouckville, NY"
  },
  {
    "id": "q108-vintage-fair-holiday-marketplace",
    "name": "Q108 Vintage Fair Holiday Marketplace",
    "date": "Nov 7, 2026",
    "location": "Clarksville, TN"
  },
  {
    "id": "rocky-river-fall-avant-garde-art-craft-show",
    "name": "Rocky River Fall Avant-Garde Art & Craft Show",
    "date": "Nov 7, 2026",
    "location": "Rocky River, OH"
  },
  {
    "id": "jam-room-music-festival",
    "name": "Jam Room Music Festival",
    "date": "Nov 14, 2026",
    "location": "Columbia, SC"
  },
  {
    "id": "afp-annual-conference",
    "name": "AFP Annual Conference",
    "date": "Nov 8–11, 2026",
    "location": "Las Vegas, NV"
  },
  {
    "id": "holiday-kickoff-food-vendor-festival-2026",
    "name": "Holiday Kickoff Food & Vendor Festival 2026",
    "date": "Nov 27–29, 2026",
    "location": "1701 North Highland Avenue - Tampa, FL 33602"
  }
];

export const VENDOR_CONFIG: VendorConfig = {
  spotsRemaining: 12,
  totalSpots: 20,
  tiers: [
    // 🛍️ MARKETPLACE BOOTHS
    {
      id: 'starter-booth',
      name: 'Starter Booth',
      size: "10' × 10'",
      price: '$100/day',
      rawPrice: 100,
      pillar: 'marketplace',
      pillarLabel: 'Marketplace Booths',
      icon: '🛍️',
      description: 'For small businesses, makers and independent sellers.',
      bestFor: 'Crafts, jewelry, fashion, beauty, specialty products and small retail brands.',
      features: [
        "10' × 10' Reserved Marketplace Canopy Space",
        'Standard 15A Electricity Hookup Access',
        'Inclusion in the Festival digital directory & site map',
        'Professional waste disposal & compound security',
        'Flexible payment options available'
      ]
    },
    {
      id: 'featured-booth',
      name: 'Featured Booth',
      size: "10' × 15'",
      price: '$110/day',
      rawPrice: 110,
      pillar: 'marketplace',
      pillarLabel: 'Marketplace Booths',
      icon: '🛍️',
      highlightBadge: 'Popular Choice',
      description: 'More space and a stronger physical presence along prime walkways.',
      bestFor: 'Established businesses, larger displays and interactive setups.',
      features: [
        "10' × 15' Expanded Footprint on main shopping lanes",
        'Dedicated 20A low-fluctuation electric current',
        '1x Featured Social Media Spotlight across festival channels',
        'Enhanced directory listing with brand link & logo',
        'Flexible payment options available'
      ]
    },
    {
      id: 'premium-corner',
      name: 'Premium Corner',
      size: "10' × 20'",
      price: '$125/day',
      rawPrice: 125,
      pillar: 'marketplace',
      pillarLabel: 'Marketplace Booths',
      icon: '🛍️',
      description: 'A larger footprint for businesses wanting maximum display flexibility.',
      bestFor: 'Large retail displays, experiential businesses and high-volume sellers.',
      features: [
        "10' × 20' High-Visibility Corner Footprint with dual-side frontage",
        'High-capacity 30A electrical service',
        'Priority load-in / load-out corridor access',
        '2x Social Media promotional callouts',
        'Flexible payment options available'
      ]
    },

    // 🚚 FOOD & CULINARY
    {
      id: 'food-vendor-space',
      name: 'Food Vendor Space',
      size: "10' × 10'",
      price: '$100/day',
      rawPrice: 100,
      pillar: 'food',
      pillarLabel: 'Food & Culinary',
      icon: '🚚',
      description: 'For prepared-food vendors operating from a stall or tent.',
      bestFor: 'Prepared culinary specialties, artisanal baked goods, beverages, and cold/hot grab-and-go.',
      features: [
        "10' × 10' Dedicated Food Prep & Service Space",
        'Standard food service electric hookup',
        'Health department compliance & inspection coordination',
        'Direct access to greywater & ice supply ports',
        'Flexible payment options available'
      ]
    },
    {
      id: 'premium-food-space',
      name: 'Premium Food Space',
      size: "10' × 15'",
      price: '$125/day',
      rawPrice: 125,
      pillar: 'food',
      pillarLabel: 'Food & Culinary',
      icon: '🚚',
      highlightBadge: 'Chef Favorite',
      description: 'For culinary businesses requiring additional preparation and service space.',
      bestFor: 'Active cooking setups, multi-station culinary brands, and high-turnover food menus.',
      features: [
        "10' × 15' Expanded Cooking & Plating Space",
        'High-demand food court positioning',
        'Dedicated 20A low-fluctuation electric current',
        'Dedicated grease disposal & greywater disposal bins',
        'Flexible payment options available'
      ]
    },
    {
      id: 'food-truck-space',
      name: 'Food Truck Space',
      size: "10' × 20' / Vehicle",
      price: '$150/day',
      rawPrice: 150,
      pillar: 'food',
      pillarLabel: 'Food & Culinary',
      icon: '🚚',
      highlightBadge: 'High Volume',
      description: 'For mobile kitchens, food trailers, and self-contained food trucks.',
      bestFor: 'Mobile kitchens, gourmet food trucks, dessert trailers, and beverage rigs.',
      features: [
        'Prime Food Truck Lane positioning with seamless customer queue staging',
        'High-capacity 30A/50A electrical power hookup',
        'Priority vehicle staging & overnight secure compound',
        'Featured inclusion in culinary festival guides',
        'Flexible payment options available'
      ]
    },
    {
      id: 'anchor-culinary-partner',
      name: 'Anchor Culinary Partner',
      size: 'Custom Flagship Footprint',
      price: 'Custom',
      rawPrice: 0,
      pillar: 'food',
      pillarLabel: 'Food & Culinary',
      icon: '🚚',
      highlightBadge: 'VIP Partner',
      description: 'For a prominent culinary brand seeking a larger presence and enhanced visibility.',
      bestFor: 'Signature restaurant pop-ups, regional food empires, and headline food activations.',
      features: [
        'Custom placement at primary festival epicenter',
        'Custom electrical & utility provisioning',
        'Dedicated email blast spotlight & festival press release feature',
        '6x VIP Event Credentials & dedicated concierge support',
        'Custom promotional opportunities & stage mention'
      ]
    },

    // 🏢 BUSINESS EXHIBITOR PACKAGES
    {
      id: 'business-presence',
      name: 'Business Presence',
      size: "10' × 10'",
      price: '$500',
      rawPrice: 500,
      pillar: 'exhibitor',
      pillarLabel: 'Business Exhibitors',
      icon: '🏢',
      description: 'A dedicated space to introduce your company, generate leads and connect with customers.',
      bestFor: 'Local service businesses, agencies, clinics, home improvement, and financial services.',
      features: [
        "10' × 10' Dedicated Commercial Showcase Space",
        'Direct foot traffic access to 10,000+ attendees',
        'Lead capture & marketing collateral distribution permission',
        'Standard power supply for digital tablets/displays',
        'Flexible payment options available'
      ]
    },
    {
      id: 'featured-exhibitor',
      name: 'Featured Exhibitor',
      size: "10' × 15'",
      price: '$850',
      rawPrice: 850,
      pillar: 'exhibitor',
      pillarLabel: 'Business Exhibitors',
      icon: '🏢',
      highlightBadge: 'Lead Gen Pro',
      description: 'Includes a larger footprint and enhanced event visibility along high-traffic corridors.',
      bestFor: 'Regional corporations, tech apps, fitness brands, and experiential lead generation.',
      features: [
        "10' × 15' High-Traffic Promenade Placement",
        'Dedicated social media introduction across festival channels',
        'Banner signage placement opportunities',
        'High-capacity power for illuminated backdrops & active demos',
        'Flexible payment options available'
      ]
    },
    {
      id: 'corporate-exhibitor',
      name: 'Corporate Exhibitor',
      size: "20' × 20' Custom Pavilion",
      price: 'Custom',
      rawPrice: 0,
      pillar: 'exhibitor',
      pillarLabel: 'Business Exhibitors',
      icon: '🏢',
      highlightBadge: 'Corporate',
      description: 'For companies requiring a substantial exhibition or customer-engagement presence.',
      bestFor: 'Automotive displays, major financial institutions, telecom, and national retailers.',
      features: [
        'Substantial 20x20+ footprint or custom structural configuration',
        'Maximum brand visibility with premium directional signage integration',
        'Full digital directory feature & co-branded attendee communications',
        'VIP access credentials & designated exhibitor parking',
        'Custom corporate terms & invoicing available'
      ]
    },

    // 🚀 BRAND ACTIVATIONS
    {
      id: 'activation-starter',
      name: 'Activation Starter',
      size: "10' × 10' Activation Zone",
      price: 'Custom',
      rawPrice: 0,
      pillar: 'activation',
      pillarLabel: 'Brand Activations',
      icon: '🚀',
      description: 'A branded activation space designed around active customer engagement and sampling.',
      bestFor: 'CPG sample campaigns, interactive gaming, photobooth brand activations, and app downloads.',
      features: [
        'Dedicated interactive engagement zone',
        'Product sampling & direct consumer touchpoint rights',
        'Electrical supply for interactive media displays',
        'Inclusion in festival engagement passport/map',
        'Custom proposals & flexible payment milestones'
      ]
    },
    {
      id: 'featured-brand-activation',
      name: 'Featured Brand Activation',
      size: "10' × 20' Immersive Space",
      price: 'Custom',
      rawPrice: 0,
      pillar: 'activation',
      pillarLabel: 'Brand Activations',
      icon: '🚀',
      highlightBadge: 'High Engagement',
      description: 'Includes a larger branded experience and comprehensive promotional integration.',
      bestFor: 'Beverage lounges, immersive VR/AR experiences, live customization labs, and influencer hubs.',
      features: [
        'Large-format experiential activation footprint',
        'Integrated pre-event digital campaign & social tag features',
        'Stage announcements directing attendee traffic to your hub',
        'Full utility support & priority operational logistics',
        'Custom proposals & payment milestone schedules'
      ]
    },
    {
      id: 'signature-brand-experience',
      name: 'Signature Brand Experience',
      size: 'Custom Experiential Complex',
      price: 'Custom',
      rawPrice: 0,
      pillar: 'activation',
      pillarLabel: 'Brand Activations',
      icon: '🚀',
      highlightBadge: 'Signature',
      description: 'A bespoke event experience built around the sponsoring brand.',
      bestFor: 'Major consumer brands, national beverage labels, automotive ride-and-drives, and VIP lounges.',
      features: [
        'Turnkey custom experiential lounge / activation buildout',
        'Official designation as Festival Experience Partner',
        'Multi-channel promotional blitz across email, social & PR',
        'Dedicated on-site production manager & VIP hospitality package',
        'Custom proposals & corporate partnership agreements'
      ]
    },

    // 🤝 SPONSORSHIPS (STANDARD & EXECUTIVE G-CLASS)
    {
      id: 'community-partner',
      name: 'Community Partner',
      size: "10' × 10' Space",
      price: '$250',
      rawPrice: 250,
      pillar: 'sponsorship',
      pillarLabel: 'Sponsor',
      sponsorClass: 'sponsor',
      icon: '🤝',
      tagline: 'Get your name in front of the crowd.',
      description: 'Get your name in front of the crowd with direct attendee engagement and brand exposure.',
      bestFor: 'Local businesses, community organizations, and emerging regional partners.',
      features: [
        '10×10 vendor space to meet attendees face-to-face',
        'Name listed among official event sponsors',
        'Logo/name featured on select promotional materials',
        'Social media shoutout to our festival audience',
        'Distribute your own approved flyers, cards, or samples'
      ]
    },
    {
      id: 'supporting-sponsor',
      name: 'Supporting Sponsor',
      size: "10' × 10' Space + Signage",
      price: '$500',
      rawPrice: 500,
      pillar: 'sponsorship',
      pillarLabel: 'Sponsor',
      sponsorClass: 'sponsor',
      icon: '🤝',
      highlightBadge: 'High Reach',
      tagline: 'Everything above, plus a bigger spotlight.',
      description: 'Everything in Community Partner, plus a bigger spotlight and live event recognition.',
      bestFor: 'Growing regional brands and local businesses seeking elevated visibility.',
      features: [
        'Prominent logo placement across event materials',
        'A dedicated social media feature (not just a mention)',
        'Live shoutout from the host/MC on event day',
        '10×10 vendor space plus room to display signage',
        'Freedom to hand out your own promotional materials'
      ]
    },
    {
      id: 'gold-sponsor',
      name: 'Gold Sponsor',
      size: 'Premium Activation Space',
      price: '$1,000',
      rawPrice: 1000,
      pillar: 'sponsorship',
      pillarLabel: 'Sponsor',
      sponsorClass: 'sponsor',
      icon: '🤝',
      highlightBadge: 'Headline Supporter',
      tagline: 'Stand out as a headline supporter.',
      description: 'Stand out as a headline supporter with repeated stage announcements and premium activation space.',
      bestFor: 'Headline supporters, established companies, and leading regional institutions.',
      features: [
        'Premium sponsor billing with a larger logo footprint',
        'Multiple social media mentions in the run-up to the event',
        'Repeated shoutouts throughout event day',
        'Premium activation space for a bigger presence',
        'Bring branded giveaways attendees actually take home',
        '"Gold Sponsor" recognition woven throughout the event'
      ]
    },
    {
      id: 'presenting-sponsor',
      name: 'Presenting Sponsor',
      size: 'Prime Flagship Activation Space',
      price: '$2,500+',
      rawPrice: 2500,
      pillar: 'sponsorship',
      pillarLabel: 'Sponsor',
      sponsorClass: 'sponsor',
      icon: '👑',
      highlightBadge: 'Top Tier Partnership',
      tagline: 'Be the name people remember.',
      description: 'Be the name people remember with top-tier co-branding, all-day MC recognition, and premier placement.',
      bestFor: 'Title partners, premier corporations, and major brands wanting total event dominance.',
      features: [
        'Top-tier "Presented by [Your Brand]" recognition across all materials',
        'The most prominent logo placement of any sponsorship tier',
        'Premium activation space in the best spot at the festival',
        'Multiple social promotions leading up to and during the event',
        'Ongoing stage/MC recognition all day long',
        'Bring branded giveaways or run a custom activation',
        'Featured as a headline partner in all event coverage',
        "Package tailored to your specific goals — ask us what's possible"
      ]
    },
    {
      id: 'neighborhood-sponsor',
      name: 'Neighborhood Sponsor (Executive)',
      size: "10' × 10' Space",
      price: '$750',
      rawPrice: 750,
      pillar: 'sponsorship',
      pillarLabel: 'Executive Sponsor',
      sponsorClass: 'executive',
      icon: '👑',
      tagline: 'Establish your presence in the community.',
      description: 'Get a foothold at the event with direct attendee engagement, official sponsor recognition, and room to grow.',
      bestFor: 'Local businesses, growing regional brands, and organizations building their first sponsorship presence at a larger-scale event.',
      features: [
        '10×10 vendor/booth space',
        'Name listed in official sponsor directory (print + digital)',
        'Logo on select event promotional materials',
        '1 dedicated social media mention',
        'Distribute your own approved flyers/samples at your booth'
      ]
    },
    {
      id: 'spotlight-sponsor',
      name: 'Spotlight Sponsor (Executive)',
      size: "10' × 20' Space + Signage",
      price: '$1,800',
      rawPrice: 1800,
      pillar: 'sponsorship',
      pillarLabel: 'Executive Sponsor',
      sponsorClass: 'executive',
      icon: '👑',
      highlightBadge: 'High Reach',
      tagline: 'Everything above, plus a bigger spotlight.',
      description: 'Step up into expanded space and real audience reach — including a segment of our subscriber list — with live recognition on event day.',
      bestFor: 'Growing regional brands and businesses ready to move beyond a basic booth into active audience engagement.',
      features: [
        'Upgraded 10×20 space',
        'Partial email list feature (segment of the 12,000 subscribers)',
        '2 social media posts in the lead-up to the event',
        'Live shoutout from the host/MC on event day',
        'Signage display rights at your booth'
      ]
    },
    {
      id: 'marquee-sponsor',
      name: 'Marquee Sponsor (Executive)',
      size: "20' × 20' Space",
      price: '$3,500',
      rawPrice: 3500,
      pillar: 'sponsorship',
      pillarLabel: 'Executive Sponsor',
      sponsorClass: 'executive',
      icon: '👑',
      highlightBadge: 'Headline Supporter',
      tagline: 'Stand out as a headline supporter.',
      description: 'Full-list email reach, repeated stage recognition, and a premium activation footprint — built for brands that want to be unmistakably present all day.',
      bestFor: 'Established companies and regional institutions seeking headline-level visibility without full event exclusivity.',
      features: [
        'Premium 20×20 activation space',
        'Full email blast to the entire subscriber list',
        'Multiple stage/MC mentions throughout the day',
        'Dedicated branded giveaway or sampling zone',
        '"Marquee Sponsor" recognition across event materials'
      ]
    },
    {
      id: 'title-sponsor',
      name: 'Title Sponsor (Executive)',
      size: 'Prime Flagship Space + Category Exclusivity',
      price: '$7,500+',
      rawPrice: 7500,
      pillar: 'sponsorship',
      pillarLabel: 'Executive Sponsor',
      sponsorClass: 'executive',
      icon: '👑',
      highlightBadge: 'Top Tier Partnership',
      tagline: 'Be the name people remember.',
      description: 'The highest level of partnership available — full co-branding, category exclusivity, and a coordinated multi-channel campaign built around your goals.',
      bestFor: 'Regional and national brands seeking total category dominance and maximum event-wide visibility.',
      features: [
        'Category exclusivity — you\'re the only sponsor in your industry at the event',
        '"Presented by [Your Brand]" naming rights on all materials',
        'Full digital campaign push (email + social + press, if applicable)',
        'Custom activation or negotiated add-ons — open above $7,500 for larger brands'
      ]
    }
  ],

  // 🎯 CUSTOM SPONSORSHIP OPPORTUNITIES
  customSponsorshipOpportunities: [
    'Community outreach initiatives',
    'Promotional activations or demos',
    'Educational/informational booths',
    'Branded activities for families',
    'Product or service demonstrations',
    'Media and promotional partnerships',
    'In-kind sponsorships (equipment, prizes, services)'
  ],

  // 👑 EXECUTIVE SPONSORSHIPS
  executiveSponsorshipTiers: [
    {
      id: 'neighborhood-sponsor',
      name: 'Neighborhood Sponsor',
      tagline: 'Establish your presence in the community.',
      footprint: "10' × 10' Vendor/Booth Space",
      investment: '$750',
      rawPrice: 750,
      description: 'Get a foothold at the event with direct attendee engagement, official sponsor recognition, and room to grow into higher tiers as your goals scale.',
      bestFor: 'Local businesses, growing regional brands, and organizations building their first sponsorship presence at a larger-scale event.',
      features: [
        '10×10 vendor/booth space',
        'Name listed in official sponsor directory (print + digital)',
        'Logo on select event promotional materials',
        '1 dedicated social media mention',
        'Distribute your own approved flyers/samples at your booth'
      ]
    },
    {
      id: 'spotlight-sponsor',
      name: 'Spotlight Sponsor',
      highlightBadge: 'High Reach',
      tagline: 'Everything above, plus a bigger spotlight.',
      footprint: "10' × 20' Upgraded Space + Signage",
      investment: '$1,800',
      rawPrice: 1800,
      description: 'Step up into expanded space and real audience reach — including a segment of our subscriber list — with live recognition on event day.',
      bestFor: 'Growing regional brands and businesses ready to move beyond a basic booth into active audience engagement.',
      includedNote: 'Everything in Neighborhood Sponsor, plus:',
      features: [
        'Upgraded 10×20 space',
        'Partial email list feature (segment of the 12,000 subscribers)',
        '2 social media posts in the lead-up to the event',
        'Live shoutout from the host/MC on event day',
        'Signage display rights at your booth'
      ]
    },
    {
      id: 'marquee-sponsor',
      name: 'Marquee Sponsor',
      highlightBadge: 'Headline Supporter',
      tagline: 'Stand out as a headline supporter.',
      footprint: "20' × 20' Premium Activation Space",
      investment: '$3,500',
      rawPrice: 3500,
      description: 'Full-list email reach, repeated stage recognition, and a premium activation footprint — built for brands that want to be unmistakably present all day.',
      bestFor: 'Established companies and regional institutions seeking headline-level visibility without full event exclusivity.',
      includedNote: 'Everything in Spotlight Sponsor, plus:',
      features: [
        'Premium 20×20 activation space',
        'Full email blast to the entire subscriber list',
        'Multiple stage/MC mentions throughout the day',
        'Dedicated branded giveaway or sampling zone',
        '"Marquee Sponsor" recognition across event materials'
      ]
    },
    {
      id: 'title-sponsor',
      name: 'Title Sponsor',
      highlightBadge: 'Top Tier Partnership',
      tagline: 'Be the name people remember.',
      footprint: 'Prime Flagship Activation Space + Category Exclusivity',
      investment: '$7,500+',
      rawPrice: 7500,
      description: 'The highest level of partnership available — full co-branding, category exclusivity, and a coordinated multi-channel campaign built around your goals.',
      bestFor: 'Regional and national brands seeking total category dominance and maximum event-wide visibility.',
      includedNote: 'Everything in Marquee Sponsor, plus:',
      features: [
        'Category exclusivity — you\'re the only sponsor in your industry at the event',
        '"Presented by [Your Brand]" naming rights on all materials',
        'Full digital campaign push (email + social + press, if applicable)',
        'Custom activation or negotiated add-ons — open above $7,500 for larger brands'
      ]
    }
  ],

  // 💡 FLEXIBLE PAYMENT OPTIONS
  paymentOptions: [
    {
      id: 'pay-in-full',
      title: 'Pay In Full',
      tagline: 'Instant Space Confirmation',
      description: 'Secure your booth or partnership footprint immediately with zero recurring milestones.',
      breakdown: [
        '100% space guarantee upon approval',
        'Immediate assignment to festival floorplan',
        'Priority consideration for preferred corner & prime lane requests'
      ],
      recommended: true
    },
    {
      id: 'two-payment',
      title: '2-Payment Option',
      tagline: '50% / 50% Split Schedule',
      description: 'Spread your capital outlay comfortably between booking and load-in.',
      breakdown: [
        '50% deposit upon application acceptance to lock your space',
        '50% remaining balance due 14 days prior to event weekend',
        'Preserves working capital for product inventory & setup preparation'
      ]
    },
    {
      id: 'three-payment',
      title: '3-Payment Option',
      tagline: 'Equal Thirds Milestone Schedule',
      description: 'Designed for larger footprints, food trucks, and activation setups.',
      breakdown: [
        '1/3 initial deposit upon application approval to reserve space',
        '1/3 midpoint installment at the agreed operational milestone',
        '1/3 final balance due before load-in credentials are dispatched'
      ]
    },
    {
      id: 'corporate-terms',
      title: 'Custom Corporate Terms',
      tagline: 'Invoicing & Net Terms for Partners',
      description: 'Available for qualifying corporate exhibitors, brand activations, and sponsors.',
      breakdown: [
        'Custom vendor onboarding & ACH / wire invoicing available',
        'Tailored milestone delivery tied to custom contract deliverables',
        'Dedicated corporate relationship manager'
      ]
    }
  ],

  paymentPolicyNotes: [
    'Space is officially reserved and locked on the festival layout upon payment according to your approved plan.',
    'Deadlines and cancellation terms are strictly enforced to preserve category balance and fair scheduling.',
    'We support Zelle, secure digital invoice card processing, ACH transfer, and corporate check/wire payments.',
    'Upon application acceptance, you will receive an official approval notification outlining your selected payment terms.'
  ],

  get upcomingEvents(): UpcomingVendorEvent[] {
    return ALL_VENDOR_EVENTS
      .filter(e => !isEventDatePast(e.date))
      .sort((a, b) => getEventStartDate(a.date).getTime() - getEventStartDate(b.date).getTime());
  },

  get pastEvents(): UpcomingVendorEvent[] {
    return ALL_VENDOR_EVENTS
      .filter(e => isEventDatePast(e.date))
      .sort((a, b) => getEventStartDate(b.date).getTime() - getEventStartDate(a.date).getTime());
  },
  /* 
    Confirmed Vendors List
    Populate with real, confirmed vendor names (and optionally logo paths) before going live.
  */
  confirmedVendors: [],
  contact: {
    email: 'info@valerianevents.com',
    phone: '',
    whatsapp: '',
    formattedPhone: ''
  }
};

