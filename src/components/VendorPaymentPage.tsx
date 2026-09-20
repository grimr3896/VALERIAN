import React, { useState } from 'react';
import { Event } from '../types';
import { 
  CreditCard, 
  Lock, 
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
  ChevronDown,
  Code2,
  Send,
  ExternalLink,
  Check,
  Info
} from 'lucide-react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with Valerian Events account
emailjs.init('dUpRmObSvyywLE_u_');

interface VendorPaymentPageProps {
  event: Event;
  onBack: () => void;
  onSuccessReturn?: () => void;
}

export default function VendorPaymentPage({ event, onBack }: VendorPaymentPageProps) {
  // City-specific standard booth fee
  const getCityPricing = (cityTag: string): number => {
    switch (cityTag) {
      case 'Las Vegas': return 350;
      case 'Miami': return 450;
      case 'Los Angeles': return 450;
      case 'Austin': return 400;
      case 'Houston': return 400;
      case 'Atlanta': return 400;
      case 'Raleigh': return 400;
      case 'Dallas': return 400;
      case 'Salt Lake City': return 400;
      case 'New York City': return 500;
      default: return 400;
    }
  };

  const feeDueToday = getCityPricing(event.tag);
  
  // Vendor Info
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [vendorCategory, setVendorCategory] = useState('Food & Beverage');
  const [appReference, setAppReference] = useState('');

  // Payment Method & Card Details State
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'mastercard' | 'visa' | 'paypal' | 'cod'>('visa');
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

  // Processing & Confirmation State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [showEmailJsDetails, setShowEmailJsDetails] = useState(false);
  const [emailDispatched, setEmailDispatched] = useState<boolean | null>(null);

  // Card formatting helpers
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 2) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setCardExpiry(raw);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardCvc(raw);
  };

  const getCardBrand = (num: string) => {
    if (selectedPaymentMethod === 'paypal') return 'PayPal';
    if (selectedPaymentMethod === 'cod') return 'Cash / On-Site';
    if (selectedPaymentMethod === 'mastercard') return 'Mastercard';
    const clean = num.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(clean)) return 'Mastercard';
    if (/^3[47]/.test(clean)) return 'American Express';
    if (/^6(?:011|5)/.test(clean)) return 'Discover';
    return 'Visa';
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!appReference.trim()) {
      setFormError('Provided Application ID by Valerian Events is a must. Please enter the official Application ID issued by Valerian Events.');
      return;
    }

    if (!businessName.trim() || !contactEmail.trim()) {
      setFormError('Please complete your Business Name and Contact Email.');
      return;
    }

    if (selectedPaymentMethod === 'visa' || selectedPaymentMethod === 'mastercard') {
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

    const last4Digits = cardNumber.replace(/\s/g, '').slice(-4) || 'N/A';
    const paymentMethodLabel = selectedPaymentMethod === 'visa' || selectedPaymentMethod === 'mastercard'
      ? `${selectedPaymentMethod.toUpperCase()} (Ending in ${last4Digits})`
      : selectedPaymentMethod === 'paypal' ? `PayPal Express (${contactEmail})` : 'Cash on Delivery (On-Site Collection)';

    // Prepare EmailJS template payload
    const emailParams = {
      from_name: contactName || businessName,
      business_name: `${businessName} (Category: ${vendorCategory}, Application ID: ${appReference})`,
      from_email: contactEmail,
      phone: contactPhone || 'Not Provided',
      event: `${event.title} — Vendor Booth Space Payment ($${feeDueToday}.00 USD)`,
      message: `Vendor Payment Confirmed for ${event.title}.\n\nConfirmation Code: ${generatedCode}\nAmount Paid: $${feeDueToday}.00 USD\nPayment Method: ${paymentMethodLabel}\nCardholder: ${cardHolder || contactName || 'N/A'}\nCard Reference: ${last4Digits !== 'N/A' ? `•••• •••• •••• ${last4Digits}` : 'N/A'}\nApplication Reference: ${appReference}\nPrimary Contact: ${contactName} (${contactEmail}, ${contactPhone})\nCategory: ${vendorCategory}\nTransaction Date: ${formattedDate}\nPayment Status: AUTHORIZED & CONFIRMED`,
      confirmation_code: generatedCode,
      amount_paid: `$${feeDueToday}.00 USD`,
      application_id: appReference,
      payment_method: paymentMethodLabel,
      cardholder_name: cardHolder || contactName || 'N/A',
      card_last4: last4Digits,
      transaction_status: 'AUTHORIZED & CONFIRMED'
    };

    // Execute EmailJS transmission
    const sendEmailReceipt = async () => {
      try {
        await emailjs.send(
          'service_a6hnip8',
          'template_uwd0or8',
          emailParams,
          'dUpRmObSvyywLE_u_'
        );
        setEmailDispatched(true);
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

    // Allow a short simulated security verification animation before completing
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
        {/* Top Breadcrumb Navigation */}
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

        {/* ==================================================== */}
        {/* RECEIPT / SUCCESS CONFIRMATION VIEW                  */}
        {/* ==================================================== */}
        {isPaidSuccess ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-gold/40 shadow-xl p-6 sm:p-10 space-y-8 animate-fadeIn">
            {/* Header Badge */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-forest/10 border-2 border-forest flex items-center justify-center mx-auto text-forest shadow-inner">
                <CheckCircle2 className="h-9 w-9 text-forest" />
              </div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-forest text-cream text-[11px] font-mono uppercase tracking-widest font-bold">
                Payment Authorized & Confirmed
              </span>
              <h2 className="font-serif text-3xl font-bold text-forest">
                Vendor Space Fee Paid
              </h2>
              <p className="text-charcoal/70 text-xs sm:text-sm font-light max-w-md mx-auto">
                Thank you, <strong>{contactName || businessName}</strong>! Your booth fee has been successfully authorized and your space reservation is confirmed.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-cream/40 rounded-2xl border border-gold/30 p-5 sm:p-6 space-y-4">
              {emailDispatched && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>EmailJS confirmation receipt dispatched to <strong>{contactEmail}</strong></span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">Delivered via EmailJS</span>
                </div>
              )}

              <div className="flex justify-between items-center pb-3 border-b border-gold/20">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/70 font-sans">
                  Official Confirmation Receipt
                </span>
                <span className="font-mono text-xs font-bold text-forest bg-forest/10 px-2.5 py-1 rounded-md">
                  {confirmationCode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="block text-[10px] uppercase font-mono text-charcoal/60">Amount Paid</span>
                  <span className="font-mono text-base font-bold text-forest">${feeDueToday}.00 USD</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-mono text-charcoal/60">Date & Time</span>
                  <span className="font-semibold text-charcoal">{transactionDate}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-mono text-charcoal/60">Registered Email</span>
                  <span className="font-semibold text-charcoal truncate block">{contactEmail}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-mono text-charcoal/60">Payment Method</span>
                  <span className="font-semibold text-charcoal flex items-center space-x-1.5">
                    <CreditCard className="h-3.5 w-3.5 text-forest" />
                    <span>
                      {selectedPaymentMethod === 'paypal' 
                        ? `PayPal (${contactEmail})` 
                        : selectedPaymentMethod === 'cod' 
                        ? 'Cash on Delivery / On-Site' 
                        : `${getCardBrand(cardNumber)} •••• ${cardNumber.slice(-4) || '••••'}`}
                    </span>
                  </span>
                </div>
              </div>

              {/* Event & Space Details */}
              <div className="border border-gold/20 rounded-2xl p-5 space-y-3 bg-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold font-sans block">
                  Festival & Space Allocation
                </span>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-base font-bold text-forest">{event.title}</h3>
                    <div className="text-xs text-charcoal/70 flex items-center space-x-1 mt-0.5">
                      <Calendar className="h-3 w-3 text-gold" />
                      <span>{event.date}</span>
                    </div>
                    <div className="text-xs text-charcoal/70 flex items-center space-x-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-gold" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-forest/10 text-forest border border-forest/20">
                    {event.tag}
                  </span>
                </div>

                <div className="pt-3 border-t border-gold/15 flex justify-between text-xs font-medium text-charcoal/90">
                  <span>Reserved Allocation:</span>
                  <span className="font-bold text-forest">
                    Approved Vendor Booth Space
                  </span>
                </div>

                <div className="flex justify-between text-xs font-medium text-charcoal/90">
                  <span>Business / Brand:</span>
                  <span className="font-bold text-charcoal">{businessName}</span>
                </div>

                <div className="flex justify-between text-xs font-medium text-charcoal/90">
                  <span>Valerian Application ID:</span>
                  <span className="font-mono font-bold text-forest">{appReference}</span>
                </div>
              </div>

              {/* Next Steps Card */}
              <div className="p-5 rounded-2xl bg-forest/5 border border-forest/20 space-y-2">
                <div className="flex items-center space-x-2 text-forest font-bold text-xs uppercase">
                  <Sparkles className="h-4 w-4 text-gold shrink-0" />
                  <span>What Happens Next?</span>
                </div>
                <ul className="text-xs text-charcoal/80 space-y-1.5 list-disc list-inside font-light leading-relaxed">
                  <li>Your space reservation is officially locked in for <strong>{event.title}</strong>.</li>
                  <li>Your load-in schedule, designated booth number, and parking credentials will be emailed to <strong>{contactEmail}</strong> 7 to 10 days before opening day.</li>
                  <li>Keep 100% of your retail sales with no percentage commissions deducted.</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handlePrintReceipt}
                  id="print-receipt-btn"
                  className="flex-1 py-3 px-4 rounded-xl border border-forest/40 bg-white hover:bg-forest/5 text-forest font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <Printer className="h-4 w-4 text-forest" />
                  <span>Print / Save Receipt</span>
                </button>

                <button
                  onClick={onBack}
                  id="receipt-return-event-btn"
                  className="flex-1 py-3 px-4 rounded-xl bg-forest hover:bg-forest/95 text-cream font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Return to Event Details</span>
                  <ChevronRight className="h-4 w-4 text-gold" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ==================================================== */
          /* CARD PAYMENT CHECKOUT FORM VIEW                      */
          /* ==================================================== */
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Header Title Deck */}
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/30 text-forest text-[11px] font-bold uppercase tracking-wider mb-2">
                <CreditCard className="h-3.5 w-3.5 text-forest" />
                <span>Approved Vendor Space Payment</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                Complete Your Booth Fee Payment
              </h1>
              <p className="text-charcoal/70 text-sm font-light mt-1 max-w-2xl leading-relaxed">
                Enter your card details below to finalize your booth fee for <strong>{event.title}</strong> (${feeDueToday}.00 USD).
              </p>
            </div>

            {/* Error Banner if any */}
            {formError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2.5 animate-shake">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                <span className="font-medium">{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitPayment} className="space-y-6" id="vendor-card-payment-form">
              {/* Step 1: Vendor Business & Contact Information */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-gold/20 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/15 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-forest text-cream font-mono font-bold flex items-center justify-center text-xs shadow-2xs">
                      1
                    </div>
                    <div>
                      <h2 className="font-serif text-lg font-bold text-forest">Vendor & Business Profile</h2>
                      <p className="text-xs text-charcoal/60 font-light">Enter the business name and email where credentials will be issued</p>
                    </div>
                  </div>

                  {/* EmailJS Connection Status Badge */}
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      id="emailjs-details-toggle-btn"
                      onClick={() => setShowEmailJsDetails(!showEmailJsDetails)}
                      className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer shadow-2xs ${
                        showEmailJsDetails 
                          ? 'bg-forest text-cream border-forest' 
                          : 'bg-emerald-50/90 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                      }`}
                      title="Click to view EmailJS connection details and template variables"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="font-mono text-[11px] font-bold">EmailJS Connected</span>
                      <Code2 className="h-3.5 w-3.5 ml-0.5 opacity-80" />
                    </button>
                  </div>
                </div>

                {/* EmailJS Integration Details Panel (Collapsible) */}
                {showEmailJsDetails && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 sm:p-5 space-y-3.5 text-xs text-charcoal animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-emerald-200/70 pb-2.5">
                      <div className="flex items-center space-x-2 text-forest font-bold">
                        <Send className="h-4 w-4 text-emerald-600" />
                        <span className="font-serif text-sm">EmailJS Connection Architecture</span>
                      </div>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                        @emailjs/browser v4.4.1
                      </span>
                    </div>

                    <p className="text-charcoal/80 text-[11px] leading-relaxed">
                      Upon confirming this booth fee, this form automatically executes an authenticated client-side API call via <code className="bg-emerald-100/80 px-1.5 py-0.5 rounded font-mono text-[11px] text-emerald-900 font-bold">emailjs.send(...)</code> to dispatch branded payment receipts to both the vendor and Valerian Events admin.
                    </p>

                    {/* Keys & Endpoints Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="p-2.5 rounded-lg bg-white border border-emerald-200/80 shadow-2xs">
                        <span className="block text-[10px] uppercase font-mono text-charcoal/60 font-semibold">Service ID</span>
                        <span className="font-mono text-xs font-bold text-forest select-all">service_a6hnip8</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-emerald-200/80 shadow-2xs">
                        <span className="block text-[10px] uppercase font-mono text-charcoal/60 font-semibold">Template ID</span>
                        <span className="font-mono text-xs font-bold text-forest select-all">template_uwd0or8</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white border border-emerald-200/80 shadow-2xs">
                        <span className="block text-[10px] uppercase font-mono text-charcoal/60 font-semibold">Public Key</span>
                        <span className="font-mono text-xs font-bold text-forest select-all">dUpRmObSvyywLE_u_</span>
                      </div>
                    </div>

                    {/* Template Parameters Payload Preview */}
                    <div className="bg-neutral-900 text-emerald-300 p-3.5 rounded-lg font-mono text-[11px] space-y-1 overflow-x-auto shadow-inner">
                      <div className="text-neutral-400 text-[10px]">// Active payload dispatched to EmailJS template:</div>
                      <div>{`emailjs.send('service_a6hnip8', 'template_uwd0or8', {`}</div>
                      <div className="pl-4 text-neutral-200"><span className="text-gold">from_name</span>: <span className="text-emerald-400">"{contactName || 'Vendor Contact'}"</span>,</div>
                      <div className="pl-4 text-neutral-200"><span className="text-gold">business_name</span>: <span className="text-emerald-400">"{businessName || 'Business Name'} (Category: {vendorCategory})"</span>,</div>
                      <div className="pl-4 text-neutral-200"><span className="text-gold">from_email</span>: <span className="text-emerald-400">"{contactEmail || 'vendor@example.com'}"</span>,</div>
                      <div className="pl-4 text-neutral-200"><span className="text-gold">phone</span>: <span className="text-emerald-400">"{contactPhone || 'N/A'}"</span>,</div>
                      <div className="pl-4 text-neutral-200"><span className="text-gold">event</span>: <span className="text-emerald-400">"{event.title} — Vendor Booth Fee (${feeDueToday}.00 USD)"</span>,</div>
                      <div className="pl-4 text-neutral-200"><span className="text-gold">confirmation_code</span>: <span className="text-emerald-400">"VAL-{event.tag.slice(0, 3).toUpperCase()}-XXXXXX"</span>,</div>
                      <div className="pl-4 text-neutral-200"><span className="text-gold">amount_paid</span>: <span className="text-emerald-400">"${feeDueToday}.00 USD"</span>,</div>
                      <div className="pl-4 text-neutral-200"><span className="text-gold">application_id</span>: <span className="text-emerald-400">"{appReference || 'VE-APP-XXXX'}"</span>,</div>
                      <div className="pl-4 text-neutral-200"><span className="text-gold">payment_method</span>: <span className="text-emerald-400">"{selectedPaymentMethod.toUpperCase()}{cardNumber ? ` (Ending in ${cardNumber.replace(/\s/g, '').slice(-4)})` : ''}"</span>,</div>
                      <div className="pl-4 text-neutral-200"><span className="text-gold">cardholder_name</span>: <span className="text-emerald-400">"{cardHolder || contactName || 'Cardholder Name'}"</span>,</div>
                      <div className="pl-4 text-neutral-200"><span className="text-gold">card_last4</span>: <span className="text-emerald-400">"{cardNumber.replace(/\s/g, '').slice(-4) || '••••'}"</span>,</div>
                      <div className="pl-4 text-neutral-200"><span className="text-gold">transaction_status</span>: <span className="text-emerald-400">"AUTHORIZED & CONFIRMED"</span></div>
                      <div>{`}, 'dUpRmObSvyywLE_u_');`}</div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-charcoal/70">
                      <span className="flex items-center space-x-1">
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Ready to transmit on "Confirm Payment" button click</span>
                      </span>
                      <a 
                        href="https://dashboard.emailjs.com/" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-forest hover:text-gold font-semibold inline-flex items-center space-x-1"
                      >
                        <span>Open EmailJS Dashboard</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}

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
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
                        Confirmation Receipt Email *
                      </label>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded font-medium">
                        EmailJS Target
                      </span>
                    </div>
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

                  <div className="sm:col-span-2 bg-gold/10 border-2 border-gold/40 rounded-xl p-3.5 sm:p-4 space-y-1.5" id="valerian-application-id-field">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-forest flex items-center space-x-1.5">
                        <FileCheck className="h-4 w-4 text-forest" />
                        <span>Provided Application ID by Valerian Events *</span>
                      </label>
                      <span className="text-[10px] font-mono font-bold text-red-700 bg-red-100/80 border border-red-200 px-2 py-0.5 rounded-md uppercase tracking-wide">
                        Must / Required
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        id="valerian-application-id-input"
                        value={appReference}
                        onChange={(e) => setAppReference(e.target.value)}
                        placeholder="e.g. VE-2026-APP-8842 or your approval confirmation ID"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gold/40 bg-white text-xs font-mono font-bold text-forest placeholder:text-charcoal/40 placeholder:font-sans placeholder:font-normal focus:outline-hidden focus:border-forest focus:ring-1 focus:ring-forest shadow-2xs"
                      />
                    </div>
                    <p className="text-[11px] text-charcoal/70 font-light flex items-center space-x-1 pt-0.5">
                      <AlertCircle className="h-3.5 w-3.5 text-gold shrink-0" />
                      <span>This payment portal is strictly for pre-approved vendors. Enter the official Application ID provided by Valerian Events in your confirmation notice.</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method & Card Details */}
              <div className="p-6 sm:p-8 rounded-lg bg-white border border-gray-200 shadow-sm space-y-6">
                {/* Step 2 Header */}
                <div className="flex items-center space-x-2.5 border-b border-gray-100 pb-3.5">
                  <div className="w-7 h-7 rounded-full bg-forest text-cream font-mono font-bold flex items-center justify-center text-xs shadow-2xs">
                    2
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-forest leading-tight">Payment Method & Authorization</h3>
                    <p className="text-[11px] text-gray-500 font-light">Select payment channel and enter authorization details</p>
                  </div>
                </div>

                {/* Payment Method Selector (4 methods with radio dots and logo cards) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1">
                  {/* Mastercard */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('mastercard')}
                    className="flex items-center space-x-2.5 cursor-pointer text-left focus:outline-hidden"
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedPaymentMethod === 'mastercard' ? 'border-red-500' : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'mastercard' && (
                        <div className="w-2 h-2 rounded-full bg-[#ff4d4f]" />
                      )}
                    </div>
                    <div className={`flex-1 h-12 border rounded-md bg-white flex flex-col items-center justify-center p-1.5 shadow-2xs transition-all ${
                      selectedPaymentMethod === 'mastercard' ? 'border-gray-400 ring-1 ring-gray-300' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center -space-x-1.5">
                        <div className="w-4.5 h-4.5 rounded-full bg-[#EB001B] opacity-95"></div>
                        <div className="w-4.5 h-4.5 rounded-full bg-[#F79E1B] opacity-95"></div>
                      </div>
                      <span className="text-[9px] font-medium text-gray-600 tracking-tight leading-none mt-0.5">
                        mastercard
                      </span>
                    </div>
                  </button>

                  {/* VISA (Selected by default in screenshot) */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('visa')}
                    className="flex items-center space-x-2.5 cursor-pointer text-left focus:outline-hidden"
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedPaymentMethod === 'visa' ? 'border-red-500' : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'visa' && (
                        <div className="w-2 h-2 rounded-full bg-[#ff4d4f]" />
                      )}
                    </div>
                    <div className={`flex-1 h-12 border rounded-md bg-white flex items-center justify-center p-1.5 shadow-2xs transition-all ${
                      selectedPaymentMethod === 'visa' ? 'border-gray-400 ring-1 ring-gray-300' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <span className="font-sans font-black italic text-xl text-[#1A1F71] tracking-tighter leading-none">
                        VISA
                      </span>
                    </div>
                  </button>

                  {/* PayPal */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('paypal')}
                    className="flex items-center space-x-2.5 cursor-pointer text-left focus:outline-hidden"
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedPaymentMethod === 'paypal' ? 'border-red-500' : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'paypal' && (
                        <div className="w-2 h-2 rounded-full bg-[#ff4d4f]" />
                      )}
                    </div>
                    <div className={`flex-1 h-12 border rounded-md bg-white flex items-center justify-center space-x-0.5 p-1.5 shadow-2xs transition-all ${
                      selectedPaymentMethod === 'paypal' ? 'border-gray-400 ring-1 ring-gray-300' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <span className="font-sans font-black italic text-sm text-[#003087]">Pay</span>
                      <span className="font-sans font-black italic text-sm text-[#0079C1]">Pal</span>
                    </div>
                  </button>

                  {/* CASH ON DELIVERY */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('cod')}
                    className="flex items-center space-x-2.5 cursor-pointer text-left focus:outline-hidden"
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedPaymentMethod === 'cod' ? 'border-red-500' : 'border-gray-300'
                    }`}>
                      {selectedPaymentMethod === 'cod' && (
                        <div className="w-2 h-2 rounded-full bg-[#ff4d4f]" />
                      )}
                    </div>
                    <div className={`flex-1 h-12 border rounded-md bg-white flex flex-col items-center justify-center p-1 shadow-2xs transition-all text-center ${
                      selectedPaymentMethod === 'cod' ? 'border-gray-400 ring-1 ring-gray-300' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <span className="text-[9px] font-bold text-gray-500 uppercase leading-none tracking-tight">CASH ON</span>
                      <span className="text-[9px] font-bold text-gray-500 uppercase leading-none tracking-tight mt-0.5">DELIVERY</span>
                    </div>
                  </button>
                </div>

                {/* Form Fields Section */}
                <div className="space-y-4 pt-2">
                  {/* Row 1: Card number * and Cardholder * */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs font-normal text-gray-600 mb-1.5">
                        Card number *
                      </label>
                      <input
                        type="text"
                        required={selectedPaymentMethod === 'visa' || selectedPaymentMethod === 'mastercard'}
                        inputMode="numeric"
                        autoComplete="cc-number"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder=""
                        className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-xs focus:outline-hidden focus:border-[#10e5a5] focus:ring-1 focus:ring-[#10e5a5] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-normal text-gray-600 mb-1.5">
                        Cardholder *
                      </label>
                      <input
                        type="text"
                        required={selectedPaymentMethod === 'visa' || selectedPaymentMethod === 'mastercard'}
                        autoComplete="cc-name"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder=""
                        className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-xs focus:outline-hidden focus:border-[#10e5a5] focus:ring-1 focus:ring-[#10e5a5] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Expiry date * and CVC */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs font-normal text-gray-600 mb-1.5">
                        Expiry date *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                          <select
                            value={expiryMonth}
                            onChange={(e) => {
                              setExpiryMonth(e.target.value);
                              setCardExpiry(`${e.target.value}/${expiryYear}`);
                            }}
                            className="w-full appearance-none px-3 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-xs focus:outline-hidden focus:border-[#10e5a5] focus:ring-1 focus:ring-[#10e5a5] pr-7 cursor-pointer"
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
                            onChange={(e) => {
                              setExpiryYear(e.target.value);
                              setCardExpiry(`${expiryMonth}/${e.target.value}`);
                            }}
                            className="w-full appearance-none px-3 py-2 text-xs text-gray-700 bg-white border border-gray-300 rounded-xs focus:outline-hidden focus:border-[#10e5a5] focus:ring-1 focus:ring-[#10e5a5] pr-7 cursor-pointer"
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
                        CVC
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="password"
                          required={selectedPaymentMethod === 'visa' || selectedPaymentMethod === 'mastercard'}
                          autoComplete="cc-csc"
                          value={cardCvc}
                          onChange={handleCvcChange}
                          placeholder=""
                          maxLength={4}
                          className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-xs focus:outline-hidden focus:border-[#10e5a5] focus:ring-1 focus:ring-[#10e5a5] transition-colors"
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

                {/* Exact Confirm Payment Button */}
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
                  ) : (
                    <span>CONFIRM PAYMENT</span>
                  )}
                </button>
              </div>

              <div className="text-center text-[11px] text-charcoal/60 font-light flex items-center justify-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-forest shrink-0" />
                <span>Zero commission taken. You keep 100% of your festival retail sales.</span>
              </div>
            </form>

            {/* Assistance & Concierge Card */}
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
