import React, { useState } from 'react';
import { X, Lock, Mail, Eye, EyeOff, ShieldCheck, KeyRound, AlertCircle, Loader2 } from 'lucide-react';
import { loginAdmin } from '../../services/courseApi';
import { AdminAuthResponse } from '../../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (auth: AdminAuthResponse) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('admin@learnwithaida.com');
  const [password, setPassword] = useState('AidaAdmin2026!Secure');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please provide both administrator email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const auth = await loginAdmin(email.trim(), password.trim(), rememberMe);
      setIsLoading(false);
      onSuccess(auth);
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6 sm:p-8 min-w-0"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <Lock className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
              Protected Area
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              AIDA Admin Portal
            </h2>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-sm text-slate-300 font-normal leading-relaxed mb-6">
          Sign in to access the administrator dashboard, manage courses, control publication status, and update curriculum in the database.
        </p>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-sm flex items-start gap-2.5">
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@learnwithaida.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors text-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-300 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 text-cyan-400 focus:ring-0 bg-slate-950"
              />
              <span>Remember session</span>
            </label>
            <span className="text-slate-400 text-xs">Protected with HTTPS</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-60 rounded-xl transition-all cursor-pointer shadow-lg shadow-cyan-950/50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-5 w-5" />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Development Helper Badge */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1 leading-relaxed">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-300">Default Admin Credentials:</span>
            <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 font-bold text-[10px]">Ready</span>
          </div>
          <div>Email: <code className="text-cyan-300 font-mono">admin@learnwithaida.com</code></div>
          <div>Password: <code className="text-cyan-300 font-mono">AidaAdmin2026!Secure</code></div>
          <div className="text-[11px] text-slate-400 pt-1">
            Credentials can be customized in the server environment variables (<code className="text-slate-300">ADMIN_EMAIL</code>, <code className="text-slate-300">ADMIN_PASSWORD</code>).
          </div>
        </div>
      </div>
    </div>
  );
};
