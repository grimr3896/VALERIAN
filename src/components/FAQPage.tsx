import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Sparkles, Mail, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { FAQS_DATA } from '../data';

interface FAQPageProps {
  onBack: () => void;
  onApply: () => void;
}

export default function FAQPage({ onBack, onApply }: FAQPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="fade-in max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="faq-page">
      {/* Back button and header */}
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gold/30 bg-white hover:bg-forest/5 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
          id="faq-back-btn"
        >
          <ArrowLeft className="h-4 w-4 text-gold" />
          <span>Back to Lineup</span>
        </button>

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full bg-forest/10 text-forest border border-gold/20 inline-flex items-center space-x-1.5">
            <HelpCircle className="h-3.5 w-3.5 text-gold" />
            <span>TRANSPARENCY & FREQUENTLY ASKED QUESTIONS</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight uppercase">
            Frequently Asked Questions
          </h1>
          <p className="text-charcoal/70 font-light text-sm sm:text-base leading-relaxed">
            Everything you need to know about booth fees, inclusions, refund guarantees, utility power, setup schedules, and attendee marketing.
          </p>
        </div>
      </div>

      {/* Highlights Quick Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gold/20 flex items-start space-x-3.5 shadow-xs">
          <div className="p-2.5 rounded-xl bg-forest/5 text-forest shrink-0">
            <ShieldCheck className="h-5 w-5 text-gold" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-forest text-sm uppercase tracking-wide">100% Refund Policy</h4>
            <p className="text-xs text-charcoal/65 font-light leading-relaxed mt-0.5">
              Full refund if space isn't confirmed within 14 days of application.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gold/20 flex items-start space-x-3.5 shadow-xs">
          <div className="p-2.5 rounded-xl bg-forest/5 text-forest shrink-0">
            <CheckCircle2 className="h-5 w-5 text-gold" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-forest text-sm uppercase tracking-wide">0% Sales Commission</h4>
            <p className="text-xs text-charcoal/65 font-light leading-relaxed mt-0.5">
              Flat booth fee only. You keep 100% of your festival sales.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gold/20 flex items-start space-x-3.5 shadow-xs">
          <div className="p-2.5 rounded-xl bg-forest/5 text-forest shrink-0">
            <Mail className="h-5 w-5 text-gold" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-forest text-sm uppercase tracking-wide">Direct Curator Support</h4>
            <p className="text-xs text-charcoal/65 font-light leading-relaxed mt-0.5">
              Email info@valerianevents.com for rapid 24-hour response.
            </p>
          </div>
        </div>
      </div>

      {/* Accordion FAQ list */}
      <div className="space-y-4">
        {FAQS_DATA.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.id || index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen 
                  ? 'bg-white border-gold/50 shadow-md ring-1 ring-gold/25' 
                  : 'bg-[#FAF6F0]/60 border-gold/20 hover:border-gold/40'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                id={`faq-btn-${index}`}
              >
                <span className="font-serif font-bold text-forest text-base sm:text-lg tracking-wide">
                  {faq.question}
                </span>
                <span className="p-2 rounded-xl bg-forest/5 text-forest shrink-0">
                  {isOpen ? <ChevronUp className="h-4 w-4 text-gold" /> : <ChevronDown className="h-4 w-4 text-forest" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 text-sm text-charcoal/75 font-light leading-relaxed border-t border-gold/10">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions banner */}
      <div className="p-8 sm:p-10 bg-forest text-cream rounded-3xl border border-gold/30 shadow-xl space-y-6 text-center">
        <Sparkles className="h-8 w-8 text-gold mx-auto" />
        <div className="space-y-2 max-w-xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold uppercase tracking-wide">
            Still Have Questions?
          </h3>
          <p className="text-xs sm:text-sm text-cream/75 font-light leading-relaxed">
            Our team is available daily for 15-minute consultations. Connect with us directly by email to discuss electrical needs, space availability, or custom multi-city booth rates.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="mailto:info@valerianevents.com"
            className="inline-flex items-center space-x-2 py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-cream border border-gold/30 font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200"
          >
            <Mail className="h-4 w-4 text-gold" />
            <span>info@valerianevents.com</span>
          </a>

          <button
            onClick={onApply}
            className="inline-flex items-center space-x-2 py-3 px-6 rounded-xl bg-gold hover:bg-gold/90 text-forest font-sans text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-md"
          >
            <span>Apply For Space</span>
          </button>
        </div>
      </div>
    </div>
  );
}
