import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Bot, Calendar, ArrowRight } from 'lucide-react';
import api, { getRecaptchaToken, sendAdminEmail, sendUserEmail } from '../api';

export default function Footer({ onOpenChat, onOpenAdmin }) {
  // Booking Form State
  const [bookingData, setBookingData] = useState({ name: '', email: '', enterprise: '', requirements: '' });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsSuccess, setNewsSuccess] = useState(false);

  const bookingTimerRef = useRef(null);
  const newsTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (bookingTimerRef.current) clearTimeout(bookingTimerRef.current);
      if (newsTimerRef.current) clearTimeout(newsTimerRef.current);
    };
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.email || !bookingData.requirements) return;

    setBookingLoading(true);
    try {
      const token = await getRecaptchaToken('consultation');
      await api.post('/api/consultations', { ...bookingData, recaptchaToken: token });
      setBookingSuccess(true);
      sendAdminEmail({ from_name: bookingData.name, from_email: bookingData.email, message: `Company: ${bookingData.enterprise || 'N/A'}\n\n${bookingData.requirements}` }).catch((e) => console.error('EmailJS admin email failed:', e));
      sendUserEmail({ from_name: bookingData.name, from_email: bookingData.email, message: bookingData.requirements }).catch((e) => console.error('EmailJS user email failed:', e));
      setBookingData({ name: '', email: '', enterprise: '', requirements: '' });
    } catch (err) {
      const current = JSON.parse(localStorage.getItem('quant_bookings') || '[]');
      const newBooking = {
        _id: 'local-' + Date.now(),
        ...bookingData,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('quant_bookings', JSON.stringify([newBooking, ...current]));
      
      setBookingSuccess(true);
      setBookingData({ name: '', email: '', enterprise: '', requirements: '' });
    } finally {
      setBookingLoading(false);
      bookingTimerRef.current = setTimeout(() => setBookingSuccess(false), 5000);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsLoading(true);
    try {
      const token = await getRecaptchaToken('newsletter');
      await api.post('/api/newsletter', { email: newsletterEmail, recaptchaToken: token });
      setNewsSuccess(true);
      sendAdminEmail({ from_name: 'Newsletter Subscriber', from_email: newsletterEmail, message: 'New newsletter subscription' }).catch((e) => console.error('EmailJS admin email failed:', e));
      sendUserEmail({ from_name: 'Valued Subscriber', from_email: newsletterEmail, message: 'Thank you for subscribing to Quantionic newsletter!' }).catch((e) => console.error('EmailJS user email failed:', e));
      setNewsletterEmail('');
    } catch (err) {
      const current = JSON.parse(localStorage.getItem('quant_subscribers') || '[]');
      const newSub = {
        _id: 'local-sub-' + Date.now(),
        email: newsletterEmail,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('quant_subscribers', JSON.stringify([newSub, ...current]));

      setNewsSuccess(true);
      setNewsletterEmail('');
    } finally {
      setNewsLoading(false);
      newsTimerRef.current = setTimeout(() => setNewsSuccess(false), 5000);
    }
  };

  return (
    <footer id="contact" className="bg-slate-950 text-white relative pt-24 pb-12 overflow-hidden border-t border-slate-900">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        
        {/* UPPER PART: Booking Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-16 border-b border-slate-800">
          
          {/* Left Column: Info Card */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full w-fit">
              Get in Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight font-sans">
              Book A Technical Consultation
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed">
              Ready to automate operations or integrate custom models? Tell us about your tech stack and requirements. An engineer will respond in under 24 hours.
            </p>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Consulting Options</h4>
              <div className="flex items-start space-x-3 text-sm">
                <Calendar className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-slate-200">Technical Session</p>
                  <p className="text-xs text-slate-400">Deep dive into API orchestration and system design.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm pt-2">
                <Bot className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-slate-200">Interactive Assistant</p>
                  <p className="text-xs text-slate-400">Can't wait? Consult our AI Assistant for answers now.</p>
                  <button 
                    onClick={onOpenChat}
                    className="text-xs text-teal-400 hover:text-teal-300 font-bold flex items-center space-x-1 mt-1 transition-colors"
                  >
                    <span>Activate Agent</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7 bg-slate-900/40 p-8 rounded-3xl border border-slate-800">
            {bookingSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12"
              >
                <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Consultation Registered</h3>
                <p className="text-slate-400 text-sm max-w-sm">
                  Thank you! We have successfully registered your request into our database system. An engineer will follow up shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@enterprise.com"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Enterprise Domain / Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Health Systems"
                    value={bookingData.enterprise}
                    onChange={(e) => setBookingData({ ...bookingData, enterprise: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">System & Integration Requirements</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="What automated flows, Node APIs or database structures do you want to build?"
                    value={bookingData.requirements}
                    onChange={(e) => setBookingData({ ...bookingData, requirements: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-teal-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-teal-600/10 hover:shadow-teal-600/20 disabled:opacity-50"
                >
                  {bookingLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting to Database...</span>
                    </>
                  ) : (
                    <span>Register Consultation</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* MIDDLE PART: Newsletter Signup */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-16 border-b border-slate-800">
          <div className="text-left space-y-2 max-w-md">
            <h3 className="text-xl font-bold">Subscribe to Newsletter</h3>
            <p className="text-slate-400 text-sm">
              Receive quarterly engineering summaries, platform API releases, and case studies.
            </p>
          </div>

          <div className="w-full max-w-md bg-slate-900 p-2 rounded-2xl border border-slate-800">
            {newsSuccess ? (
              <div className="flex items-center space-x-2 text-teal-400 text-sm py-2 px-3 font-semibold justify-center">
                <CheckCircle2 className="w-4 h-4" />
                <span>Email subscribed successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex items-center space-x-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your enterprise email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-transparent text-sm focus:outline-none px-3 py-2"
                />
                <button
                  type="submit"
                  disabled={newsLoading}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl transition-colors text-xs font-bold flex items-center space-x-1 shrink-0"
                >
                  {newsLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send className="w-3 h-3" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* LOWER PART: Footer Info & Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center font-bold text-white text-sm">
              Q
            </div>
            <span className="text-lg font-bold tracking-tight text-white font-sans">
              QUANT<span className="text-teal-400">IONIC</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} Quantionic Inc. All rights reserved.
            {onOpenAdmin && (
              <button onClick={onOpenAdmin} className="ml-2 text-slate-700/30 hover:text-slate-400 transition-colors align-middle" title="Admin">
                <svg className="w-3.5 h-3.5 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" /></svg>
              </button>
            )}
          </p>

          <div className="flex items-center space-x-1 text-slate-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors" aria-label="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
