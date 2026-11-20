import React from 'react';
import { PageType, AuthUser } from '../types';
import { ChefHat, Calendar, Users, MessageSquare, Menu, X, Info, Award, HelpCircle, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  currentUser: AuthUser | null;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onLogout: () => void;
}

export default function Navbar({ currentPage, onPageChange, currentUser, onOpenAuth, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'home' as PageType, label: 'Home', icon: ChefHat },
    { id: 'events' as PageType, label: 'Events', icon: Calendar },
    { id: 'vendors' as PageType, label: 'Opportunity', icon: Users },
    { id: 'sponsorship-deck' as PageType, label: 'Sponsorship', icon: Award },
    { id: 'about' as PageType, label: 'About Us', icon: Info },
    { id: 'faq' as PageType, label: 'FAQ', icon: HelpCircle },
    { id: 'contact' as PageType, label: 'Contact', icon: MessageSquare },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-forest/95 backdrop-blur-md border-b border-gold/20 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Logo and Brand */}
        <button
          onClick={() => onPageChange('home')}
          className="flex items-center space-x-3 focus:outline-none group text-left shrink-0 cursor-pointer"
          id="nav-logo"
        >
          <Logo size="md" className="group-hover:scale-105" />
          <div>
            <span
              className="block font-serif text-lg xl:text-xl font-bold tracking-widest text-cream uppercase leading-none group-hover:text-gold transition-colors duration-200"
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
        <div className="hidden lg:flex items-center space-x-3 xl:space-x-5">
          <div className="flex space-x-0.5 p-1 bg-charcoal/30 rounded-full border border-gold/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`flex items-center space-x-1.5 px-3 xl:px-3.5 py-2 rounded-full font-sans text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gold text-forest shadow-md shadow-gold/20'
                      : 'text-cream/80 hover:text-cream hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange('contact')}
            id="nav-apply-btn"
            className="relative overflow-hidden group px-3.5 xl:px-4 py-2 rounded-xl bg-transparent border border-gold text-gold hover:text-forest font-sans text-[11px] font-bold tracking-widest transition-all duration-300 hover:bg-gold cursor-pointer whitespace-nowrap"
          >
            APPLY
          </button>

          {/* Auth Controls */}
          {currentUser ? (
            <div className="flex items-center space-x-2 pl-2 border-l border-gold/20" id="nav-auth-user-panel">
              <div
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-gold/30 text-cream text-xs font-medium max-w-[160px]"
                title={`${currentUser.name} (${currentUser.email})`}
              >
                <User className="h-3.5 w-3.5 text-gold shrink-0" />
                <span className="truncate">{currentUser.name}</span>
              </div>
              <button
                type="button"
                onClick={onLogout}
                id="nav-logout-btn"
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-cream/25 bg-white/5 hover:bg-red-500/20 hover:border-red-300/50 text-cream text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap"
                title="Log out"
              >
                <LogOut className="h-3.5 w-3.5 text-gold" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 pl-2 border-l border-gold/20" id="nav-auth-guest-panel">
              <button
                type="button"
                onClick={() => onOpenAuth('signin')}
                id="nav-signin-btn"
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-cream/90 hover:text-gold hover:bg-white/5 text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap"
              >
                <LogIn className="h-3.5 w-3.5 text-gold" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth('signup')}
                id="nav-signup-btn"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gold hover:bg-gold/90 text-forest text-[11px] font-bold tracking-wider uppercase shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-2">
          {currentUser ? (
            <button
              type="button"
              onClick={onLogout}
              id="mobile-header-logout-btn"
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-gold/30 text-cream text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5 text-gold" />
              <span>Log Out</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onOpenAuth('signin')}
              id="mobile-header-signin-btn"
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-gold text-forest text-[10px] font-bold uppercase tracking-wider cursor-pointer"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-lg text-cream/80 hover:text-cream hover:bg-white/5 focus:outline-none cursor-pointer"
            aria-expanded={isOpen}
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-gold/10 space-y-2 fade-in" id="mobile-menu-panel">
          {currentUser && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-gold/25 text-cream mb-2">
              <div className="flex items-center space-x-2.5 min-w-0">
                <User className="h-4 w-4 text-gold shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">{currentUser.name}</span>
                  <span className="block text-[10px] text-cream/70 truncate">{currentUser.email}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                id="mobile-nav-logout-btn"
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-gold/40 text-gold text-[10px] font-bold uppercase tracking-wider shrink-0 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          )}

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
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-sans text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
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

          {!currentUser && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onOpenAuth('signin');
                  setIsOpen(false);
                }}
                id="mobile-nav-signin-btn"
                className="flex items-center justify-center space-x-1.5 px-4 py-3 rounded-xl border border-gold/40 text-cream hover:bg-white/5 font-sans text-xs font-bold tracking-wider uppercase cursor-pointer"
              >
                <LogIn className="h-4 w-4 text-gold" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenAuth('signup');
                  setIsOpen(false);
                }}
                id="mobile-nav-signup-btn"
                className="flex items-center justify-center space-x-1.5 px-4 py-3 rounded-xl bg-gold hover:bg-gold/90 text-forest font-sans text-xs font-bold tracking-wider uppercase cursor-pointer"
              >
                <UserPlus className="h-4 w-4" />
                <span>Sign Up</span>
              </button>
            </div>
          )}

          <div className="pt-1">
            <button
              onClick={() => {
                onPageChange('contact');
                setIsOpen(false);
              }}
              id="mobile-nav-apply-btn"
              className="w-full flex items-center justify-center px-4 py-3 rounded-xl border border-gold text-gold hover:bg-gold hover:text-forest font-sans text-xs font-bold tracking-widest uppercase transition-colors duration-200 cursor-pointer"
            >
              APPLY FOR OPPORTUNITY
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
