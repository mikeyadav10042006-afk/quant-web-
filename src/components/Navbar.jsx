import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bot, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenChat }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled((prev) => {
            const next = window.scrollY > 20;
            return prev === next ? prev : next;
          });
          ticking = false;
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { name: 'Home', href: '/', isRoute: true },
    { name: 'Services', href: '#services', scrollTo: 'services' },
    { name: 'Contact', href: '/contact', isRoute: true },
    { name: 'Team', href: '#team', scrollTo: 'team' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm bg-white/30 border-b border-green-500/20 ${scrolled ? 'shadow-md py-3' : 'py-5'}`}        
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-[#00A878] flex items-center justify-center text-white font-bold" style={{ filter: 'drop-shadow(0 0 12px rgba(0,168,120,0.15))' }}>
                Q
              </div>
            <div className="flex items-center">
                <span className="text-2xl font-extrabold tracking-tight text-[#111827]">QUAN</span>
                <span className="text-2xl font-medium tracking-tight text-[#00A878]">TIONIC</span>
              </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="nav-link text-[#334155]"
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.scrollTo)}
                  className="nav-link text-[#334155]"
                >
                  {link.name}
                </button>
              )
            )}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onOpenChat}
              className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 bg-teal-50 border border-teal-200 hover:bg-teal-100/50 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-teal-500/20 text-sm font-semibold active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span>AI Consultant</span>
            </button>
            <Link
              to="/contact"
              className="flex items-center space-x-1 bg-slate-900 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 text-sm font-medium shadow-sm active:scale-95"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onOpenChat}
              className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg"
              title="AI Consultant"
            >
              <Bot className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[70px] left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xl px-6 py-8 flex flex-col md:hidden space-y-6"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="nav-link text-lg"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => { setIsOpen(false); scrollTo(link.scrollTo); }}
                    className="nav-link text-lg text-left"
                  >
                    {link.name}
                  </button>
                )
              )}
            </div>
            
            <hr className="border-slate-100" />

            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenChat();
                }}
                className="flex items-center justify-center space-x-2 w-full text-teal-600 bg-teal-50 hover:bg-teal-100/50 py-3 rounded-xl transition-colors font-semibold"
              >
                <Bot className="w-5 h-5" />
                <span>Consult AI</span>
              </button>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 w-full bg-slate-900 hover:bg-teal-700 text-white py-3 rounded-xl transition-colors font-medium text-center"
              >
                <span>Book a Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
