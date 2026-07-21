import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Services from './components/Services';
import Values from './components/Values';
import Projects from './components/Projects';
import Team from './components/Team';
import Footer from './components/Footer';
import AIConsultant from './components/AIConsultant';
import AdminDashboard from './components/AdminDashboard';
import LoginModal from './components/LoginModal';
import LogoMarquee from './components/LogoMarquee';
import SplashScreen from './components/SplashScreen';
const HealthcareAI = lazy(() => import('./components/HealthcareAI'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const SmartCity = lazy(() => import('./components/SmartCity'));
const SalesforceChecklist = lazy(() => import('./components/SalesforceChecklist'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));

const BASE_URL = 'https://quant-web-theta.vercel.app';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = BASE_URL + pathname;
  }, [pathname]);
  return null;
}

function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('quant_token') || null);
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('hasSeenSplashScreen')) return false;
    return true;
  });

  const openChat = useCallback(() => setChatOpen(true), []);
  const closeChat = useCallback(() => setChatOpen(false), []);

  const openAdmin = useCallback(() => {
    const token = localStorage.getItem('quant_token');
    if (token) {
      setAuthToken(token);
      setAdminOpen(true);
    } else {
      setLoginOpen(true);
    }
  }, []);

  const closeAdmin = useCallback(() => setAdminOpen(false), []);

  const handleLoginSuccess = useCallback((user, token) => {
    setAuthToken(token);
    setLoginOpen(false);
    setTimeout(() => setAdminOpen(true), 300);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('quant_token');
    localStorage.removeItem('quant_user');
    setAuthToken(null);
    setAdminOpen(false);
  }, []);

  const closeLogin = useCallback(() => setLoginOpen(false), []);

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem('hasSeenSplashScreen', 'true');
    setShowSplash(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar onOpenChat={openChat} />

      <main className="flex-grow">
        <Hero />
        <LogoMarquee />
        <Stats />
        <Services />
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #64748b 1.2px, transparent 1.2px)', backgroundSize: '28px 28px', opacity: 0.25 }} />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal-200/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-200/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[550px] h-[550px] bg-blue-200/8 rounded-full blur-[110px] pointer-events-none" />
          <Features />
          <Values />
          <Projects />
        </div>
        <Team />
      </main>

      <Footer onOpenChat={openChat} onOpenAdmin={openAdmin} />
      <AIConsultant isOpen={chatOpen} onClose={closeChat} />
      <LoginModal isOpen={loginOpen} onClose={closeLogin} onSuccess={handleLoginSuccess} />
      <AdminDashboard isOpen={adminOpen} onClose={closeAdmin} onLogout={handleLogout} authToken={authToken} />
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center bg-[#fafbfd]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-[#009966]/20 border-t-[#009966] rounded-full animate-spin" />
            <p className="text-sm text-slate-400 font-medium tracking-wide">Loading...</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/healthcare-ai" element={<HealthcareAI />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/smart-city" element={<SmartCity />} />
          <Route path="/salesforce-checklist" element={<SalesforceChecklist />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
