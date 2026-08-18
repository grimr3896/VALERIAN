import React from 'react';
import { PageType } from '../types';
import { Mail, Phone, MapPin, Instagram, Linkedin, Globe, ShieldCheck, FileText, HelpCircle } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onPageChange: (page: PageType) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal border-t border-gold/20 text-cream/70 font-sans" id="app-footer">
      {/* Top Footer Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand (Span 2 on medium screens) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <Logo size="md" />
              <div>
                <span className="block font-serif text-xl font-bold tracking-widest text-cream uppercase leading-none">
                  valerianevents
                </span>
                <span className="block font-sans text-[9px] text-gold tracking-wider uppercase mt-1">
                  Where Flavor Meets Festival
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-cream/60 font-light max-w-sm">
              Valerian Events designs, produces, and curates premier culinary, craft beverage, and artisanal marketplaces across America's top metropolitan cities. We connect visionary food creators and skilled makers with discerning patrons.
            </p>
            <div className="pt-2">
              <span className="block text-[10px] font-mono text-gold font-bold uppercase tracking-wider mb-2">Follow Our Production</span>
              <div className="flex space-x-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2.5 rounded-xl bg-forest/30 border border-gold/20 text-gold hover:bg-gold hover:text-forest transition-all duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2.5 rounded-xl bg-forest/30 border border-gold/20 text-gold hover:bg-gold hover:text-forest transition-all duration-200"
                  aria-label="TikTok"
                >
                  <Globe className="h-4 w-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2.5 rounded-xl bg-forest/30 border border-gold/20 text-gold hover:bg-gold hover:text-forest transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-sm font-bold tracking-widest text-gold uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs flex flex-col items-start">
              <li>
                <button
                  onClick={() => onPageChange('home')}
                  className="hover:text-gold transition-colors duration-200 text-left focus:outline-none cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('events')}
                  className="hover:text-gold transition-colors duration-200 text-left focus:outline-none cursor-pointer"
                >
                  Events Lineup
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('vendors')}
                  className="hover:text-gold transition-colors duration-200 text-left focus:outline-none cursor-pointer"
                >
                  Opportunity (Vendors)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('sponsorship-deck')}
                  className="hover:text-gold transition-colors duration-200 text-left focus:outline-none cursor-pointer"
                >
                  Advance Sponsorship
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('about')}
                  className="hover:text-gold transition-colors duration-200 text-left focus:outline-none cursor-pointer"
                >
                  About Us & Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('faq')}
                  className="hover:text-gold transition-colors duration-200 text-left focus:outline-none cursor-pointer font-medium text-cream"
                >
                  FAQ & Transparency
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Policies & Vendor Kit */}
          <div>
            <h3 className="font-serif text-sm font-bold tracking-widest text-gold uppercase mb-4">
              Policies
            </h3>
            <ul className="space-y-2.5 text-xs flex flex-col items-start">
              <li>
                <button
                  onClick={() => onPageChange('refund-policy')}
                  className="hover:text-gold transition-colors duration-200 text-left focus:outline-none cursor-pointer text-gold font-medium"
                >
                  Refund & Cancellation Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('vendor-kit')}
                  className="hover:text-gold transition-colors duration-200 text-left focus:outline-none cursor-pointer"
                >
                  Vendor Information Kit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('terms-of-service')}
                  className="hover:text-gold transition-colors duration-200 text-left focus:outline-none cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onPageChange('privacy-policy')}
                  className="hover:text-gold transition-colors duration-200 text-left focus:outline-none cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold tracking-widest text-gold uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2.5">
                <Mail className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-cream/40 uppercase tracking-wider">Email</span>
                  <a href="mailto:vendors@valerianevents.com" className="text-cream hover:text-gold transition-colors font-medium">
                    vendors@valerianevents.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-cream/40 uppercase tracking-wider">Phone</span>
                  <a href="tel:5551234567" className="text-cream hover:text-gold transition-colors font-medium">
                    (555) 123-4567
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-cream/40 uppercase tracking-wider">Headquarters</span>
                  <span className="text-cream/70 font-light block">
                    123 Main St, Suite 200<br />Las Vegas, NV 89101
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="bg-neutral-950/60 border-t border-gold/10 py-6 text-xs text-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Valerian Events. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-[11px]">
            <button onClick={() => onPageChange('terms-of-service')} className="hover:text-gold">Terms</button>
            <span>•</span>
            <button onClick={() => onPageChange('privacy-policy')} className="hover:text-gold">Privacy</button>
            <span>•</span>
            <button onClick={() => onPageChange('refund-policy')} className="hover:text-gold">Refund Guarantee</button>
            <span>•</span>
            <button onClick={() => onPageChange('faq')} className="hover:text-gold">FAQ</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
