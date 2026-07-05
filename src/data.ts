import { Event, FAQ, VendorCategory } from './types';

export const EVENTS_DATA: Event[] = [
  {
    id: 'ev-01',
    title: 'Artisanal Heritage Market',
    date: 'Oct 14-15, 2026',
    location: 'Arts District, Los Angeles',
    image: 'https://i.pinimg.com/1200x/c7/b0/f9/c7b0f905e7f9e683a38a5d71dead6cc7.jpg',
    spotsLeft: 12,
    totalSpots: 40,
    tag: 'Los Angeles',
    category: 'Artisanal & Crafts',
    description: 'A curated showcase of premier craft makers, organic purveyors, and boutique local brands. Situated in the heart of LA’s cultural hub, attracting affluent design and culinary enthusiasts.',
    cost: '$450 / Weekend',
    attendance: '15,000+ expected',
    highlight: 'Includes 10x10 premium tent space, professional lighting canopy, and spotlight promotions.'
  },
  {
    id: 'ev-02',
    title: 'Smoke & Oak Spirits Fest',
    date: 'Nov 02, 2026',
    location: 'Coconut Grove, Miami',
    image: 'https://i.pinimg.com/1200x/90/7e/7d/907e7d060e7408ed7dcce2c4eab50699.jpg',
    spotsLeft: 0,
    totalSpots: 35,
    tag: 'Miami',
    category: 'Spirits & BBQ',
    description: 'An exclusive single-day pairing event. Highlighting craft distilleries, premium barrel-aged whiskey, and artisanal smoked meats under the coastal night breeze.',
    cost: '$600 / Day',
    attendance: '8,000+ expected',
    highlight: 'Includes heavy-duty 20A electricity, private waste service, and ice-supply concierge.'
  },
  {
    id: 'ev-03',
    title: 'Ember & Spice Street Fair',
    date: 'Nov 22, 2026',
    location: 'Downtown, Austin',
    image: 'https://i.pinimg.com/1200x/7d/6f/6e/7d6f6e7c879cd8dc965704875d0d0936.jpg',
    spotsLeft: 4,
    totalSpots: 50,
    tag: 'Austin',
    category: 'Gourmet Culinary',
    description: 'Texas’ ultimate high-heat food festival. Celebrating regional pitmasters, hot sauce pioneers, and bold street food entrepreneurs. Known for lively music and fierce competition.',
    cost: '$500 / Weekend',
    attendance: '22,000+ expected',
    highlight: 'Includes water-hookup access, shared cold-storage lockers, and fire safety compliance support.'
  },
  {
    id: 'ev-04',
    title: 'Harvest Gala & Market',
    date: 'Dec 05-06, 2026',
    location: 'Chelsea Walk, New York City',
    image: 'https://i.pinimg.com/736x/94/a1/b3/94a1b31688dcb860b15936595959f854.jpg',
    spotsLeft: 6,
    totalSpots: 30,
    tag: 'New York City',
    category: 'Gourmet & Delicacies',
    description: 'An upscale winter-themed indoor food and luxury maker market. Perfect for premium gifting brands, gourmet chocolates, fine wines, and custom home lifestyle crafts.',
    cost: '$750 / Weekend',
    attendance: '18,000+ expected',
    highlight: 'Heated indoor environment, custom display booths, luxury concierge, and 24/7 security patrol.'
  },
  {
    id: 'ev-05',
    title: "The Butcher's Block",
    date: 'Jan 12, 2027',
    location: 'East Side, Austin',
    image: 'https://i.pinimg.com/1200x/e0/9e/8e/e09e8ecb54fb6a834b6e2b098617bf85.jpg',
    spotsLeft: 8,
    totalSpots: 25,
    tag: 'Austin',
    category: 'BBQ & Grilling',
    description: 'An elite culinary gathering for dry-aged steak houses, charcoal chefs, and knife makers. Heavily attended by restaurateurs and gourmet culinary buyers looking for new partnerships.',
    cost: '$550 / Day',
    attendance: '6,500+ expected',
    highlight: 'Access to high-capacity waste disposal, commercial-grade grease removal, and premium ash-bins.'
  },
  {
    id: 'ev-06',
    title: 'Coastal Crustacean & Wine',
    date: 'Feb 20-21, 2027',
    location: 'South Beach, Miami',
    image: 'https://i.pinimg.com/736x/25/5f/bf/255fbf9663d078e441f41a0e782cac7b.jpg',
    spotsLeft: 3,
    totalSpots: 45,
    tag: 'Miami',
    category: 'Seafood & Wine',
    description: 'A prestige waterfront beachside seafood festival. Pairing the finest catch with sustainable vineyard wines, boutique desserts, and ambient beachside live acoustic performance.',
    cost: '$650 / Weekend',
    attendance: '14,000+ expected',
    highlight: 'Ice-delivery service, shared refrigeration containers, waterfront guest seating, and overnight site security.'
  },
  {
    id: 'ev-07',
    title: 'Taco & Tequila Street Fiesta',
    date: 'Mar 13-14, 2027',
    location: 'Arts District, Los Angeles',
    image: 'https://i.pinimg.com/736x/09/a1/19/09a11959c7b5fd731c50f3f4c2c6adca.jpg',
    spotsLeft: 14,
    totalSpots: 40,
    tag: 'Los Angeles',
    category: 'Tequila & Tacos',
    description: 'An electric street fiesta celebrating the rich heritage of handcrafted tacos and artisanal tequila. Bringing together top-tier craft mezcal makers and innovative culinary vendors under the vibrant California sun.',
    cost: '$500 / Weekend',
    attendance: '16,000+ expected',
    highlight: 'Includes premium tent space, certified tequila sampling permitting support, and ice-supply concierge.',
    ticketLink: 'https://www.eventbrite.com/e/taco-tequila-street-fiesta-tickets-1992705609119'
  },
  {
    id: 'ev-08',
    title: 'Whiskey & BBQ Fest Miami',
    date: 'Apr 10-11, 2027',
    location: 'Coconut Grove, Miami',
    image: 'https://i.pinimg.com/736x/c6/04/5f/c6045ffbda797dc3a6753aacafea3473.jpg',
    spotsLeft: 18,
    totalSpots: 45,
    tag: 'Miami',
    category: 'Spirits & BBQ',
    description: "Florida's premier smokehouse and barrel pairing event. Featuring master smoke pitmasters and legendary craft whiskey distillers. Experience slow-cooked delicacies and smooth spirits by the marina.",
    cost: '$600 / Weekend',
    attendance: '12,000+ expected',
    highlight: 'Includes heavy-duty 20A electricity, dry-aged prep canopy access, and private wood-ash disposal.',
    ticketLink: 'https://www.eventbrite.com/e/whiskey-bbq-fest-miami-tickets-1992874413016'
  },
  {
    id: 'ev-09',
    title: 'American Hot Sauce and Spicy Food Expo',
    date: 'May 08-09, 2027',
    location: 'Downtown, Austin',
    image: 'https://i.pinimg.com/736x/d5/09/8c/d5098c3328cb6a33ba5ce88b5522d308.jpg',
    spotsLeft: 22,
    totalSpots: 50,
    tag: 'Austin',
    category: 'Gourmet Culinary',
    description: "A high-heat gathering of the nation's boldest hot sauce brands, artisan spice makers, and fiery food innovators. Featuring live hot sauce competitions, culinary panels, and tasting tours.",
    cost: '$550 / Weekend',
    attendance: '20,000+ expected',
    highlight: 'Includes custom fire safety compliance, shared cold storage access, and featured showcase in the main mainstage heat contest.',
    ticketLink: 'https://www.eventbrite.com/e/american-hot-sauce-and-spicy-food-expo-tickets-1993070825491'
  }
];

export const VENDOR_CATEGORIES: VendorCategory[] = [
  {
    id: 'cat-01',
    name: 'Hot Sauce Brands',
    description: 'Small-batch fiery formulations, artisanal pepper growers, and premium spice blends changing the spice landscape.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-02',
    name: 'Food Trucks',
    description: 'Dynamic, state-of-the-art mobile kitchens delivering boundary-pushing gourmet food concepts and fusion treats.',
    image: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-03',
    name: 'BBQ Pitmasters',
    description: 'True low-and-slow masters smoking premium briskets, heritage pork, and innovative wood-fired creations.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-04',
    name: 'Artisan Makers',
    description: 'Handcrafted premium knives, luxury pottery, organic cutting boards, and custom culinary kitchenware.',
    image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-05',
    name: 'Merchandise & Goods',
    description: 'Curated culinary apparel, handcrafted leather aprons, foodie lifestyle accessories, and gourmet cookbooks.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
  }
];

export const FAQS_DATA: FAQ[] = [
  {
    id: 'faq-01',
    question: 'Do I need my own liability insurance?',
    answer: 'Yes. All vendors must provide a Certificate of Insurance (COI) naming valerianevents LLC as an additional insured. The general liability policy must have a minimum limit of $1,000,000 per occurrence. If you do not have insurance, we can refer you to our temporary event insurance partner for low-cost weekend coverage (approx. $45-$65).'
  },
  {
    id: 'faq-02',
    question: 'Is power provided at every booth?',
    answer: 'Absolutely. Every booth layout includes access to standard electricity (110V, 15A). For heavy culinary operations requiring dedicated high-power connections (such as 20A dedicated lines or 220V hookups), please specify this on your application forms. Premium power is available for a minor additional utility charge.'
  },
  {
    id: 'faq-03',
    question: 'What is the load-in schedule?',
    answer: 'For weekend events, load-in begins early Friday afternoon (from 1:00 PM to 6:00 PM) and finishes on Saturday morning (from 6:00 AM to 8:30 AM). You will be assigned a precise 30-minute vehicle arrival window to ensure a smooth, congestion-free load-in. All vehicles must exit the festival grounds by 9:00 AM.'
  },
  {
    id: 'faq-04',
    question: 'Can I share a booth with another brand?',
    answer: 'Yes, but both brands must be individually vetted and approved. You cannot sub-let your booth space or allow an unapproved vendor to display products under your canopy. If you wish to co-exhibit, please submit a joint application or contact Valerian directly before finalizing your booking.'
  },
  {
    id: 'faq-05',
    question: 'What happens in case of rain?',
    answer: 'All valerianevents matches are rain-or-shine. Our state-of-the-art clear-span canopies and custom lighting trusses protect the vendor and consumer walking corridors. In the rare event of extreme, hazardous weather (e.g., hurricane warnings or severe lightning storms), we will coordinate with local authorities to reschedule or offer full vendor credits.'
  },
  {
    id: 'faq-06',
    question: 'How are vendors selected?',
    answer: 'We seek premium brands with a strong commitment to quality, presentation, and culinary heritage. Our curation committee evaluates applications based on product uniqueness, visual booth styling, professional standards, food safety compliance, and synergy with other vendors. Space is limited to preserve high sales margins for all participants.'
  }
];

export const FOUNDER_DATA = {
  name: 'Valerian',
  title: 'Founder & Lead Organizer',
  bio: 'Valerian is the founder and driving force behind Valerian Events, an independent event organization company based in the United States specializing in food and spirits festivals.',
  email: 'vendors@valerianevents.com',
  phone: '(727) 633-6611',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=80',
  paymentMethod: 'Zelle (vendors@valerianevents.com)',
  commitment: '24h response time guaranteed for all approved vendor inquiries.'
};
