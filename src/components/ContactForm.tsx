import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2, RefreshCw, CalendarDays } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS immediately so it is configured before any send call
emailjs.init('dUpRmObSvyywLE_u_');

interface ContactFormProps {
  prefilledEventName?: string;
  onSuccess?: () => void;
}

export default function ContactForm({ prefilledEventName, onSuccess }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    event: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Handle prefilling if an event was selected
  useEffect(() => {
    if (prefilledEventName) {
      const nameLower = prefilledEventName.toLowerCase();
      if (nameLower.includes('taco') || nameLower.includes('tequila')) {
        setFormData((prev) => ({ ...prev, event: 'Taco & Tequila Street Fiesta — Los Angeles, CA' }));
      } else if (nameLower.includes('whiskey') || nameLower.includes('bbq')) {
        setFormData((prev) => ({ ...prev, event: 'Whiskey & BBQ Fest — Miami, FL' }));
      } else if (nameLower.includes('sauce') || nameLower.includes('spicy') || nameLower.includes('hot')) {
        setFormData((prev) => ({ ...prev, event: 'American Hot Sauce & Spicy Food Expo — Austin, TX' }));
      } else {
        setFormData((prev) => ({ ...prev, event: '' }));
      }
    }
  }, [prefilledEventName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields (Full Name, Email Address, and Message).');
      return;
    }

    setLoading(true);

    // Prepare template parameters exactly as mapped in the requirements
    const templateParams = {
      from_name: formData.name,
      business_name: formData.business,
      from_email: formData.email,
      phone: formData.phone,
      event: formData.event,
      message: formData.message
    };

    // Wire to EmailJS send
    emailjs.send('service_j7a181v', 'template_uwd0or8', templateParams)
      .then(() => {
        setLoading(false);
        setSubmitted(true);
        if (onSuccess) {
          onSuccess();
        }
        // Clear the form
        setFormData({
          name: '',
          business: '',
          email: '',
          phone: '',
          event: '',
          message: '',
        });
      })
      .catch((err) => {
        setLoading(false);
        console.error('EmailJS Error:', err);
        setError('Something went wrong. Please email us directly at vendors@valerianevents.com');
      });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      business: '',
      email: '',
      phone: '',
      event: prefilledEventName ? formData.event : '',
      message: '',
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="p-8 md:p-12 text-center bg-white border border-gold/30 rounded-2xl space-y-6 fade-in shadow-xl shadow-forest/5" id="contact-success-panel">
        <div className="inline-flex p-4 bg-forest/10 text-forest rounded-full border border-forest/20 shadow-[0_0_20px_rgba(27,77,62,0.1)]">
          <CheckCircle2 className="h-10 w-10 text-gold" />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-bold tracking-tight text-forest">Inquiry Received</h3>
          <p className="text-charcoal/80 text-sm max-w-md mx-auto leading-relaxed font-light">
            Thank you! We'll be in touch within 24 hours.
          </p>
        </div>
        <div className="p-5 rounded-xl bg-cream border border-gold/20 max-w-sm mx-auto text-xs text-charcoal/80 space-y-2">
          <span className="block font-bold text-forest tracking-wider uppercase text-[10px]">Next Steps</span>
          <p className="font-light leading-relaxed">
            Our team will personally review your profile and respond to your email within 24 hours.
          </p>
        </div>
        <button
          onClick={resetForm}
          className="px-6 py-3 rounded-full border border-gold/30 bg-transparent text-forest hover:bg-neutral-50 text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-10 bg-white border border-gold/20 rounded-2xl shadow-xl shadow-forest/5 space-y-6" id="contact-form-panel">
      <div>
        <h3 className="font-serif text-xl font-bold tracking-wide text-forest">Vendor Application Concierge</h3>
        <p className="text-xs text-charcoal/65 mt-1 font-light">Complete the secure portal form below to receive priority placement evaluation.</p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" id="concierge-contact-form">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold leading-relaxed">
            {error}
          </div>
        )}

        {/* Name Input */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Sophia Vance"
            className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal placeholder-charcoal/45 text-sm outline-none transition-all duration-200"
          />
        </div>

        {/* Business Name Input */}
        <div className="space-y-1.5">
          <label htmlFor="business" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
            Business Name
          </label>
          <input
            type="text"
            id="business"
            name="business"
            value={formData.business}
            onChange={handleChange}
            placeholder="e.g. Vance Culinary Brands"
            className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal placeholder-charcoal/45 text-sm outline-none transition-all duration-200"
          />
        </div>

        {/* Email & Phone grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. sophia@brand.com"
              className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal placeholder-charcoal/45 text-sm outline-none transition-all duration-200"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. (727) 899-6434"
              className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal placeholder-charcoal/45 text-sm outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Event Dropdown with exact requested option values */}
        <div className="space-y-1.5">
          <label htmlFor="event" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
            Which event are you interested in?
          </label>
          <div className="relative">
            <select
              id="event"
              name="event"
              value={formData.event}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal text-sm outline-none appearance-none transition-all duration-200"
            >
              <option value="" className="text-charcoal/45">Select an event or general inquiry...</option>
              <option value="Taco & Tequila Street Fiesta — Los Angeles, CA">Taco & Tequila Street Fiesta — Los Angeles, CA</option>
              <option value="Whiskey & BBQ Fest — Miami, FL">Whiskey & BBQ Fest — Miami, FL</option>
              <option value="American Hot Sauce & Spicy Food Expo — Austin, TX">American Hot Sauce & Spicy Food Expo — Austin, TX</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
              <CalendarDays className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Message Textarea */}
        <div className="space-y-1.5">
          <label htmlFor="message" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
            Message / Tell us about your business <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your culinary offerings, setup requirements, social handles, or what makes your heritage brand unique..."
            className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-gold/20 focus:border-forest/50 focus:bg-white text-charcoal placeholder-charcoal/45 text-sm outline-none resize-none transition-all duration-200"
          ></textarea>
        </div>

        {/* Submit Button - Pill-shaped */}
        <button
          type="submit"
          id="contact-submit-btn"
          disabled={loading}
          className="w-full py-4 rounded-full bg-forest hover:bg-forest/95 text-cream font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md shadow-forest/10 flex items-center justify-center space-x-2 cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>TRANSMITTING INQUIRY...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>SUBMIT APPLICATION</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
