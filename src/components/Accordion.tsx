import React, { useState } from 'react';
import { FAQ } from '../types';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface AccordionProps {
  items: FAQ[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4" id="faq-accordion-group">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            id={`faq-item-${item.id}`}
            className={`rounded-xl border transition-all duration-300 ${
              isOpen
                ? 'bg-white border-gold/40 shadow-[0_8px_24px_rgba(27,77,62,0.04)]'
                : 'bg-white/60 border-gold/15 hover:border-gold/35 hover:bg-white'
            }`}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between text-left px-6 py-5 focus:outline-none"
              id={`faq-trigger-${item.id}`}
            >
              <div className="flex items-center space-x-4">
                <HelpCircle className={`h-5 w-5 shrink-0 transition-colors duration-300 ${isOpen ? 'text-gold' : 'text-forest/65'}`} />
                <span className="font-serif font-bold text-forest tracking-wide text-md md:text-base">
                  {item.question}
                </span>
              </div>
              <div
                className={`ml-4 p-1.5 rounded-lg bg-cream border border-gold/20 text-forest transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-gold border-gold/40' : ''
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>

            {/* Collapsible Answer Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-64 opacity-100 border-t border-gold/10' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
              id={`faq-content-${item.id}`}
            >
              <div className="px-6 py-5 text-sm md:text-base leading-relaxed text-charcoal/80 font-light">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
