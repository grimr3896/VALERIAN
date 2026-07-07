import React, { useState } from 'react';
import { PageType } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventCard from './components/EventCard';
import EventDetailPage from './components/EventDetailPage';
import VendorKitPage from './components/VendorKitPage';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';
import SponsorshipPage from './components/SponsorshipPage';
import AboutPage from './components/AboutPage';
import Accordion from './components/Accordion';
import ContactForm from './components/ContactForm';
import { EVENTS_DATA, VENDOR_CATEGORIES, FAQS_DATA, FOUNDER_DATA } from './data';
import {
  Sparkles,
  ArrowRight,
  Mail,
  Phone,
  DollarSign,
  Users,
  ShieldCheck,
  Award,
  Flame,
  ArrowUpRight,
  MapPin,
  Calendar,
  X,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedEventForApplication, setSelectedEventForApplication] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Los Angeles' | 'New York City' | 'Miami' | 'Austin' | 'Las Vegas'>('All');
  const [timeFilter, setTimeFilter] = useState<'upcoming' | 'past'>('upcoming');
  
  // Custom Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info'>('success');

  const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleViewDetails = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentPage('event-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyForEvent = (eventName: string) => {
    setSelectedEventForApplication(eventName);
    setCurrentPage('contact');
    triggerToast(`Applying for ${eventName}. Form pre-filled.`, 'info');
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Events
  const filteredEvents = (activeFilter === 'All'
    ? EVENTS_DATA
    : EVENTS_DATA.filter(e => e.tag === activeFilter)
  ).filter(e => timeFilter === 'upcoming' ? !e.isPast : !!e.isPast);

  // Filter Counts
  const filterCounts = {
    All: EVENTS_DATA.filter(e => timeFilter === 'upcoming' ? !e.isPast : !!e.isPast).length,
    'Los Angeles': EVENTS_DATA.filter(e => e.tag === 'Los Angeles' && (timeFilter === 'upcoming' ? !e.isPast : !!e.isPast)).length,
    'New York City': EVENTS_DATA.filter(e => e.tag === 'New York City' && (timeFilter === 'upcoming' ? !e.isPast : !!e.isPast)).length,
    Miami: EVENTS_DATA.filter(e => e.tag === 'Miami' && (timeFilter === 'upcoming' ? !e.isPast : !!e.isPast)).length,
    Austin: EVENTS_DATA.filter(e => e.tag === 'Austin' && (timeFilter === 'upcoming' ? !e.isPast : !!e.isPast)).length,
    'Las Vegas': EVENTS_DATA.filter(e => e.tag === 'Las Vegas' && (timeFilter === 'upcoming' ? !e.isPast : !!e.isPast)).length,
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col font-sans selection:bg-gold selection:text-forest">
      
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-bounce" id="toast-notification">
          <div className={`p-4 rounded-xl border flex items-center space-x-3.5 shadow-2xl backdrop-blur-md ${
            toastType === 'success'
              ? 'bg-white/95 border-forest/30 text-forest shadow-md'
              : 'bg-white/95 border-gold/30 text-gold shadow-md'
          }`}>
            {toastType === 'success' ? (
              <ShieldCheck className="h-5 w-5 shrink-0 text-forest" />
            ) : (
              <Sparkles className="h-5 w-5 shrink-0 text-gold" />
            )}
            <p className="text-xs md:text-sm font-medium text-charcoal">{toastMessage}</p>
            <button
              onClick={() => setToastMessage(null)}
              className="text-charcoal/40 hover:text-charcoal transition-colors ml-auto"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar currentPage={currentPage} onPageChange={(page) => {
        setCurrentPage(page);
        if (page !== 'contact') {
          // Clear any event selection if they leave the contact page manually
          setSelectedEventForApplication('');
        }
        if (page !== 'event-detail') {
          setSelectedEventId(null);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Main Page Routing */}
      <main className="flex-grow">
        
        {/* ==================================== */}
        {/* HOME PAGE                            */}
        {/* ==================================== */}
        {currentPage === 'home' && (
          <div className="fade-in space-y-24 pb-24">
            
            {/* Elegant Atmospheric Hero section */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-16 px-4" id="home-hero">
              {/* Background cover with deep ambient overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://i.pinimg.com/1200x/8d/a5/1b/8da51baa564a3dac87c03aca5d1af9f7.jpg"
                  alt="Atmospheric night market"
                  className="w-full h-full object-cover opacity-85 transition-opacity duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cream/40 via-transparent to-transparent"></div>
              </div>

              {/* Hero content */}
              <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-forest/10 border border-forest/20 text-forest">
                  <Sparkles className="h-4 w-4 text-gold" />
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase font-sans">Now Curating the 2026 Season</span>
                </div>
                
                <h1 className="font-['Times_New_Roman'] text-[52px] font-bold italic text-left text-[#f2eaea] leading-tight tracking-tight border-double border-0">
                  Where Flavor Meets <br />
                  <span className="italic font-light text-[#e8e5db]">Festival</span>
                </h1>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      setCurrentPage('events');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    id="hero-view-events-btn"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-forest hover:bg-forest/95 text-cream font-sans text-xs font-bold tracking-widest uppercase shadow-lg shadow-forest/10 transition-all duration-300 cursor-pointer"
                  >
                    VIEW EVENTS
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    id="hero-apply-btn"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl border border-gold bg-white/40 hover:bg-white text-forest font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer"
                  >
                    APPLY AS VENDOR
                  </button>
                </div>
              </div>

              {/* Decorative side margins indicators */}
              <div className="absolute bottom-6 left-6 right-6 hidden md:flex items-center justify-between text-[10px] text-forest/40 font-mono tracking-widest uppercase">
                <span>[ AMBIENT CULINARY EXHIBITIONS ]</span>
                <span>COI REQUIRED · CURATED ROSTER</span>
              </div>
            </section>

            {/* Curated Culinary Experiences Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="curated-experiences">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gold uppercase tracking-widest font-sans">Craft Curation</span>
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-forest">Curated Gastronomy Pillars</h2>
                  <p className="text-charcoal/65 text-sm font-light max-w-xl">
                    Every valerianevents festival centers on highly distinct culinary concepts, drawing visitors who seek authentic regional profiles.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCurrentPage('events');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center space-x-2 text-sm font-bold text-forest hover:text-gold transition-colors duration-200 uppercase tracking-wider"
                >
                  <span>Browse All Events</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Grid of 3 highlighted concept cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1: Tacos & Tequila */}
                <div 
                  onClick={() => handleViewDetails('ev-07')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleViewDetails('ev-07');
                    }
                  }}
                  className="group rounded-2xl bg-white border border-gold/20 overflow-hidden hover:border-gold hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/50"
                  id="pillar-card-tacos"
                >
                  <div className="h-48 overflow-hidden relative bg-neutral-100">
                    <img
                      src="https://i.pinimg.com/736x/09/a1/19/09a11959c7b5fd731c50f3f4c2c6adca.jpg"
                      alt="Tacos & Tequila Street Fiesta"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent"></div>
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-[10px] font-bold text-gold tracking-widest uppercase font-sans">LOS ANGELES & MIAMI</span>
                    <h3 className="font-serif text-lg font-bold text-forest group-hover:text-gold transition-colors">Tacos & Tequila Street Fiesta</h3>
                    <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                      Highlighting gourmet street taco concepts, local artisanal salsa makers, mezcal masters, and high-energy music.
                    </p>
                    <div className="pt-2 flex items-center text-xs font-bold text-forest group-hover:text-gold transition-colors space-x-1">
                      <span>Explore Event Details</span>
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card 2: Whiskey & BBQ */}
                <div 
                  onClick={() => handleViewDetails('ev-02')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleViewDetails('ev-02');
                    }
                  }}
                  className="group rounded-2xl bg-white border border-gold/20 overflow-hidden hover:border-gold hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/50"
                  id="pillar-card-whiskey"
                >
                  <div className="h-48 overflow-hidden relative bg-neutral-100">
                    <img
                      src="https://i.pinimg.com/1200x/90/7e/7d/907e7d060e7408ed7dcce2c4eab50699.jpg"
                      alt="Whiskey & BBQ Fest"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent"></div>
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-[10px] font-bold text-gold tracking-widest uppercase font-sans">MIAMI & NEW YORK CITY</span>
                    <h3 className="font-serif text-lg font-bold text-forest group-hover:text-gold transition-colors">Smoke & Oak Spirits Fest</h3>
                    <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                      Mouthwatering low-and-slow barbecue pitmasters paired with elite single-barrel whiskey distillers under glowing lights.
                    </p>
                    <div className="pt-2 flex items-center text-xs font-bold text-forest group-hover:text-gold transition-colors space-x-1">
                      <span>Explore Event Details</span>
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card 3: Hot Sauce & Spicy Food */}
                <div 
                  onClick={() => handleViewDetails('ev-09')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleViewDetails('ev-09');
                    }
                  }}
                  className="group rounded-2xl bg-white border border-gold/20 overflow-hidden hover:border-gold hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/50"
                  id="pillar-card-hotsauce"
                >
                  <div className="h-48 overflow-hidden relative bg-neutral-100">
                    <img
                      src="https://i.pinimg.com/736x/d5/09/8c/d5098c3328cb6a33ba5ce88b5522d308.jpg"
                      alt="Hot Sauce & Spicy Food Expo"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent"></div>
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-[10px] font-bold text-gold tracking-widest uppercase font-sans">AUSTIN & LOS ANGELES</span>
                    <h3 className="font-serif text-lg font-bold text-forest group-hover:text-gold transition-colors">Hot Sauce & Spicy Food Expo</h3>
                    <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                      Celebrating small-batch hot sauce innovators, high-heat street gastronomy, and specialty heirloom pepper growers.
                    </p>
                    <div className="pt-2 flex items-center text-xs font-bold text-forest group-hover:text-gold transition-colors space-x-1">
                      <span>Explore Event Details</span>
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </section>



            {/* Bottom Call to Action */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="relative p-8 md:p-12 rounded-2xl bg-forest border border-gold/30 overflow-hidden shadow-xl text-center space-y-6">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Flame className="h-32 w-32 text-gold" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-cream font-bold">Ready to scale your culinary brand?</h2>
                <p className="text-xs md:text-sm text-cream/80 max-w-xl mx-auto leading-relaxed font-light">
                  Spaces are highly curated and fill up months in advance. Secure your evaluation window and showcase your heritage culinary concept at our next peak weekend.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCurrentPage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    id="cta-apply-btn"
                    className="px-8 py-3.5 rounded-xl bg-gold hover:bg-gold/95 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-colors shadow-lg cursor-pointer"
                  >
                    APPLY AS VENDOR
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================================== */}
        {/* EVENTS PAGE                          */}
        {/* ==================================== */}
        {currentPage === 'events' && (
          <div className="fade-in space-y-16 pb-24">
            
            {/* Header / Hero */}
            <section className="relative py-20 px-4 text-center border-b border-gold/15 bg-white overflow-hidden" id="events-hero">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
                  alt="Food Festival"
                  className="w-full h-full object-cover opacity-5 filter brightness-95"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <span className="text-xs font-bold text-gold uppercase tracking-widest font-sans block">
                  {timeFilter === 'upcoming' ? 'Active Lineup' : 'Exhibition History'}
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest">
                  {timeFilter === 'upcoming' ? 'Upcoming Events & Festivals' : 'Past Exhibition Archive'}
                </h1>
                <p className="text-charcoal/75 text-xs md:text-sm font-light max-w-lg mx-auto leading-relaxed">
                  {timeFilter === 'upcoming'
                    ? 'Filter by city to browse available booth spaces, event statistics, and upcoming weekend schedules. Apply immediately to guarantee spot reservation.'
                    : 'Browse our complete history of past exhibitions. Review attendee statistics and previous events held in major metropolitan hubs.'}
                </p>
              </div>
            </section>

            {/* Event List with City Filter Chips */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col gap-6 pb-6 border-b border-gold/15">
                {/* Time range selector (Upcoming vs Past) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="inline-flex p-1 bg-cream/70 rounded-xl border border-gold/20 shadow-sm" id="time-filters">
                    <button
                      onClick={() => { setTimeFilter('upcoming'); setActiveFilter('All'); }}
                      id="time-filter-upcoming"
                      className={`px-4.5 py-2 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        timeFilter === 'upcoming'
                          ? 'bg-forest text-cream shadow-sm'
                          : 'text-charcoal/60 hover:text-charcoal'
                      }`}
                    >
                      Upcoming Lineup ({EVENTS_DATA.filter(e => !e.isPast).length})
                    </button>
                    <button
                      onClick={() => { setTimeFilter('past'); setActiveFilter('All'); }}
                      id="time-filter-past"
                      className={`px-4.5 py-2 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        timeFilter === 'past'
                          ? 'bg-forest text-cream shadow-sm'
                          : 'text-charcoal/60 hover:text-charcoal'
                      }`}
                    >
                      Past Showcase ({EVENTS_DATA.filter(e => e.isPast).length})
                    </button>
                  </div>

                  <div className="text-xs text-charcoal/40 font-mono tracking-wider">
                    SHOWING {filteredEvents.length} OF {EVENTS_DATA.filter(e => timeFilter === 'upcoming' ? !e.isPast : !!e.isPast).length} {timeFilter === 'upcoming' ? 'ACTIVE' : 'PAST'} EXHIBITIONS
                  </div>
                </div>

                {/* City Filters */}
                <div className="flex flex-wrap gap-2" id="city-filters">
                  {(['All', 'Los Angeles', 'New York City', 'Miami', 'Austin', 'Las Vegas'] as const).map((city) => {
                    const isActive = activeFilter === city;
                    return (
                      <button
                        key={city}
                        onClick={() => setActiveFilter(city)}
                        id={`filter-chip-${city.replace(/\s+/g, '-').toLowerCase()}`}
                        className={`px-4.5 py-2 rounded-full font-sans text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                          isActive
                            ? 'bg-forest text-cream shadow-sm'
                            : 'bg-white border border-gold/30 text-charcoal/80 hover:text-forest hover:border-gold'
                        }`}
                      >
                        {city} ({filterCounts[city]})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Event Cards Grid */}
              {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="events-grid">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onApply={handleApplyForEvent}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-16 text-center border border-dashed border-gold/30 rounded-2xl space-y-4 bg-white/50">
                  <p className="text-charcoal/50 text-sm">No scheduled events match the selected criteria.</p>
                  <button
                    onClick={() => setActiveFilter('All')}
                    className="px-4 py-2 bg-forest text-cream rounded-xl hover:bg-forest/90 text-xs font-bold uppercase tracking-wider"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </section>

            {/* Partnership Enquiries Section */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="p-8 md:p-12 rounded-2xl bg-white border border-gold/25 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
                <div className="space-y-2 max-w-lg">
                  <h3 className="font-serif text-xl font-bold text-forest">Don't miss your chance to exhibit at our next premium event</h3>
                  <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                    Partner with Valerian Events and gain direct access to over 12,000+ local culinary enthusiasts per weekend.
                  </p>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                  <button
                    onClick={() => {
                      setCurrentPage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-forest hover:bg-forest/95 text-cream font-sans text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
                  >
                    BECOME A VENDOR
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================================== */}
        {/* VENDOR INFORMATION PAGE              */}
        {/* ==================================== */}
        {currentPage === 'vendor-info' && (
          <div className="fade-in space-y-24 pb-24">
            
            {/* Header / Hero */}
            <section className="relative py-20 px-4 text-center bg-white border-b border-gold/15" id="vendor-info-hero">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80"
                  alt="Maker working"
                  className="w-full h-full object-cover opacity-5 filter brightness-95"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <span className="text-xs font-bold text-gold uppercase tracking-widest font-sans block">Exhibitor Hub</span>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest">Vendor Information</h1>
                <p className="text-charcoal/75 text-xs md:text-sm font-light max-w-lg mx-auto leading-relaxed">
                  Everything you need to know about exhibit inclusions, spatial layouts, eligibility, and booking timelines to maximize your sales success.
                </p>
              </div>
            </section>

            {/* Inclusions & Application In-depth Cards */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8" id="inclusions-section">
              
              {/* Left Column: What's Included */}
              <div className="p-8 md:p-10 rounded-2xl bg-white border border-gold/20 space-y-6 shadow-sm">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-gold uppercase tracking-widest font-sans">The Booth Package</span>
                  <h3 className="font-serif text-xl font-bold text-forest">What's Included With Every Spot</h3>
                  <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                    Unlike typical local markets, we provide high-capacity utility infrastructures to support professional culinary setups safely.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Item 1 */}
                  <div className="p-4 rounded-xl bg-cream/40 border border-gold/15 space-y-2">
                    <span className="block font-serif font-bold text-sm text-forest">20A Dedicated Power</span>
                    <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                      Heavy-duty, low-fluctuation direct current access for high-temp grills, coolers, or display canopies.
                    </p>
                  </div>
                  {/* Item 2 */}
                  <div className="p-4 rounded-xl bg-cream/40 border border-gold/15 space-y-2">
                    <span className="block font-serif font-bold text-sm text-forest">Social Media Spotlight</span>
                    <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                      Custom graphic profile and tag promotions reaching our combined 40k+ verified foodie fans.
                    </p>
                  </div>
                  {/* Item 3 */}
                  <div className="p-4 rounded-xl bg-cream/40 border border-gold/15 space-y-2">
                    <span className="block font-serif font-bold text-sm text-forest">Professional Lighting</span>
                    <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                      Overhead festoon and bistro wire string arrays integrated into our master metal support truss designs.
                    </p>
                  </div>
                  {/* Item 4 */}
                  <div className="p-4 rounded-xl bg-cream/40 border border-gold/15 space-y-2">
                    <span className="block font-serif font-bold text-sm text-forest">Security & Waste Mgmt</span>
                    <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                      Overnight patrols, dedicated food-waste compactors, greywater ports, and grease bins.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: How to Apply & Download Kit */}
              <div className="p-8 md:p-10 rounded-2xl bg-white border border-gold/20 flex flex-col justify-between space-y-8 shadow-sm">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-gold uppercase tracking-widest font-sans">Evaluations Desk</span>
                  <h3 className="font-serif text-xl font-bold text-forest">How We Curate & Select</h3>
                  <p className="text-sm text-charcoal/70 font-light leading-relaxed">
                    We select brands based on quality of presentation, menu uniqueness, fire safety standards, and historical performance. We try to avoid vendor duplication to ensure high foot traffic conversion and great sales results for every accepted merchant.
                  </p>
                  
                  <div className="p-4 rounded-xl bg-gold/10 border border-gold/20 flex items-start space-x-3 text-xs text-charcoal/80">
                    <AlertCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-light">
                      Accepted applicants receive a custom blueprints floorplan and load-in timing windows inside their exhibitor packet.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gold/10 space-y-4">
                  <p className="text-xs text-charcoal/40 font-light">Ready to lock in your placement, review guidelines, or speak with our planning concierge?</p>
                  <button
                    onClick={() => {
                      setCurrentPage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-3.5 rounded-xl bg-forest hover:bg-forest/95 text-cream font-sans text-xs font-bold tracking-widest uppercase transition-colors shadow-sm cursor-pointer flex items-center justify-center"
                  >
                    <span>CONTACT CONCIERGE</span>
                  </button>
                </div>
              </div>
            </section>

            {/* A 3-Step Journey to Success section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="journey-roadmap">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-xs font-bold text-gold uppercase tracking-widest font-sans">Simple Timeline</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-forest">A 3-Step Journey to Success</h2>
                <p className="text-charcoal/65 text-xs md:text-sm font-light">
                  From initial profile registration to selling under the bistro lights—our concierge is with you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connector line for desktop */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-gold/10 via-gold/30 to-gold/10 z-0 hidden md:block -translate-y-6"></div>

                {/* Step 1 */}
                <div className="relative z-10 p-6 rounded-xl bg-white border border-gold/15 space-y-4 text-center shadow-sm">
                  <span className="block font-serif text-4xl font-black text-forest/15 leading-none">01</span>
                  <h3 className="font-serif font-bold text-forest text-md">Initial Contact</h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                    Submit your menu/brand details through our simple digital concierge contact form below or via phone.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 p-6 rounded-xl bg-white border border-gold/30 space-y-4 text-center shadow-md">
                  <span className="block font-serif text-4xl font-black text-gold/30 leading-none">02</span>
                  <h3 className="font-serif font-bold text-forest text-md">Receive Options</h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                    Our team reviews menu synergy and suggests custom event dates, pricing schemes, and layouts.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative z-10 p-6 rounded-xl bg-white border border-gold/15 space-y-4 text-center shadow-sm">
                  <span className="block font-serif text-4xl font-black text-forest/15 leading-none">03</span>
                  <h3 className="font-serif font-bold text-forest text-md">Confirm & Secure</h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                    Settle your flat-rate booth dues, submit COI permits, and access your custom assigned load-in gates.
                  </p>
                </div>
              </div>
            </section>

            {/* Diverse Heritage categories showcase */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="heritage-pillars">
              <div className="space-y-2">
                <span className="text-xs font-bold text-gold uppercase tracking-widest font-sans">Accepted Categories</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">Our Diverse Heritage</h2>
                <p className="text-charcoal/65 text-sm font-light max-w-xl">
                  We welcome passion-driven entrepreneurs across key core categories to maintain balanced festival dynamics.
                </p>
              </div>

              {/* Showcase Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {VENDOR_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    id={`category-card-${cat.id}`}
                    className="group relative h-72 rounded-xl overflow-hidden border border-gold/20 hover:border-gold hover:shadow-md transition-all duration-300 flex flex-col justify-end p-5"
                  >
                    <div className="absolute inset-0 z-0 bg-charcoal">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-103"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 space-y-2 text-left">
                      <h3 className="font-serif font-bold text-sm text-cream group-hover:text-gold transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[10px] text-cream/70 leading-relaxed font-light line-clamp-3">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Frequently Asked Questions (Accordion) */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12" id="faq-section">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold text-gold uppercase tracking-widest font-sans">Merchant Q&A</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-forest">Frequently Asked Questions</h2>
                <p className="text-charcoal/65 text-xs md:text-sm font-light">
                  Got technical inquiries? Let our common exhibitor guidelines clarify insurance, schedules, and power codes.
                </p>
              </div>

              {/* FAQ Accordion component */}
              <Accordion items={FAQS_DATA} />
            </section>

            {/* Bottom Inquiries CTA */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="p-8 md:p-10 rounded-2xl bg-white border border-gold/20 space-y-6 text-center shadow-sm">
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest font-sans">Rolling Curation</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-forest">Spaces are limited and go fast. Apply today.</h3>
                <p className="text-xs text-charcoal/70 max-w-md mx-auto leading-relaxed font-light">
                  Avoid placement duplication. Secure your city-specific weekend reservation by speaking directly with our lead office.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
                  <a
                    href="mailto:alex@valerianevents.com"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gold text-forest hover:bg-neutral-50 text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center space-x-2"
                  >
                    <Mail className="h-4 w-4 text-gold" />
                    <span>EMAIL INQUIRY</span>
                  </a>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================================== */}
        {/* CONTACT PAGE                         */}
        {/* ==================================== */}
        {currentPage === 'contact' && (
          <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
            
            {/* Header */}
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-gold uppercase tracking-widest font-sans block">Direct Concierge</span>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest">Get In Touch</h1>
              <p className="text-charcoal/65 text-xs md:text-sm font-light leading-relaxed">
                Whether you have food safety queries, wish to co-exhibit, or require bespoke corporate options, we are ready to assist.
              </p>
            </div>

            {/* Split layout: left info card, right contact form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-split-layout">
              
              {/* Left Column: Organizer Card */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* Main Organizer Profile card */}
                <div className="p-8 rounded-2xl bg-white border border-gold/20 space-y-6 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Award className="h-32 w-32 text-gold" />
                  </div>

                  <div className="flex items-center space-x-5">
                    <img
                      src={FOUNDER_DATA.avatar}
                      alt={FOUNDER_DATA.name}
                      className="h-16 w-16 rounded-xl object-cover border border-gold/20"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-left">
                      <h3 className="font-serif font-bold text-forest text-lg leading-snug">{FOUNDER_DATA.name}</h3>
                      <p className="text-xs text-gold font-bold font-sans uppercase tracking-wider">{FOUNDER_DATA.title}</p>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-charcoal/70 font-light leading-relaxed text-left">
                    {FOUNDER_DATA.bio}
                  </p>

                  <div className="pt-4 border-t border-gold/10 space-y-3.5 text-xs text-charcoal/80 text-left">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4.5 w-4.5 text-gold shrink-0" />
                      <a href={`mailto:${FOUNDER_DATA.email}`} className="hover:text-gold transition-colors font-medium">
                        {FOUNDER_DATA.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg
                        className="h-4.5 w-4.5 text-[#25D366] shrink-0 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                      </svg>
                      <a href={`https://wa.me/1${FOUNDER_DATA.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium">
                        {FOUNDER_DATA.phone}
                      </a>
                    </div>
                  </div>



                  {/* Commitment */}
                  <p className="text-[10px] text-charcoal/40 italic font-light text-left">
                    * {FOUNDER_DATA.commitment}
                  </p>
                </div>

                {/* Secondary Help notice */}
                <div className="p-6 rounded-2xl bg-gold/10 border border-gold/25 space-y-3 text-left">
                  <h4 className="font-serif font-bold text-sm text-forest uppercase tracking-wider">Prefer to reach us directly?</h4>
                  <p className="text-xs text-charcoal/70 leading-relaxed font-light">
                    For corporate sponsorships, food truck associations, or media passes, connect directly via phone at <a href="tel:+17276336611" className="text-forest hover:text-gold font-bold underline">(727) 633-6611</a> or email <a href="mailto:alex@valerianevents.com" className="text-forest hover:text-gold font-bold underline">alex@valerianevents.com</a>.
                  </p>
                </div>

              </div>

              {/* Right Column: Contact form */}
              <div className="lg:col-span-7">
                <ContactForm
                  prefilledEventName={selectedEventForApplication}
                  onSuccess={() => {
                    triggerToast("Your application has been securely transmitted!", "success");
                  }}
                />
              </div>

            </div>

          </div>
        )}

        {/* ==================================== */}
        {/* EVENT DETAIL PAGE                     */}
        {/* ==================================== */}
        {currentPage === 'event-detail' && (() => {
          const matchedEvent = EVENTS_DATA.find(e => e.id === selectedEventId);
          if (!matchedEvent) return null;
          return (
            <EventDetailPage
              event={matchedEvent}
              onApply={handleApplyForEvent}
              onBack={() => {
                setCurrentPage('events');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          );
        })()}

        {/* ==================================== */}
        {/* VENDOR KIT PAGE                      */}
        {/* ==================================== */}
        {currentPage === 'vendor-kit' && (
          <VendorKitPage
            onBack={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onApply={() => {
              setSelectedEventForApplication('General Vendor Inquiry');
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ==================================== */}
        {/* TERMS OF SERVICE PAGE                */}
        {/* ==================================== */}
        {currentPage === 'terms-of-service' && (
          <TermsPage
            onBack={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ==================================== */}
        {/* PRIVACY POLICY PAGE                  */}
        {/* ==================================== */}
        {currentPage === 'privacy-policy' && (
          <PrivacyPage
            onBack={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ==================================== */}
        {/* ABOUT US PAGE                        */}
        {/* ==================================== */}
        {currentPage === 'about' && (
          <AboutPage
            onBack={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onContact={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ==================================== */}
        {/* SPONSORSHIP DECK PAGE                */}
        {/* ==================================== */}
        {currentPage === 'sponsorship-deck' && (
          <SponsorshipPage
            onBack={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onApplyForSponsorship={(tierName) => {
              setSelectedEventForApplication(`Sponsorship: ${tierName}`);
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Footer */}
      <Footer onPageChange={(page) => {
        setCurrentPage(page);
        if (page !== 'contact') {
          setSelectedEventForApplication('');
        }
        if (page !== 'event-detail') {
          setSelectedEventId(null);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}
