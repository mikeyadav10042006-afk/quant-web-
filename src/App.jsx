import { useState, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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
import LogoMarquee from './components/LogoMarquee';
import SplashScreen from './components/SplashScreen';
import HealthcareAI from './components/HealthcareAI';
import ContactPage from './components/ContactPage';
import SmartCity from './components/SmartCity';
import SalesforceChecklist from './components/SalesforceChecklist';

function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('hasSeenSplashScreen')) return false;
    return true;
  });

  const openChat = useCallback(() => setChatOpen(true), []);
  const closeChat = useCallback(() => setChatOpen(false), []);
  const openAdmin = useCallback(() => setAdminOpen(true), []);
  const closeAdmin = useCallback(() => setAdminOpen(false), []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar onOpenChat={openChat} onOpenAdmin={openAdmin} />

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

      <Footer onOpenChat={openChat} />
      <AIConsultant isOpen={chatOpen} onClose={closeChat} />
      <AdminDashboard isOpen={adminOpen} onClose={closeAdmin} />
      {showSplash && <SplashScreen onComplete={() => { sessionStorage.setItem('hasSeenSplashScreen', 'true'); setShowSplash(false); }} />}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/healthcare-ai" element={<HealthcareAI />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/smart-city" element={<SmartCity />} />
        <Route path="/salesforce-checklist" element={<SalesforceChecklist />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
