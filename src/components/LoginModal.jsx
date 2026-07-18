import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import api from '../api';

export default function LoginModal({ isOpen, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/api/auth/login', { email, password }, { timeout: 10000 });
      if (!res.data || !res.data.token) {
        setError('Invalid response from server. Please try again.');
        setLoading(false);
        return;
      }
      localStorage.setItem('quant_token', res.data.token);
      localStorage.setItem('quant_user', JSON.stringify(res.data.user));
      onSuccess(res.data.user, res.data.token);
    } catch (err) {
      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        setError('Server is not responding. Please ensure the backend is running.');
      } else if (err.code === 'ERR_NETWORK' || !err.response) {
        setError('Cannot connect to server. Backend may be offline.');
      } else {
        setError(err.response?.data?.error || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="absolute inset-0 cursor-pointer" onClick={handleClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-slate-100 z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-950 text-white p-6 text-center relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center font-bold text-lg mx-auto mb-3">
                Q
              </div>
              <h3 className="font-extrabold text-lg">Admin Access</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Quantionic Dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="p-6 space-y-4" autoComplete="off">
              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center space-x-2 text-red-700 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@quantionic.com"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <span>Sign In</span>
                )}
              </button>

              <p className="text-center text-[10px] text-slate-400 font-medium pt-1">
                Authorized personnel only. Unauthorized access is prohibited.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
