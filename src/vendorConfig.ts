export type VendorPillar = 'marketplace' | 'food' | 'exhibitor' | 'activation' | 'sponsorship';

export interface VendorTier {
  id: string;
  name: string;
  size: string;
  price: string;
  rawPrice: number;
  pillar: VendorPillar;
  pillarLabel: string;
  icon: string;
  description: string;
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
  paymentOptions: PaymentOption[];
  paymentPolicyNotes: string[];
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
    // 🛍️ MARKETPLACE BOOTHS
    {
      id: 'artisan-table',
      name: 'Artisan Table / Micro Booth',
      size: "6' Table Space",
      price: '$100 / event',
      rawPrice: 100,
      pillar: 'marketplace',
      pillarLabel: 'Marketplace Booths',
      icon: '🛍️',
      description: 'Accessible space designed for emerging artisans, solo makers, and independent sellers.',
      bestFor: 'Handmade crafts, prints, jewelry, specialty goods, art, and first-time festival sellers.',
      features: [
        "6' Dedicated Table / Micro Space Footprint",
        'Inclusion in the Festival digital directory & site map',
        'Standard waste disposal & overnight site security',
        'Low-barrier launchpad for new and local crafters',
        'Flexible payment options available'
      ]
    },
    {
      id: 'starter-booth',
      name: 'Starter Booth',
      size: "10' × 10'",
      price: '$250 / event',
      rawPrice: 250,
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
      price: '$450 / event',
      rawPrice: 450,
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
      price: '$650 / event',
      rawPrice: 650,
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
      price: '$300 / event',
      rawPrice: 300,
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
      price: '$500 / event',
      rawPrice: 500,
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
      price: '$750 / event',
      rawPrice: 750,
      pillar: 'food',
      pillarLabel: 'Food & Culinary',
      icon: '🚚',
      highlightBadge: 'High Volume',
      description: 'For mobile kitchens, food trailers, and self-contained food trucks.',
      bestFor: 'Mobile kitchens, gourmet food trucks, dessert trailers, and beverage rigs.',
      features: [
        "Prime Food Truck Lane positioning with seamless customer queue staging",
        'High-capacity 30A/50A electrical power hookup',
        'Priority vehicle staging & overnight secure compound',
        'Featured inclusion in culinary festival guides',
        'Flexible payment options available'
      ]
    },
    {
      id: 'anchor-culinary-partner',
      name: 'Anchor Culinary Partner',
      size: "Custom Flagship Footprint",
      price: '$1,250+ / event',
      rawPrice: 1250,
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
      price: '$500 / event',
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
      price: '$850 / event',
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
      price: '$1,500+ / event',
      rawPrice: 1500,
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
      price: '$1,000+',
      rawPrice: 1000,
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
      price: '$2,500+',
      rawPrice: 2500,
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
      size: "Custom Experiential Complex",
      price: '$5,000+',
      rawPrice: 5000,
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

    // 🤝 SPONSORSHIPS
    {
      id: 'community-sponsor',
      name: 'Community Sponsor',
      size: "10' × 10' Space + Logo Rights",
      price: '$2,500',
      rawPrice: 2500,
      pillar: 'sponsorship',
      pillarLabel: 'Sponsorship Packages',
      icon: '🤝',
      description: 'For businesses wanting event-level recognition and community goodwill.',
      bestFor: 'Local champions, civic partners, community banks, and established regional leaders.',
      features: [
        'Official Community Sponsor billing across printed & digital guides',
        'Complimentary 10x10 booth space for brand engagement',
        'Logo placement on festival welcome portals & entrance signage',
        '4x VIP Festival Badges & Hospitality access',
        'Custom corporate terms available'
      ]
    },
    {
      id: 'supporting-sponsor',
      name: 'Supporting Sponsor',
      size: "10' × 20' Space + Broad Reach",
      price: '$5,000',
      rawPrice: 5000,
      pillar: 'sponsorship',
      pillarLabel: 'Sponsorship Packages',
      icon: '🤝',
      highlightBadge: 'High Reach',
      description: 'Greater visibility across event materials and promotional channels.',
      bestFor: 'Growing regional brands and statewide institutions seeking dominant market share.',
      features: [
        'Prominent logo on main stage banners & perimeter fencing',
        'Dedicated 10x20 prime activation space included',
        'Dedicated email newsletter feature to 45,000+ culinary subscribers',
        '2x Live stage mentions during peak festival hours',
        '8x VIP passes with backstage hospitality privileges'
      ]
    },
    {
      id: 'featured-sponsor',
      name: 'Featured Sponsor',
      size: "20' × 20' Premium Area + Media",
      price: '$10,000',
      rawPrice: 10000,
      pillar: 'sponsorship',
      pillarLabel: 'Sponsorship Packages',
      icon: '🤝',
      highlightBadge: 'Premium Sponsor',
      description: 'For brands seeking significant event presence, lead generation, and audience engagement.',
      bestFor: 'Major consumer packaged goods, tech platforms, and regional powerhouses.',
      features: [
        'Co-branded festival collateral (e.g. "Festival Features presented by [Brand]")',
        '20x20 central hub pavilion placement',
        'Comprehensive digital campaign (120,000+ estimated impressions)',
        'Stage branding & keynote brand introduction slot',
        'Category exclusivity within your primary business sector'
      ]
    },
    {
      id: 'presenting-sponsor',
      name: 'Presenting Sponsor',
      size: "Complete Event Co-Branding",
      price: '$20,000+',
      rawPrice: 20000,
      pillar: 'sponsorship',
      pillarLabel: 'Sponsorship Packages',
      icon: '👑',
      highlightBadge: 'Highest Partnership',
      description: 'The highest-level partnership with maximum co-branding across all touchpoints.',
      bestFor: 'National brands, premier beverage/fintech/lifestyle corporations seeking total event dominance.',
      features: [
        '"Presented by [Your Brand]" marquee billing across all digital & physical collateral',
        'Main Stage official naming rights & prominent perimeter signage',
        'Turnkey branded VIP lounge & dedicated experiential activation',
        'Complete digital promotion blitz, press release syndication & media interview integration',
        'Guaranteed absolute category exclusivity & custom partnership proposals'
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

  upcomingEvents: [
    {
      id: 'las-vegas-food-arts',
      name: 'Las Vegas Food, Arts & Street Market Festival',
      date: 'Aug 28, 2026',
      location: 'Las Vegas, NV'
    },
    {
      id: 'houston-festival',
      name: 'Houston Food, Shopping & Entertainment Festival',
      date: 'Aug 21-23, 2026',
      location: 'Houston, TX'
    },
    {
      id: 'taste-shop-usa',
      name: 'Taste & Shop USA: The Ultimate Food & Shopping Festival',
      date: 'Aug 21-23, 2026',
      location: 'Atlanta, GA'
    },
    {
      id: 'late-night-bites',
      name: 'Late Night Bites & Spirits Market',
      date: 'Sep 4, 2026',
      location: 'North Miami, FL'
    },
    {
      id: 'artisanal-heritage',
      name: 'Artisanal Heritage Market',
      date: 'Oct 14-15, 2026',
      location: 'Los Angeles, CA'
    },
    {
      id: 'smoke-oak',
      name: 'Smoke & Oak Spirits Fest',
      date: 'Nov 02, 2026',
      location: 'Miami, FL'
    },
    {
      id: 'ember-spice',
      name: 'Ember & Spice Street Fair',
      date: 'Nov 22, 2026',
      location: 'Austin, TX'
    },
    {
      id: 'harvest-gala',
      name: 'Harvest Gala & Market',
      date: 'Dec 05-06, 2026',
      location: 'New York City, NY'
    },
    {
      id: 'butchers-block',
      name: "The Butcher's Block",
      date: 'Jan 12, 2027',
      location: 'Austin, TX'
    },
    {
      id: 'coastal-crustacean',
      name: 'Coastal Crustacean & Wine',
      date: 'Feb 20-21, 2027',
      location: 'Miami, FL'
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
    Populate with real, confirmed vendor names (and optionally logo paths) before going live.
  */
  confirmedVendors: [],
  contact: {
    email: 'alex@valerianevents.com',
    phone: '',
    whatsapp: '',
    formattedPhone: ''
  }
};

