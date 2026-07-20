import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowLeft, Send, MessageSquare, User, Building2, HelpCircle, Sparkles, Clock, Headphones, CheckCircle } from 'lucide-react';
import api, { getRecaptchaToken, sendAdminEmail, sendUserEmail } from '../api';

function MeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dot grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
        <defs>
          <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#059669" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      {/* Soft gradient orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#059669]/[0.07] to-transparent blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#047857]/[0.05] to-transparent blur-3xl" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-[#059669]/[0.03] blur-3xl" />
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [newsEmail, setNewsEmail] = useState('');
  const [newsSubmitted, setNewsSubmitted] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState('');
  const newsResetTimer = useRef(null);
  const formResetTimer = useRef(null);

  useEffect(() => () => {
    if (newsResetTimer.current) clearTimeout(newsResetTimer.current);
    if (formResetTimer.current) clearTimeout(formResetTimer.current);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormLoading(true);
    setFormError('');
    try {
      const recaptchaToken = await getRecaptchaToken('contact_form');
      await api.post('/api/consultations', {
        name: formData.name,
        email: formData.email,
        enterprise: formData.company || formData.subject,
        requirements: formData.message,
        recaptchaToken,
      });
      setFormSubmitted(true);
      sendAdminEmail({ from_name: formData.name, from_email: formData.email, message: `Company: ${formData.company || 'N/A'}\nSubject: ${formData.subject || 'N/A'}\n\n${formData.message}` }).catch((e) => console.error('EmailJS admin email failed:', e));
      sendUserEmail({ from_name: formData.name, from_email: formData.email, message: formData.message }).catch((e) => console.error('EmailJS user email failed:', e));
      if (formResetTimer.current) clearTimeout(formResetTimer.current);
      formResetTimer.current = setTimeout(() => { setFormSubmitted(false); setFormData({ name: '', email: '', company: '', subject: '', message: '' }); }, 4000);
    } catch (err) {
      setFormError('Something went wrong. Please try again.');
      setTimeout(() => setFormError(''), 3000);
    } finally {
      setFormLoading(false);
    }
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    if (!newsEmail) return;
    setNewsLoading(true);
    setNewsError('');
    try {
      const recaptchaToken = await getRecaptchaToken('newsletter');
      await api.post('/api/newsletter', { email: newsEmail, recaptchaToken });
      setNewsSubmitted(true);
      sendAdminEmail({ from_name: 'Newsletter Subscriber', from_email: newsEmail, message: 'New newsletter subscription' }).catch((e) => console.error('EmailJS admin email failed:', e));
      sendUserEmail({ from_name: 'Valued Subscriber', from_email: newsEmail, message: 'Thank you for subscribing to Quantionic newsletter!' }).catch((e) => console.error('EmailJS user email failed:', e));
      if (newsResetTimer.current) clearTimeout(newsResetTimer.current);
      newsResetTimer.current = setTimeout(() => { setNewsSubmitted(false); setNewsEmail(''); }, 4000);
    } catch (err) {
      if (err.response?.status === 409) {
        setNewsError('Email already subscribed.');
      } else {
        setNewsError('Something went wrong. Please try again.');
      }
      setTimeout(() => setNewsError(''), 3000);
    } finally {
      setNewsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdf8] via-white to-[#f8fdf9]">
      {/* ── Sticky Navbar ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00A878] flex items-center justify-center text-white font-bold" style={{ filter: 'drop-shadow(0 0 12px rgba(0,168,120,0.15))' }}>
              Q
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-extrabold tracking-tight text-[#111827]">QUAN</span>
              <span className="text-2xl font-medium tracking-tight text-[#00A878]">TIONIC</span>
            </div>
          </Link>
          <Link
            to="/"
            className="flex items-center space-x-2 text-sm font-semibold text-slate-500 hover:text-[#059669] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* ── Hero: Background Image + Copy ──────────────────────────── */}
      <section className="pt-28 pb-20 md:pt-32 md:pb-28 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: 'url(/contact-hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-0" style={{
          background: 'linear-gradient(135deg, rgba(15,41,66,0.88) 0%, rgba(5,150,105,0.75) 50%, rgba(4,120,87,0.85) 100%)',
        }} />
        {/* Subtle pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 0.5px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                Get In Touch
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold tracking-tight text-white font-sans leading-[1.1] mt-6"
            >
              Let's{' '}
              <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                Connect
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-white/60 leading-relaxed text-sm md:text-base max-w-lg mt-5"
            >
                Please fill the form below if you are an Enterprise or Government agency looking for their Digital Transformation. Those interested in careers please email your CV to{' '}
                <span className="text-[#059669] font-semibold">hr@quantionic.com</span>
              </motion.p>

              {/* Feature badges */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                {[
                  { icon: <Clock className="w-4 h-4" />, label: '24h Response' },
                  { icon: <Headphones className="w-4 h-4" />, label: 'Dedicated Support' },
                  { icon: <Sparkles className="w-4 h-4" />, label: 'Enterprise Ready' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white/70 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-white/15 hover:text-white transition-all duration-300"
                  >
                    <span className="text-emerald-300">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </motion.div>

          </div>
        </div>
      </section>

      {/* ── Two Column: Info + Form ─────────────────────────────────────── */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#059669]/[0.02] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left Column – Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0f2942] font-sans leading-tight">
                  Have Questions?
                </h2>
                <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                  Contact our experts to get started in your journey for the Digital Transformation and be Future ready!
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <Phone className="w-5 h-5" />,
                    label: 'Emergency Support? Call Us',
                    value: '+91 98765 43210',
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    label: 'Send Us Mail',
                    value: 'info@quantionic.com',
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    label: 'Find the Office',
                    value: '411, Vipul Trade Centre, Gurugram, Haryana, 122018, India',
                    isAddress: true,
                    link: 'https://maps.app.goo.gl/3BYbCXvbE1PrvGUK6',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="group relative"
                  >
                    <div className="flex items-start gap-5 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-[#059669]/20 transition-all duration-500">
                      {/* Icon with animated ring */}
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#059669] to-[#047857] flex items-center justify-center shadow-lg shadow-[#059669]/25 group-hover:shadow-[#059669]/40 transition-shadow duration-500">
                          <span className="text-white">{item.icon}</span>
                        </div>
                        <div className="absolute -inset-1 rounded-2xl bg-[#059669]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{item.label}</p>
                        {item.isAddress ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#0f2942] leading-relaxed hover:text-[#059669] transition-colors duration-300 underline underline-offset-2 decoration-[#059669]/30 hover:decoration-[#059669]">{item.value}</a>
                        ) : (
                          <p className="text-lg font-bold text-[#0f2942]">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-3 pt-2">
                {['SOC 2 Compliant', 'HIPAA Certified', 'ISO 27001'].map((badge) => (
                  <span key={badge} className="text-[10px] font-bold text-[#059669] bg-[#059669]/8 border border-[#059669]/10 px-3 py-1.5 rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right Column – Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative">
                {/* Multi-layer glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-[#059669]/15 via-[#047857]/5 to-[#059669]/10 rounded-[2rem] blur-2xl opacity-70" />
                <div className="absolute -inset-px bg-gradient-to-br from-white via-slate-100 to-white rounded-[2rem] -z-10" />

                <div className="relative bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-slate-200/50">
                  {/* Form header with accent line */}
                  <div className="mb-8 relative">
                    <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-[#059669] to-[#047857] rounded-full" />
                    <div className="pt-4">
                      <h3 className="text-xl font-bold text-[#0f2942] flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-[#059669]" />
                        Send us a message
                      </h3>
                      <p className="text-sm text-slate-400 mt-1.5">We'll get back to you within 24 hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    {/* Name & Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: 'name', label: 'Name', icon: <User className="w-4 h-4" />, placeholder: 'John Doe', type: 'text' },
                        { id: 'email', label: 'Email', icon: <Mail className="w-4 h-4" />, placeholder: 'john@company.com', type: 'email' },
                      ].map((field) => (
                        <div key={field.id}>
                          <label htmlFor={field.id} className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">{field.label}</label>
                          <div className="relative group">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#059669] transition-colors">{field.icon}</span>
                            <input
                              id={field.id}
                              type={field.type}
                              placeholder={field.placeholder}
                              value={formData[field.id]}
                              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                              className="w-full bg-[#f8fafb] border border-slate-200/80 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#059669]/15 focus:border-[#059669]/50 focus:bg-white transition-all duration-200"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Company & Subject row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: 'company', label: 'Company', icon: <Building2 className="w-4 h-4" />, placeholder: 'Your company', type: 'text' },
                        { id: 'subject', label: 'Subject', icon: <HelpCircle className="w-4 h-4" />, placeholder: 'How can we help?', type: 'text' },
                      ].map((field) => (
                        <div key={field.id}>
                          <label htmlFor={field.id} className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">{field.label}</label>
                          <div className="relative group">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#059669] transition-colors">{field.icon}</span>
                            <input
                              id={field.id}
                              type={field.type}
                              placeholder={field.placeholder}
                              value={formData[field.id]}
                              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                              className="w-full bg-[#f8fafb] border border-slate-200/80 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#059669]/15 focus:border-[#059669]/50 focus:bg-white transition-all duration-200"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Message</label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us about your project or inquiry..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-[#f8fafb] border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#059669]/15 focus:border-[#059669]/50 focus:bg-white transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* reCAPTCHA badge (invisible v3 - no UI needed) */}

                    {/* Submit */}
                    <AnimatePresence mode="wait">
                      {formSubmitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-xl px-6 py-4 flex items-center justify-center gap-3"
                        >
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}>
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          </motion.div>
                          <span className="text-sm font-bold text-emerald-700">Message Sent Successfully!</span>
                        </motion.div>
                      ) : (
                        <motion.button
                          key="submit"
                          type="submit"
                          disabled={formLoading}
                          className={`group w-full relative overflow-hidden text-white text-sm font-bold px-6 py-4 rounded-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2.5 ${
                            !formLoading
                              ? 'bg-gradient-to-r from-[#059669] to-[#047857] hover:shadow-[0_8px_30px_rgba(5,150,105,0.35)] hover:scale-[1.01]'
                              : 'bg-slate-300 cursor-not-allowed'
                          }`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          <span className="relative">{formLoading ? 'Sending...' : 'Send Message'}</span>
                          <Send className="w-4 h-4 relative group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                    {formError && (
                      <p className="text-sm font-semibold text-red-500 text-center mt-2">{formError}</p>
                    )}
                  </form>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Newsletter ──────────────────────────────────────────────────── */}
      <section className="py-14 md:py-24 relative overflow-hidden bg-gradient-to-b from-white via-[#f0fdf8] to-white">
        {/* Wireframe grid pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.06 }}>
            <defs>
              <pattern id="grid-wire" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#059669" strokeWidth="0.5" />
              </pattern>
              <pattern id="grid-wire-lg" x="0" y="0" width="240" height="240" patternUnits="userSpaceOnUse">
                <path d="M 240 0 L 0 0 0 240" fill="none" stroke="#059669" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-wire)" />
            <rect width="100%" height="100%" fill="url(#grid-wire-lg)" />
          </svg>
          {/* Accent orbs */}
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#059669]/[0.06] to-transparent blur-3xl" />
          <div className="absolute bottom-[-15%] right-[-5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-[#047857]/[0.05] to-transparent blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#059669]/[0.02] rounded-full blur-3xl" />
          {/* Diagonal accent lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.03 }}>
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="#059669" strokeWidth="1" />
            <line x1="10%" y1="100%" x2="100%" y2="10%" stroke="#059669" strokeWidth="0.5" />
            <line x1="0" y1="90%" x2="90%" y2="0" stroke="#059669" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center space-y-10 relative">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#059669]/15 text-[#059669] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full"
            >
              <Mail className="w-3.5 h-3.5" />
              Newsletter
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f2942] font-sans">Subscribe to Newsletter</h2>
            <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto">
              Enter your email address to register to our newsletter subscription delivered on regular basis!
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleNewsSubmit}
            className="space-y-5"
          >
            <div className="relative max-w-lg mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#059669]/10 to-[#047857]/10 rounded-2xl blur-lg opacity-50" />
              <div className="relative flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    className="w-full bg-white border border-slate-200/80 rounded-xl pl-10 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#059669]/15 focus:border-[#059669]/50 transition-all duration-200 shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={newsLoading}
                  className={`text-sm font-bold px-8 py-3.5 rounded-xl transition-all duration-300 active:scale-[0.98] shrink-0 ${
                    !newsLoading
                      ? 'bg-gradient-to-r from-[#059669] to-[#047857] hover:from-[#047857] hover:to-[#065f46] text-white hover:shadow-[0_8px_25px_rgba(5,150,105,0.3)]'
                      : 'bg-slate-300 text-white cursor-not-allowed'
                  }`}
                >
                  {newsLoading ? 'Subscribing...' : newsSubmitted ? 'Subscribed!' : 'Subscribe'}
                </button>
              </div>
            </div>

            {/* reCAPTCHA v3 - invisible */}

            <AnimatePresence>
              {newsSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 max-w-sm mx-auto"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-bold text-emerald-700">You're subscribed!</span>
                </motion.div>
              )}
              {newsError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-semibold text-red-500 text-center max-w-sm mx-auto"
                >
                  {newsError}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center justify-center gap-3 pt-2"
          >
            {[
              { label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' },
              { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
              { label: 'Twitter', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
              { label: 'Google', path: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 12H8v-1c0-2 4-3.1 4-3.1s4 1.1 4 3.1v1z' },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="w-11 h-11 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-br hover:from-[#059669] hover:to-[#047857] hover:border-transparent hover:shadow-lg hover:shadow-[#059669]/20 hover:scale-110 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="py-10 bg-[#0f2942] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2942] via-[#132f4c] to-[#0f2942]" />
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#00A878] flex items-center justify-center text-white text-xs font-bold">Q</div>
            <span className="text-sm font-semibold text-white">Quantionic</span>
          </div>
          <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} Quantionic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
