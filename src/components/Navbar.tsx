import React from 'react';
import { PageType } from '../types';
import { ChefHat, Calendar, Users, MessageSquare, Menu, X, Info } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export default function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home' as PageType, label: 'Home', icon: ChefHat },
    { id: 'events' as PageType, label: 'Events', icon: Calendar },
    { id: 'vendor-info' as PageType, label: 'Vendor Info', icon: Users },
    { id: 'about' as PageType, label: 'About Us', icon: Info },
    { id: 'contact' as PageType, label: 'Contact', icon: MessageSquare },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-forest/95 backdrop-blur-md border-b border-gold/20 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <button
          onClick={() => onPageChange('home')}
          className="flex items-center space-x-3 focus:outline-none group text-left"
          id="nav-logo"
        >
          <Logo size="md" className="group-hover:scale-105" />
          <div>
            <span
              className="block font-serif text-xl font-bold tracking-widest text-cream uppercase leading-none group-hover:text-gold transition-colors duration-200"
              style={{ fontFamily: 'Cormorant Garamond' }}
            >
              valerianevents
            </span>
            <span
              className="block font-sans text-[10px] tracking-wider text-gold/80 uppercase mt-1 italic"
              style={{ fontStyle: 'italic' }}
            >
              Where Flavor Meets Festival
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-1 p-1 bg-charcoal/30 rounded-full border border-gold/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`flex items-center space-x-1.5 px-4.5 py-2 rounded-full font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? 'bg-gold text-forest shadow-md shadow-gold/20'
                      : 'text-cream/80 hover:text-cream hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange('contact')}
            id="nav-apply-btn"
            className="relative overflow-hidden group px-5 py-2.5 rounded-xl bg-transparent border border-gold text-gold hover:text-forest font-sans text-xs font-bold tracking-widest transition-all duration-300 hover:bg-gold"
          >
            APPLY AS VENDOR
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-lg text-cream/80 hover:text-cream hover:bg-white/5 focus:outline-none"
            aria-expanded="false"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gold/10 space-y-2 fade-in" id="mobile-menu-panel">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsOpen(false);
                  }}
                  id={`mobile-nav-link-${item.id}`}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-sans text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-gold text-forest'
                      : 'text-cream/80 hover:text-cream hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                onPageChange('contact');
                setIsOpen(false);
              }}
              id="mobile-nav-apply-btn"
              className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-gold hover:bg-gold/90 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-colors duration-200"
            >
              APPLY AS VENDOR
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
