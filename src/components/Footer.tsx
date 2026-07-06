import React from 'react';
import { PageType } from '../types';
import { Mail, Phone, Instagram, Facebook, Twitter, Globe } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onPageChange: (page: PageType) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal border-t border-gold/20 text-cream/70 font-sans" id="app-footer">
      {/* Top Footer Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Logo size="md" />
              <div>
                <span className="block font-serif text-lg font-bold tracking-widest text-cream uppercase leading-none">
                  valerianevents
                </span>
                <span className="block font-sans text-[9px] text-gold tracking-wider uppercase mt-1">
                  Where Flavor Meets Festival
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-cream/50 font-light">
              Crafting unmatched culinary and artisanal experiences across the nation's premier cities. We connect visionary food creators and skilled makers with discerning patrons.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 rounded-lg bg-forest/20 border border-gold/10 text-gold hover:bg-gold hover:text-forest transition-all duration-250">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-forest/20 border border-gold/10 text-gold hover:bg-gold hover:text-forest transition-all duration-250">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-forest/20 border border-gold/10 text-gold hover:bg-gold hover:text-forest transition-all duration-250">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-forest/20 border border-gold/10 text-gold hover:bg-gold hover:text-forest transition-all duration-250">
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-serif text-sm font-bold tracking-widest text-gold uppercase mb-6">
              Navigation
            </h3>
          </div>

          {/* Column 3: Legal & Resources */}
          <div>
            <h3 className="font-serif text-sm font-bold tracking-widest text-gold uppercase mb-6">
              Resources
            </h3>
            <ul className="space-y-3.5 text-sm flex flex-col items-start">
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
              <li>
                <button
                  onClick={() => onPageChange('sponsorship-deck')}
                  className="hover:text-gold transition-colors duration-200 text-left focus:outline-none cursor-pointer"
                >
                  Sponsorship Deck
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-serif text-sm font-bold tracking-widest text-gold uppercase mb-6">
              Inquiries
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-cream/40 font-medium uppercase tracking-wider">Email Us</span>
                  <a href="mailto:alex@valerianevents.com" className="text-cream hover:text-gold transition-colors font-medium">
                    alex@valerianevents.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-cream/40 font-medium uppercase tracking-wider">Direct Line</span>
                  <a href="tel:+17276336611" className="text-cream hover:text-gold transition-colors font-medium">
                    (727) 633-6611
                  </a>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="bg-neutral-950/40 border-t border-gold/10 py-8 text-xs text-cream/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} valerianevents LLC. All rights reserved. Crafted for culinary and creator success.</p>
        </div>
      </div>
    </footer>
  );
}
