import React, { useState, useEffect } from 'react';
import { AuthUser } from '../types';
import { X, Mail, Lock, User, Building, Eye, EyeOff, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'signin' | 'signup';
  onClose: () => void;
  onSuccess: (user: AuthUser, token: string, mode: 'signin' | 'signup') => void;
}

export default function AuthModal({ isOpen, initialMode, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const switchMode = (nextMode: 'signin' | 'signup') => {
    setMode(nextMode);
    setError(null);
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    const trimmedBusiness = businessName.trim();

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (mode === 'signup') {
      if (trimmedName.length < 2) {
        setError('Please enter your full name (at least 2 characters).');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    } else if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/signin';
      const payload =
        mode === 'signup'
          ? {
              name: trimmedName,
              email: trimmedEmail,
              businessName: trimmedBusiness || undefined,
              password,
            }
          : {
              email: trimmedEmail,
              password,
            };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.token || !data?.user) {
        setError(data?.error || 'Authentication failed. Please check your details and try again.');
        setLoading(false);
        return;
      }

      setLoading(false);
      onSuccess(data.user as AuthUser, data.token as string, mode);
    } catch {
      setLoading(false);
      setError('Unable to reach the authentication server. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      id="auth-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white border border-gold/30 shadow-2xl overflow-hidden"
        id="auth-modal-card"
      >
        {/* Top brand bar */}
        <div className="bg-forest px-6 py-5 text-cream flex items-start justify-between border-b border-gold/25">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold block">
              Valerian Events Portal
            </span>
            <h2 id="auth-modal-title" className="font-serif text-2xl font-bold text-cream">
              {mode === 'signin' ? 'Sign In to Your Account' : 'Create Exhibitor Account'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            id="auth-modal-close"
            className="p-1.5 rounded-lg text-cream/70 hover:text-gold hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close authentication modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mode toggle tabs */}
        <div className="px-6 pt-5">
          <div className="grid grid-cols-2 p-1 rounded-xl bg-cream border border-gold/20">
            <button
              type="button"
              id="auth-tab-signin"
              onClick={() => switchMode('signin')}
              className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                mode === 'signin'
                  ? 'bg-forest text-cream shadow-sm'
                  : 'text-charcoal/65 hover:text-forest'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              id="auth-tab-signup"
              onClick={() => switchMode('signup')}
              className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-forest text-cream shadow-sm'
                  : 'text-charcoal/65 hover:text-forest'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4" id="auth-modal-form">
          {error && (
            <div
              className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-start space-x-2"
              id="auth-modal-error"
            >
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'signup' && (
            <>
              <div className="space-y-1.5">
                <label htmlFor="auth-name" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="h-4 w-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="auth-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jordan Rivera"
                    maxLength={80}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream/30 border border-gold/25 focus:border-forest focus:bg-white text-sm text-charcoal placeholder-charcoal/40 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="auth-business" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                  Business / Brand Name <span className="text-charcoal/40 font-normal lowercase">(optional)</span>
                </label>
                <div className="relative">
                  <Building className="h-4 w-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="auth-business"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Coastal Taco Co."
                    maxLength={120}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream/30 border border-gold/25 focus:border-forest focus:bg-white text-sm text-charcoal placeholder-charcoal/40 outline-none transition-all"
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <label htmlFor="auth-email" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="h-4 w-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="auth-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@brand.com"
                maxLength={254}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream/30 border border-gold/25 focus:border-forest focus:bg-white text-sm text-charcoal placeholder-charcoal/40 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="auth-password" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="h-4 w-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'signup' ? 'Minimum 8 characters' : 'Enter your password'}
                minLength={mode === 'signup' ? 8 : 1}
                maxLength={128}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-cream/30 border border-gold/25 focus:border-forest focus:bg-white text-sm text-charcoal placeholder-charcoal/40 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/45 hover:text-forest cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label htmlFor="auth-confirm-password" className="block text-[10px] font-bold tracking-widest uppercase text-forest/80">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="auth-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  minLength={8}
                  maxLength={128}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream/30 border border-gold/25 focus:border-forest focus:bg-white text-sm text-charcoal placeholder-charcoal/40 outline-none transition-all"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            id="auth-modal-submit"
            className="w-full py-3.5 rounded-xl bg-forest hover:bg-forest/95 text-cream font-sans text-xs font-bold tracking-widest uppercase shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-gold" />
                <span>{mode === 'signup' ? 'Creating Account...' : 'Signing In...'}</span>
              </>
            ) : (
              <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
            )}
          </button>

          <div className="pt-2 border-t border-gold/15 flex items-center justify-between text-[11px] text-charcoal/65">
            <span className="inline-flex items-center space-x-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-gold shrink-0" />
              <span>Encrypted session</span>
            </span>
            <button
              type="button"
              onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-forest font-bold hover:text-gold transition-colors cursor-pointer"
            >
              {mode === 'signin' ? 'Need an account? Sign Up' : 'Already registered? Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
