import { Event, FAQ, VendorCategory } from './types';
// @ts-ignore
import miamiFestivalMarket from './assets/images/miami_festival_market_1783630573468.jpg';
// @ts-ignore
import regeneratedTacosImage from './assets/images/regenerated_image_1784153031598.jpg';
// @ts-ignore
import lasVegasFoodArtsFest from './assets/images/regenerated_image_1786825872575.png';
// @ts-ignore
import miamiEndSummerFest from './assets/images/miami_end_summer_1786971777197.jpg';

export const EVENTS_DATA: Event[] = [
  {
    id: 'ev-36',
    slug: 'miami-end-of-summer-family-fun-food-truck-music-vendor-festival-2026',
    title: 'Miami End of Summer Family Fun Food Truck Music & Vendor Festival 2026',
    date: 'Sep 4-6, 2026',
    location: 'Bayfront Park, 301 Biscayne Blvd, Miami, FL 33132',
    image: miamiEndSummerFest,
    spotsLeft: 22,
    totalSpots: 60,
    tag: 'Miami',
    category: 'Food Truck & Family Festival',
    description: 'Celebrate the ultimate Labor Day weekend summer finale at Bayfront Park in downtown Miami! Miami End of Summer Family Fun Food Truck Music & Vendor Festival 2026 runs Friday through Sunday, September 4–6, 2026 (10:00 AM – 5:00 PM daily). Experience an incredible gathering of premier gourmet food trucks, artisanal craft markets, non-stop live music, cultural performances, and family-friendly entertainment overlooking beautiful Biscayne Bay.',
    cost: 'Free Admission / Booths from $100/day',
    attendance: '20,000+ expected',
    highlight: 'Prime waterfront 3-day festival footprint overlooking Biscayne Bay at Bayfront Park, high-volume holiday weekend foot traffic, dedicated food truck lanes, artisan marketplace, and direct Eventbrite ticket registration.',
    ticketLink: 'https://www.eventbrite.com/e/miami-end-of-summer-family-fun-food-truck-music-vendor-festival-2026-tickets-1997693186096?aff=oddtdtcreator'
  },
  {
    id: 'ev-35',
    slug: 'las-vegas-food-arts-street-market-festival',
    title: 'Las Vegas Food, Arts & Street Market Festival',
    date: 'Aug 28, 2026',
    location: '200 South 3rd Street, Las Vegas, NV 89101',
    image: lasVegasFoodArtsFest,
    spotsLeft: 65,
    totalSpots: 65,
    tag: 'Las Vegas',
    category: 'Food, Arts & Street Market',
    description: 'Las Vegas Food, Arts & Street Market Festival brings together food lovers, food trucks, local vendors, artists, makers, businesses, brands and entertainers for a vibrant weekend of food, shopping, live entertainment and family-friendly experiences. Taking place Friday, August 28, 2026 (9:00 AM – 1:00 PM) at 200 South 3rd Street in downtown Las Vegas. Guests can discover unique flavors, shop local, enjoy live music, explore arts and crafts, and participate in exciting activities.',
    cost: 'Free Admission / Booths from $100/day',
    attendance: '10,000+ expected',
    highlight: 'Comprehensive amenities including electricity, water, tables/tents, weather cover, and free parking. Marketplace booths from $100/day, Food vendor spaces $100/day, Food trucks $150/day, and Business exhibitor spaces from $500.',
    ticketLink: 'https://vendorsmap.com/events/las-vegas-food-arts-street-market-festival#event-28943'
  },
  {
    id: 'ev-34',
    slug: 'houston-food-shopping-entertainment-festival',
    title: 'Houston Food, Shopping & Entertainment Festival',
    date: 'Aug 21-23, 2026',
    location: '1 NRG Pkwy, Houston, TX 77054',
    image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1191025956%2F3010760393004%2F1%2Foriginal.20260814-001340?crop=focalpoint&fit=crop&w=940&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=c4721e0f095c579003158fb1f06c9aae',
    spotsLeft: 15,
    totalSpots: 50,
    tag: 'Houston',
    category: 'Food, Shopping & Entertainment',
    description: 'FREE Houston festival featuring amazing food, shopping, live entertainment, family fun, vendors, giveaways, and unforgettable experiences! Taking place August 21–23, 2026 at 1 NRG Parkway in Houston. Discover a high-energy gathering of gourmet food trucks, artisan makers, boutique shopping stalls, interactive games, and live stage performances.',
    cost: 'Free Admission / Vendor Packages from $450',
    attendance: '25,000+ expected',
    highlight: 'Prime outdoor and covered festival exhibition placement at NRG Park in Houston, dedicated vendor load-in concierge, live stage entertainment, and direct Eventbrite ticket integration.',
    ticketLink: 'https://www.eventbrite.com/e/houston-food-shopping-entertainment-festival-tickets-1997932770700'
  },
  {
    id: 'ev-33',
    slug: 'taste-shop-usa-the-ultimate-food-shopping-festival',
    title: 'Taste & Shop USA: The Ultimate Food & Shopping Festival',
    date: 'Aug 21-23, 2026',
    location: '285 Andrew Young International Blvd NW, Atlanta, GA 30313',
    image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1191022569%2F3010748336193%2F1%2Foriginal.20260813-231102?crop=focalpoint&fit=crop&w=940&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.5&s=fdaae3c17e84a5a3a830a66fd5d54d1a',
    spotsLeft: 18,
    totalSpots: 50,
    tag: 'Atlanta',
    category: 'Food & Shopping Festival',
    description: 'Dive into delicious bites and hot deals at Taste & Shop USA, the ultimate foodie and shopping fest! Taking place August 21–23, 2026 in downtown Atlanta at 285 Andrew Young International Blvd NW. Features curated culinary creators, open-air boutique shopping, specialty beverage tasting stations, and live festival entertainment.',
    cost: 'Free Admission / Vendor Packages from $450',
    attendance: '15,000+ expected',
    highlight: 'Includes 3-day weekend festival footprint (Aug 21–23, 2026) at 285 Andrew Young International Blvd NW in Atlanta, prime foot traffic exposure, curated gourmet food sampling lanes, and direct Eventbrite ticket integration.',
    ticketLink: 'https://www.eventbrite.com/e/taste-shop-usa-the-ultimate-food-shopping-festival-tickets-1997926883090?aff=oddtdtcreator'
  },
  {
    id: 'ev-32',
    slug: 'late-night-bites-spirits-market',
    title: 'Late Night Bites & Spirits Market',
    date: 'Sep 4, 2026',
    location: '12351 NW 7th Ave, North Miami, FL 33168',
    image: 'https://i.pinimg.com/1200x/cd/69/57/cd6957055720ffa79acf3c9a0bb5773b.jpg',
    spotsLeft: 12,
    totalSpots: 30,
    tag: 'Miami',
    category: 'Street Food & Spirits',
    description: "An evening open-air street-market style food & drink festival featuring South Florida's premier night food trucks, small-batch hot sauce and spice makers, craft tequila/mezcal brands, and boutique local artisans. Hosted at 12351 NW 7th Ave in North Miami, this event is designed for an energetic 21+ crowd with overhead string lights, a live DJ, and curated beverage pairings.",
    cost: '$450 / Weekend',
    attendance: '10,000+ expected',
    highlight: 'Includes heavy-duty 20A electricity, private waste service, premium string-lit market space, and active ice supply concierge.'
  },
  {
    id: 'ev-01',
    slug: 'artisanal-heritage-market',
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
    slug: 'smoke-oak-spirits-fest',
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
    slug: 'ember-spice-street-fair',
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
    slug: 'harvest-gala-market',
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
    slug: 'the-butchers-block',
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
    slug: 'coastal-crustacean-wine',
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
    slug: 'taco-tequila-street-fiesta',
    title: 'Taco & Tequila Street Fiesta',
    date: 'Aug 16, 2026',
    location: '7101 S Buffalo Dr, Las Vegas',
    image: regeneratedTacosImage,
    spotsLeft: 14,
    totalSpots: 40,
    tag: 'Las Vegas',
    category: 'Tequila & Tacos',
    description: 'Get ready to fiesta with spicy tacos, bold tequila, and good vibes at the Taco & Tequila Street Fiesta!',
    cost: '$500 / Day',
    attendance: '16,000+ expected',
    highlight: 'Includes premium booth space, certified tequila sampling permitting support, and direct ice-supply concierge.',
    ticketLink: 'https://www.eventbrite.com/e/taco-tequila-street-fiesta-tickets-1992705609119'
  },
  {
    id: 'ev-08',
    slug: 'whiskey-bbq-fest-miami',
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
    slug: 'american-hot-sauce-spicy-food-expo',
    title: 'American Hot Sauce and Spicy Food Expo',
    date: 'Jul 11, 2026',
    location: 'Austin Event Center, Austin',
    image: 'https://i.pinimg.com/736x/d5/09/8c/d5098c3328cb6a33ba5ce88b5522d308.jpg',
    spotsLeft: 22,
    totalSpots: 50,
    tag: 'Austin',
    category: 'Gourmet Culinary',
    description: 'The largest celebration of fire, flavor, and heat in the South — Austin, TX',
    cost: '$550 / Day',
    attendance: '20,000+ expected',
    highlight: 'Includes custom fire safety compliance, shared cold storage access, and featured showcase in the main mainstage heat contest.',
    ticketLink: 'https://www.eventbrite.com/e/american-hot-sauce-and-spicy-food-expo-tickets-1993070825491'
  },
  {
    id: 'ev-10',
    slug: 'usa-street-eats-craft-drinks-festival',
    title: 'USA Street Eats & Craft Drinks Festival',
    date: 'Aug 21-23, 2026',
    location: 'Nevada Brew Works, Las Vegas',
    image: 'https://i.pinimg.com/736x/13/99/57/1399579283e193e65c8f13cf15e478da.jpg',
    spotsLeft: 25,
    totalSpots: 60,
    tag: 'Las Vegas',
    category: 'Street Food & Craft Beer',
    description: 'Dive into awesome street eats and craft drinks at the USA Street Eats & Craft Drinks Festival—foodie fun guaranteed!',
    cost: '$550 / Weekend',
    attendance: '25,000+ expected',
    highlight: 'Includes premium vendor space at Nevada Brew Works, high-amperage electrical hookups, direct ice access, and prominent digital mapping promotion.',
    ticketLink: 'https://www.eventbrite.com/e/usa-street-eats-craft-drinks-festival-tickets-1993339100910?aff=oddtdtcreator'
  },
  {
    id: 'ev-31',
    slug: 'miami-summer-vendor-market-food-truck-festival',
    title: 'Miami Summer Vendor Market & Food Truck Festival',
    date: 'Jul 25-26, 2026',
    location: 'Regatta Grove, Coconut Grove, Miami',
    image: miamiFestivalMarket,
    spotsLeft: 15,
    totalSpots: 40,
    tag: 'Miami',
    category: 'Street Food & Artisanal Crafts',
    description: 'The ultimate summer culinary and artisanal gathering at Regatta Grove. Explore Miami’s premier food trucks serving gourmet street eats, alongside curated local vendor booths displaying custom handcrafted jewelry, coastal crafts, and boutique summer apparel.',
    cost: '$450 / Weekend',
    attendance: '12,000+ expected',
    highlight: 'Includes 10x10 premium tent space or food truck docking spot, high-amperage electrical hookups, overnight site security, and digital map placement.',
    ticketLink: 'https://www.eventbrite.com/e/miami-summer-vendor-market-food-truck-festival-tickets-1991583813799?utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=listing&utm-source=wsa&aff=ebdsshwebmobile'
  },
  {
    id: 'ev-11',
    title: 'L.A. Food Truck Extravaganza',
    date: 'Jun 20-21, 2026',
    location: 'Arts District, Los Angeles',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 45,
    tag: 'Los Angeles',
    category: 'Street Food',
    description: 'An outdoor culinary spectacle bringing together L.A.’s most iconic food trucks, from artisanal taco trucks to fusion dessert mobiles.',
    cost: '$400 / Weekend',
    attendance: '18,000+ expected',
    highlight: 'Premium parking spaces, waste disposal stations, and shared outdoor lounge areas.',
    isPast: true
  },
  {
    id: 'ev-12',
    title: 'Miami Tequila & Taco Fiesta',
    date: 'Jun 06, 2026',
    location: 'Coconut Grove, Miami',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 35,
    tag: 'Miami',
    category: 'Tequila & Tacos',
    description: 'A vibrant sun-soaked celebration of gourmet street tacos, certified blue agave tequilas, and live latin acoustic beats by the waterfront.',
    cost: '$500 / Day',
    attendance: '10,000+ expected',
    highlight: 'Waterfront breeze views, premium bar service equipment, and heavy-duty 20A electricity.',
    isPast: true
  },
  {
    id: 'ev-13',
    title: 'Austin Barbecue Heritage Fest',
    date: 'May 16-17, 2026',
    location: 'East Side, Austin',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 50,
    tag: 'Austin',
    category: 'BBQ & Grilling',
    description: 'Deep in the heart of Texas, this legendary smoking event paired low-and-slow pitmasters with craft amber ales and acoustic country guitar.',
    cost: '$600 / Weekend',
    attendance: '25,000+ expected',
    highlight: 'Access to high-capacity ash pits, dedicated wood-refuel stations, and grease management.',
    isPast: true
  },
  {
    id: 'ev-14',
    title: 'NYC Wine & Cheese Salon',
    date: 'May 02, 2026',
    location: 'Chelsea Walk, New York City',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 30,
    tag: 'New York City',
    category: 'Wine & Cheese',
    description: 'An intimate, upscale indoor tasting salon. Pairing boutique sustainable vineyard bottles with rare cave-aged international cheeses.',
    cost: '$700 / Day',
    attendance: '5,000+ expected',
    highlight: 'Heated indoor ambient hall, custom sommelier table displays, and 24/7 building security.',
    isPast: true
  },
  {
    id: 'ev-15',
    title: 'Vegas Craft Brewing Summit',
    date: 'Apr 18-19, 2026',
    location: '7101 S Buffalo Dr, Las Vegas',
    image: 'https://images.unsplash.com/photo-1485686531765-ba63b07845a7?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 40,
    tag: 'Las Vegas',
    category: 'Street Food & Craft Beer',
    description: 'Nevada’s largest assembly of independent microbreweries, serving dry-hopped IPAs, barrel-aged stouts, and hearty pub snacks.',
    cost: '$550 / Weekend',
    attendance: '16,000+ expected',
    highlight: 'Indoor cooling fans, keg storage refrigeration access, and customized sample glass distribution.',
    isPast: true
  },
  {
    id: 'ev-16',
    title: 'LA Artisanal Chocolate Expo',
    date: 'Apr 04, 2026',
    location: 'Arts District, Los Angeles',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 30,
    tag: 'Los Angeles',
    category: 'Gourmet & Delicacies',
    description: 'A decadent gathering of single-origin craft chocolatiers, hand-rolled truffles, and rich dessert wines in the Arts District.',
    cost: '$450 / Day',
    attendance: '8,500+ expected',
    highlight: 'Air-conditioned premium pavilion, elegant display shelving, and spotlight marketing.',
    isPast: true
  },
  {
    id: 'ev-17',
    title: 'Miami Coastal Craft & Design Market',
    date: 'Mar 21-22, 2026',
    location: 'South Beach, Miami',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 40,
    tag: 'Miami',
    category: 'Artisanal & Crafts',
    description: 'An eclectic beachside marketplace showcasing hand-poured candles, coastal ceramics, minimalist home design, and lightweight linen apparel.',
    cost: '$400 / Weekend',
    attendance: '12,000+ expected',
    highlight: 'Premium white-canopy standard tents, nighttime string light installation, and overnight watch.',
    isPast: true
  },
  {
    id: 'ev-18',
    title: 'Austin Hot Sauce Challenge',
    date: 'Mar 07, 2026',
    location: 'Downtown, Austin',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 50,
    tag: 'Austin',
    category: 'Gourmet Culinary',
    description: 'An intense single-day battle where small-batch hot sauce creators put their fieriest formulas to the ultimate community vote.',
    cost: '$450 / Day',
    attendance: '11,000+ expected',
    highlight: 'Custom safety compliance marshals, ice supply refills, and mainstage presenter slot.',
    isPast: true
  },
  {
    id: 'ev-19',
    title: 'NYC Hot Toddy & Cider Warm-Up',
    date: 'Feb 14-15, 2026',
    location: 'Chelsea Walk, New York City',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 35,
    tag: 'New York City',
    category: 'Spirits & BBQ',
    description: 'A cozy mid-winter celebration showcasing hot spiced rums, artisanal apple ciders, and wood-fired comfort foods.',
    cost: '$650 / Weekend',
    attendance: '9,000+ expected',
    highlight: 'Indoor heated booths, electric heater connections, and custom branded mugs for guests.',
    isPast: true
  },
  {
    id: 'ev-20',
    title: 'Las Vegas Neon Nights Market',
    date: 'Feb 01, 2026',
    location: '7101 S Buffalo Dr, Las Vegas',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 35,
    tag: 'Las Vegas',
    category: 'Artisanal & Crafts',
    description: 'An energetic evening market under glowing lights, presenting custom neon art, high-concept visual items, and experimental street bites.',
    cost: '$500 / Day',
    attendance: '14,000+ expected',
    highlight: 'Enhanced outdoor power grids, decorative overhead retro lighting, and live DJ audio system.',
    isPast: true
  },
  {
    id: 'ev-21',
    title: 'LA Winter Harvest & Craft Bazaar',
    date: 'Jan 17-18, 2026',
    location: 'Arts District, Los Angeles',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 40,
    tag: 'Los Angeles',
    category: 'Artisanal & Crafts',
    description: 'A warm and inviting celebration of winter farm produce, organic body care, and bespoke woodcarvings in southern California.',
    cost: '$450 / Weekend',
    attendance: '13,000+ expected',
    highlight: 'Double-wide booths, premium marketing spotlight, and access to electrical hookups.',
    isPast: true
  },
  {
    id: 'ev-22',
    title: 'Miami Rum & Reggae Fest',
    date: 'Jan 03, 2026',
    location: 'South Beach, Miami',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 30,
    tag: 'Miami',
    category: 'Spirits & BBQ',
    description: 'Kick off the new year with premium Caribbean rums, jerk-infused barbecue skewers, and relaxed beachside reggae grooves.',
    cost: '$550 / Day',
    attendance: '10,500+ expected',
    highlight: 'Waterfront access, dedicated ice and refrigeration containers, and private security.',
    isPast: true
  },
  {
    id: 'ev-23',
    title: 'Austin Smoked Rib & Beer Rally',
    date: 'Dec 13-14, 2025',
    location: 'East Side, Austin',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 45,
    tag: 'Austin',
    category: 'BBQ & Grilling',
    description: 'Texas-style pork rib competition paired with independent microbreweries. A delicious end-of-year culinary block party.',
    cost: '$500 / Weekend',
    attendance: '20,000+ expected',
    highlight: 'Commercial grade grease removal, water supply hookup, and ash bins.',
    isPast: true
  },
  {
    id: 'ev-24',
    title: 'NYC Holiday Gourmet & Gift Gala',
    date: 'Nov 29-30, 2025',
    location: 'Chelsea Walk, New York City',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 50,
    tag: 'New York City',
    category: 'Gourmet & Delicacies',
    description: 'The premier holiday shopping event for gourmet gift baskets, hand-crafted stocking stuffers, artisanal panettones, and vintage wines.',
    cost: '$800 / Weekend',
    attendance: '22,000+ expected',
    highlight: 'Luxury indoor carpeted booths, 24/7 security patrol, and winter concierge packaging station.',
    isPast: true
  },
  {
    id: 'ev-25',
    title: 'Vegas Desert Solstice Gathering',
    date: 'Nov 15, 2025',
    location: 'Nevada Brew Works, Las Vegas',
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 30,
    tag: 'Las Vegas',
    category: 'Gourmet Culinary',
    description: 'Celebrating desert culinary innovations, prickly pear cocktails, mesquite wood grilling, and native artisanal pottery.',
    cost: '$450 / Day',
    attendance: '7,500+ expected',
    highlight: 'Shaded structure, standard 110V power feed, and shared prep refrigeration lock.',
    isPast: true
  },
  {
    id: 'ev-26',
    title: 'LA Autumn Harvest Market',
    date: 'Oct 25-26, 2025',
    location: 'Arts District, Los Angeles',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 40,
    tag: 'Los Angeles',
    category: 'Gourmet & Delicacies',
    description: 'An outdoor pumpkin-spiced culinary market featuring heirloom apples, freshly pressed ciders, and gourmet seasonal baked treats.',
    cost: '$450 / Weekend',
    attendance: '16,000+ expected',
    highlight: 'Premium central marketplace booth, social media influencer coverage, and power feed.',
    isPast: true
  },
  {
    id: 'ev-27',
    title: 'Miami Latin Street Food Carnival',
    date: 'Oct 11, 2025',
    location: 'South Beach, Miami',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 45,
    tag: 'Miami',
    category: 'Street Food & Craft Beer',
    description: 'A high-energy street fair celebrating Latin American cuisine—from Venezuelan arepas to cuban sandwiches—paired with local craft beers.',
    cost: '$550 / Day',
    attendance: '15,000+ expected',
    highlight: 'Ice supply refills, high-amperage electrical hookups, and direct water hookups.',
    isPast: true
  },
  {
    id: 'ev-28',
    title: 'Austin Handcrafted Leather & Goods Expo',
    date: 'Sep 27-28, 2025',
    location: 'Downtown, Austin',
    image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 35,
    tag: 'Austin',
    category: 'Artisanal & Crafts',
    description: 'Bringing together premium bootmakers, hand-tooled leather belts, custom denim jackets, and brass accessories in downtown Austin.',
    cost: '$450 / Weekend',
    attendance: '9,000+ expected',
    highlight: 'Premium spotlight placement, customized shelving rentals, and overnight indoor secure lockup.',
    isPast: true
  },
  {
    id: 'ev-29',
    title: 'NYC Rooftop Pinot & Seafood Soiree',
    date: 'Sep 13, 2025',
    location: 'Chelsea Walk, New York City',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 30,
    tag: 'New York City',
    category: 'Seafood & Wine',
    description: 'A glamorous rooftop sunset tasting, combining cold-water oysters, fresh Maine lobster rolls, and chilled Oregon Pinot Noirs.',
    cost: '$750 / Day',
    attendance: '4,500+ expected',
    highlight: 'Rooftop panoramic view, specialized waste and oyster-shell disposal, and premium service canopy.',
    isPast: true
  },
  {
    id: 'ev-30',
    title: 'Vegas Brew & Brats Bash',
    date: 'Aug 23-24, 2025',
    location: 'Nevada Brew Works, Las Vegas',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 0,
    totalSpots: 35,
    tag: 'Las Vegas',
    category: 'Street Food & Craft Beer',
    description: 'A summer sausage and craft lager celebration at Nevada Brew Works, featuring gourmet hot dogs and ice-cold draft beers.',
    cost: '$500 / Weekend',
    attendance: '11,500+ expected',
    highlight: 'Standard canopy booth, live stage audio shoutouts, and high-amperage cooling systems.',
    isPast: true
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

export const TEAM_MEMBERS = [
  {
    name: 'Alex Silver',
    role: 'CEO & Event Director',
    experience: '12+ years producing premier food festivals across the US',
    formerRole: 'Former Senior Event Producer at Metro Culinary Group',
    bio: 'Alex spearheads vendor curation, city permitting, and strategic direction for Valerian Events. Having produced major culinary showcases across California, Texas, and Florida, Alex ensures every vendor experiences maximum foot-traffic and seamless logistics.',
    avatar: 'https://i.pinimg.com/1200x/ce/ad/94/cead941fca1ea8075e01f564f1eedf98.jpg',
    email: 'alex@valerianevents.com'
  },
  {
    name: 'Elena Rostova',
    role: 'Co-Founder & Operations Lead',
    experience: '10+ years festival logistics, NFPA safety & health dept liaison',
    formerRole: 'Former Municipal Operations Director, Coastal Events Group',
    bio: 'Elena oversees venue footprints, utility feeds (20A/110V power), health department clearances, load-in coordination, and on-site emergency readiness. She ensures 100% on-time setup and zero logistical delays for exhibitors.',
    avatar: 'https://i.pinimg.com/1200x/79/3a/36/793a36ab962a4892b2f89d8b53c5d7b2.jpg',
    email: 'info@valerianevents.com'
  },
  {
    name: 'Marcus Vance',
    role: 'Head of Sponsorship & Partnerships',
    experience: '14+ years brand sponsorship & culinary brand activations',
    formerRole: 'Former Partnership Lead, American Artisan Craft Alliance',
    bio: 'Marcus pairs regional corporations, craft beverage distributors, and national consumer brands with custom festival footprints, stage naming rights, and targeted digital exposure.',
    avatar: 'https://i.pinimg.com/1200x/bf/b6/6d/bfb66d6862c9339937408831661313d5.jpg',
    email: 'sponsors@valerianevents.com'
  }
];

export const TRACK_RECORD_DATA = [
  {
    year: '2023',
    event: 'Southern Artisan BBQ Series',
    city: 'Austin, TX',
    attendance: '5,000+ attendees',
    highlight: '28 regional pitmasters, 100% flat-fee showcase, $0 commission taken.'
  },
  {
    year: '2024',
    event: 'Sunshine Craft & Taco Showcase',
    city: 'Miami, FL',
    attendance: '8,500+ attendees',
    highlight: 'Over 40 food trucks and beverage purveyors overlooking the bay.'
  },
  {
    year: '2025',
    event: 'Metro Hot Honey & Street Flavor Festival',
    city: 'Los Angeles, CA',
    attendance: '12,000+ attendees',
    highlight: 'Sold-out 50-vendor footprint in DTLA Arts District.'
  },
  {
    year: '2026',
    event: 'Debut Multi-City National Festival Season',
    city: '5 Major Hubs (LV, MIA, LA, ATX, HOU)',
    attendance: '65,000+ projected attendees',
    highlight: 'Flagship multi-city expansion with verified municipal permits & full turnkey logistics.'
  }
];

export const CITY_PRICING_MATRIX = [
  {
    city: 'Las Vegas, NV',
    standardBooth: '$350 / weekend',
    cornerBooth: '$500 / weekend',
    foodTruck: '$450 / weekend',
    included: '10x10 space, 1 table, 2 chairs, power outlet, free parking for 2 vehicles, $5M liability insurance'
  },
  {
    city: 'Miami, FL',
    standardBooth: '$450 / weekend',
    cornerBooth: '$600 / weekend',
    foodTruck: '$550 / weekend',
    included: '10x10 space, 1 table, 2 chairs, power outlet, free parking for 2 vehicles, $5M liability insurance'
  },
  {
    city: 'Los Angeles, CA',
    standardBooth: '$450 / weekend',
    cornerBooth: '$600 / weekend',
    foodTruck: '$550 / weekend',
    included: '10x10 space, 1 table, 2 chairs, power outlet, free parking for 2 vehicles, $5M liability insurance'
  },
  {
    city: 'Austin, TX',
    standardBooth: '$400 / weekend',
    cornerBooth: '$550 / weekend',
    foodTruck: '$500 / weekend',
    included: '10x10 space, 1 table, 2 chairs, power outlet, free parking for 2 vehicles, $5M liability insurance'
  },
  {
    city: 'Houston, TX',
    standardBooth: '$400 / weekend',
    cornerBooth: '$550 / weekend',
    foodTruck: '$500 / weekend',
    included: '10x10 space, 1 table, 2 chairs, power outlet, free parking for 2 vehicles, $5M liability insurance'
  }
];

export const FAQS_DATA: FAQ[] = [
  {
    id: 'faq-01',
    question: 'How much does a booth cost?',
    answer: 'Standard 10\'×10\' vendor booths start at $350 to $450 per weekend depending on the city. Premium corner booths and mobile food truck spots range from $450 to $600. Every space includes a 10\'x10\' reserved footprint, 1 table, 2 chairs, 1 standard 110V/15A electrical connection, free parking passes for 2 vehicles, and inclusion under our $5M general liability insurance. We charge $0 commission on your sales—you keep 100% of what you make.'
  },
  {
    id: 'faq-02',
    question: 'Is my application or booth fee refundable?',
    answer: 'Yes, 100%. If your application or booth space is not confirmed within 14 days of submission, you receive an immediate, no-questions-asked 100% refund. Furthermore, if you cancel more than 30 days prior to the event date, you are entitled to a full refund minus a standard $25 processing fee. Our full Refund Policy is accessible on our website.'
  },
  {
    id: 'faq-03',
    question: 'What is included with my booth package?',
    answer: 'Every standard vendor registration includes: (1) Reserved 10\'×10\' physical space, (2) One 6ft folding table with table linen, (3) Two chairs, (4) One standard electrical outlet (110V, 15A), (5) Free vendor parking for up to 2 vehicles, (6) On-site load-in and load-out staff assistance, (7) Co-insured coverage under our $5M commercial general liability policy, and (8) Official listing on the printed festival map and digital guide.'
  },
  {
    id: 'faq-04',
    question: 'Do you have past events I can see?',
    answer: 'Yes! While 2026 marks our expanded debut multi-city national tour, our leadership team has produced regional culinary showcases since 2023, including the Southern Artisan BBQ Series (5,000+ attendees in Austin), Sunshine Craft & Taco Showcase (8,500+ attendees in Miami), and the Metro Hot Honey & Street Flavor Festival (12,000+ attendees in Los Angeles). You can follow our active venue walkthroughs, behind-the-scenes floor plans, and vendor spotlights on Instagram and TikTok.'
  },
  {
    id: 'faq-05',
    question: 'Can I speak to someone before applying?',
    answer: 'Absolutely. We pride ourselves on direct human communication. You can email info@valerianevents.com to connect directly with our event directors or schedule a 15-minute video consultation.'
  },
  {
    id: 'faq-06',
    question: 'What happens if it rains or weather is bad?',
    answer: 'All Valerian Events festival venues have built-in indoor or weather-protected covered backup layouts (such as clear-span canopies and covered pavilion spaces). If severe government-issued weather alerts occur (e.g., hurricane or severe tropical storm warnings), full event credits or 100% refunds are issued in accordance with our rain-or-shine contingency policy.'
  },
  {
    id: 'faq-07',
    question: 'Do you take a commission or percentage of my sales?',
    answer: 'Zero percent. We strictly ban retail revenue splits and sales percentages. You pay a transparent flat booth fee and keep 100% of your earnings from all food, beverage, merchandise, or product transactions.'
  },
  {
    id: 'faq-08',
    question: 'What are the vendor setup and event hours?',
    answer: 'Vendor setup and load-in takes place on the morning of the event from 7:00 AM to 10:00 AM (with early Friday load-in options for multi-day showcases from 1:00 PM to 6:00 PM). Public festival hours run from 11:00 AM to 8:00 PM. Load-out begins promptly at 8:15 PM after attendees have safely departed.'
  },
  {
    id: 'faq-09',
    question: 'What permits or health certificates do I need?',
    answer: 'For packaged goods and artisan crafts: standard business tax certificate or seller\'s permit. For hot food vendors and food trucks: a Temporary Food Service Establishment (TFSE) or County Health Permit. Our operations team provides pre-filled permit packets and coordinates directly with local public health departments to streamline your approvals.'
  },
  {
    id: 'faq-10',
    question: 'Is power and electricity provided at the booth?',
    answer: 'Yes. Every booth comes with one standard 110V/15A electrical drop. For high-draw culinary appliances (deep fryers, espresso machines, heavy refrigeration, or 220V hookups), dedicated high-amperage feeds can be added to your reservation.'
  }
];

export const FOUNDER_DATA = {
  name: 'Alex Silver & The Leadership Team',
  title: 'Founder & Event Director',
  bio: 'Valerian Events is led by Alex Silver (CEO), Elena Rostova (Operations Lead), and Marcus Vance (Sponsorships), bringing over 30+ combined years of premier festival production, culinary curation, and municipal permitting expertise.',
  email: 'info@valerianevents.com',
  address: '123 Main St, Suite 200, Las Vegas, NV 89101',
  avatar: 'https://i.pinimg.com/1200x/ce/ad/94/cead941fca1ea8075e01f564f1eedf98.jpg',
  paymentMethod: 'Credit Card / ACH / Invoicing / Zelle (info@valerianevents.com)',
  commitment: '15-minute consultations available. 24h response time guaranteed for all inquiries.'
};
