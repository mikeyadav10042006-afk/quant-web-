import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, RefreshCw, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function AdminDashboard({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/admin/data');
      setBookings(response.data.consultations || []);
      setSubscribers(response.data.subscribers || []);
    } catch (err) {
      setError('Could not connect to Node backend server. Showing offline/localStorage fallback data.');
      
      // Load from LocalStorage as fallback
      const localBookings = JSON.parse(localStorage.getItem('quant_bookings') || '[]');
      const localSubs = JSON.parse(localStorage.getItem('quant_subscribers') || '[]');
      
      // Seed default mock if empty
      if (localBookings.length === 0) {
        const mockBookings = [
          {
            _id: 'mock-1',
            name: 'Vikram Mehta',
            email: 'vikram@mehtatech.co',
            enterprise: 'Mehta Tech Ltd',
            requirements: 'Require a secure HIPAA compliant portal and CRM integration for our multi-facility clinic in Mumbai.',
            createdAt: new Date().toISOString()
          },
          {
            _id: 'mock-2',
            name: 'Priya Sharma',
            email: 'priya@quantacapital.in',
            enterprise: 'Quanta Capital',
            requirements: 'Looking to set up a smart trading oracle on Ethereum testnet connected to our real-time valuation API.',
            createdAt: new Date(Date.now() - 86400000).toISOString()
          }
        ];
        setBookings(mockBookings);
        localStorage.setItem('quant_bookings', JSON.stringify(mockBookings));
      } else {
        setBookings(localBookings);
      }

      if (localSubs.length === 0) {
        const mockSubs = [
          { _id: 'sub-1', email: 'director@digitalhealth.org', createdAt: new Date().toISOString() },
          { _id: 'sub-2', email: 'info@cryptosolutions.net', createdAt: new Date(Date.now() - 172800000).toISOString() }
        ];
        setSubscribers(mockSubs);
        localStorage.setItem('quant_subscribers', JSON.stringify(mockSubs));
      } else {
        setSubscribers(localSubs);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          {/* Overlay click */}
          <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl border border-slate-100 z-10 overflow-hidden relative"
          >
            {/* Header */}
            <div className="bg-slate-950 text-white p-6 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center font-bold">
                  QD
                </div>
                <div>
                  <h3 className="font-extrabold text-lg">Quantionic Database Hub</h3>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Admin Dashboard Inspector</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={fetchData}
                  disabled={loading}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 border border-slate-800 transition-colors disabled:opacity-50"
                  title="Refresh Data"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 border border-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Error Notification Alert */}
            {error && (
              <div className="bg-amber-50 border-y border-amber-100 px-6 py-3 flex items-center space-x-2 text-amber-800 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Tabs */}
            <div className="flex bg-slate-50 border-b border-slate-100 px-6 py-3 space-x-4">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'bookings'
                    ? 'bg-white text-teal-600 shadow-sm border border-slate-200/50'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Consultation Bookings ({bookings.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('subscribers')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'subscribers'
                    ? 'bg-white text-teal-600 shadow-sm border border-slate-200/50'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Newsletter Subscribers ({subscribers.length})</span>
              </button>
            </div>

            {/* Table Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 no-scrollbar">
              {loading ? (
                <div className="h-full flex items-center justify-center flex-col space-y-3">
                  <RefreshCw className="w-8 h-8 text-teal-600 animate-spin" />
                  <p className="text-sm text-slate-400 font-bold">Fetching latest submissions...</p>
                </div>
              ) : activeTab === 'bookings' ? (
                bookings.length === 0 ? (
                  <div className="h-full flex items-center justify-center flex-col space-y-2 text-slate-400">
                    <Calendar className="w-12 h-12 text-slate-300" />
                    <p className="text-sm font-bold">No consultation bookings registered yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-left flex flex-col space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-50 pb-3">
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-base">{booking.name}</h4>
                            <p className="text-xs text-slate-400 font-semibold">{booking.email} | {booking.enterprise}</p>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono self-start sm:self-center">
                            {new Date(booking.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Requirements</p>
                          <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100/50">
                            {booking.requirements}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-600 bg-emerald-50 w-fit px-2.5 py-1 rounded-md">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Saved in DB</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : subscribers.length === 0 ? (
                <div className="h-full flex items-center justify-center flex-col space-y-2 text-slate-400">
                  <Mail className="w-12 h-12 text-slate-300" />
                  <p className="text-sm font-bold">No newsletter subscribers yet</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <table className="min-w-full divide-y divide-slate-100 text-left">
                    <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                      <tr>
                        <th className="px-6 py-4">Subscriber Email</th>
                        <th className="px-6 py-4">Subscribed Date</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                      {subscribers.map((sub) => (
                        <tr key={sub._id}>
                          <td className="px-6 py-4 text-slate-900 font-bold">{sub.email}</td>
                          <td className="px-6 py-4 text-xs text-slate-400 font-mono">
                            {new Date(sub.createdAt).toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center space-x-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Active</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Footer summary */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Inspect mode: Read Only</span>
              <span>Quantionic Hub v1.0.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
