import { useState, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar onOpenChat={openChat} />

      <main className="flex-grow">
        <Hero />
        <LogoMarquee />
        <Stats />
        <Services />
        <Features />
        <Values />
        <Projects />
        <Team />
      </main>

      <Footer onOpenChat={openChat} onOpenAdmin={openAdmin} />
      <AIConsultant isOpen={chatOpen} onClose={closeChat} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={handleLoginSuccess} />
      <AdminDashboard isOpen={adminOpen} onClose={closeAdmin} onLogout={handleLogout} authToken={authToken} />
      {showSplash && <SplashScreen onComplete={() => { sessionStorage.setItem('hasSeenSplashScreen', 'true'); setShowSplash(false); }} />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
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
