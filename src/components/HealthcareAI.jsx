import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Shield, Lock, Users, AlertTriangle, ChevronRight, CheckCircle } from 'lucide-react';
import Footer from './Footer';

export default function HealthcareAI() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() === '') return;
    setSubscribeSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribeSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white text-[#334155] font-sans flex flex-col">
      {/* Header Area */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#009966] flex items-center justify-center font-bold text-white text-sm">
              Q
            </div>
            <span className="text-lg font-bold tracking-tight text-[#0F172A]">
              QUANT<span className="text-[#009966]">IONIC</span>
            </span>
          </div>
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-sm font-bold text-[#009966] hover:text-[#007a52] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b border-gray-100">
        <div className="space-y-6 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#009966] bg-[#009966]/10 px-3 py-1 rounded-full w-fit block">
            AI Operations & Automation
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Transforming Healthcare with AI, IoT, and Intelligent Automation
          </h1>
          <p className="text-lg text-[#334155] leading-relaxed font-medium">
            Optimize diagnostic workflows, unify secure electronic records, and deploy real-time clinical monitoring dashboards engineered with absolute HIPAA-compliant integrity.
          </p>
          <div className="pt-4">
            <a 
              href="#contact-cta" 
              className="inline-block bg-[#009966] hover:bg-[#007a52] text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md shadow-[#009966]/10"
            >
              Request Custom Demo
            </a>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          {/* Laptop Mockup */}
          <div className="relative w-full max-w-[550px] p-2 bg-gray-900 rounded-3xl shadow-2xl border border-slate-800">
            <div className="overflow-hidden rounded-2xl aspect-[16/10] bg-slate-950 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
                alt="Medical Analytics Dashboard"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-2 bg-slate-800 rounded-t-lg"></div>
          </div>
        </div>
      </section>

      {/* 2. Data Security & Compliance Section */}
      <section className="py-20 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">
              Data Security & Compliance
            </h2>
            <p className="text-[#334155] font-medium">
              We engineer enterprise health systems to satisfy the most stringent privacy protocols, securing sensitive PHI at every transition.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Card 1 */}
            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm text-left flex items-start space-x-4 bg-white hover:border-[#009966]/30 transition-colors duration-300">
              <div className="w-10 h-10 rounded-lg bg-[#009966]/10 text-[#009966] flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1">HIPAA and ISO-27001 compliance</h3>
                <p className="text-sm text-[#334155]">Full compliance alignment designed directly into database schemes and network pipelines.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm text-left flex items-start space-x-4 bg-white hover:border-[#009966]/30 transition-colors duration-300">
              <div className="w-10 h-10 rounded-lg bg-[#009966]/10 text-[#009966] flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1">AES-256 data encryption</h3>
                <p className="text-sm text-[#334155]">Immutable end-to-end data encryption covering both transport layers and static storage arrays.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm text-left flex items-start space-x-4 bg-white hover:border-[#009966]/30 transition-colors duration-300">
              <div className="w-10 h-10 rounded-lg bg-[#009966]/10 text-[#009966] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1">Role-based access controls</h3>
                <p className="text-sm text-[#334155]">Granular token-based credential policies ensuring clinical personnel access only authorized records.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-8 border border-gray-100 rounded-2xl shadow-sm text-left flex items-start space-x-4 bg-white hover:border-[#009966]/30 transition-colors duration-300">
              <div className="w-10 h-10 rounded-lg bg-[#009966]/10 text-[#009966] flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1">Continuous audit and anomaly detection</h3>
                <p className="text-sm text-[#334155]">Continuous background auditing and automated alerts on any irregular system query behavior.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Hospital Information Management System (HIMS) */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b border-gray-100">
        <div className="flex justify-center order-2 lg:order-1">
          {/* Slanted Laptop Screen Mockup */}
          <div className="relative w-full max-w-[520px] shadow-2xl rounded-2xl overflow-hidden border border-gray-100 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80" 
              alt="HIMS Database Software" 
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
        <div className="space-y-6 text-left order-1 lg:order-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">
            Hospital Information Management System (HIMS)
          </h2>
          <p className="text-base text-[#334155] leading-relaxed">
            Consolidate clinical database networks under a single unified dashboard interface. Our custom HIMS middleware bridges patient scheduling, laboratory feedback, diagnostics, and inventory workflows.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Real-time bed & resource allocation',
              'Patient record schema consolidation',
              'Integrated billing & insurance pipelines',
              'Auto-optimization of doctor schedules'
            ].map((bullet, idx) => (
              <li key={idx} className="flex items-center space-x-3 text-sm font-bold text-[#0F172A]">
                <div className="w-5 h-5 rounded-full bg-[#009966]/10 text-[#009966] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3px]" />
                </div>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. AI-Powered Emergency & Clinical Decision Support */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b border-gray-100">
        <div className="space-y-6 text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">
            AI-Powered Emergency & Clinical Decision Support
          </h2>
          <p className="text-base text-[#334155] leading-relaxed">
            Shorten reaction windows during acute clinical scenarios. Our emergency modules run constant telemetry analytics over live patient monitor streams to calculate risk curves and generate proactive nursing alerts.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#009966] mt-2 shrink-0" />
              <p className="text-sm font-semibold text-[#334155]">Continuous patient vital-signs feature extraction model</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#009966] mt-2 shrink-0" />
              <p className="text-sm font-semibold text-[#334155]">Immediate dashboard escalation triggered upon cardiac anomalies</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {/* Smartphone Mockup */}
          <div className="w-[280px] h-[560px] bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-b-2xl z-20 flex justify-center items-center">
              <div className="w-12 h-1 bg-gray-800 rounded-full"></div>
            </div>
            <div className="w-full h-full bg-slate-950 rounded-[30px] overflow-hidden p-6 flex flex-col justify-between border border-slate-800 text-white relative">
              <div className="space-y-4 pt-6">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                  Alert Active
                </span>
                <h3 className="text-xl font-bold tracking-tight text-red-500">Critical Shift</h3>
                <div className="p-4 bg-red-950/40 border border-red-800/30 rounded-2xl space-y-2">
                  <p className="text-xs text-red-400 font-bold">Patient: Ward 4, Bed B</p>
                  <p className="text-[11px] text-gray-300">SpO2 index drops below 92% thresholds. Cardiac monitor reports PVC frequency spikes.</p>
                </div>
              </div>
              
              {/* Fake Graph */}
              <div className="w-full h-24 bg-slate-900/80 rounded-xl border border-slate-800 p-2 flex items-end space-x-1">
                {[40, 20, 60, 80, 45, 95, 30, 75, 50, 85, 35, 90].map((h, i) => (
                  <div 
                    key={i} 
                    style={{ height: `${h}%` }} 
                    className={`flex-1 rounded-sm ${h > 75 ? 'bg-red-500' : 'bg-teal-500'}`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Clinical Engines & Platforms (Staggered Rows) */}
      <section className="py-20 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Row A */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80" 
                  alt="Cancer Diagnosis Support Engine Workspace" 
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>
            <div className="space-y-6 text-left">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">
                Cancer Diagnosis Support Engine
              </h3>
              <p className="text-base text-[#334155] leading-relaxed">
                Empower clinical pathology teams with AI models that assist in scan assessments. By running computer vision pattern filters over MRI and CT scans, the support engine classifies features and structures to flag early oncological anomalies.
              </p>
              <div className="space-y-3">
                {['Convolutional Neural Networks for cell feature extraction', 'Scan lesion classification maps with 98.4% precision', 'Integrated clinical report generator pipeline'].map((bullet, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-sm font-bold text-[#0F172A]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#009966]" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row B */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left order-2 lg:order-1">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">
                Chiropractic Recovery & Wellness Platform
              </h3>
              <p className="text-base text-[#334155] leading-relaxed">
                Translate posture analysis and motion capture recordings into automated chiropractic treatment plans. Our platform maps physical adjustments and muscle stress loads to recommend customized physical therapy cycles.
              </p>
              <div className="space-y-3">
                {['Automatic posture skeletal load calculations', 'Integrations with wireless sensor bands', 'Interactive clinical progress monitoring screens'].map((bullet, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-sm font-bold text-[#0F172A]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#009966]" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-[500px] shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
                  alt="Chiropractic Recovery Software" 
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Salesforce Integration Banner */}
      <section className="bg-slate-50 border-b border-gray-100 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-base md:text-lg font-bold text-[#0F172A] text-left">
            When rightly implemented, Salesforce can boost your clinical operations revenue by more than <span className="text-[#009966]">20%</span>.
          </p>
          <a
            href="/#/contact"
            className="bg-[#009966] hover:bg-[#007a52] text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap shadow-sm shadow-[#009966]/10"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* 7. Our Blogs Section */}
      <section className="py-20 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-left space-y-2">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">Our Blogs</h2>
            <p className="text-sm text-[#334155] font-medium">Read our latest technical insights on health informatics, compliance, and enterprise AI engineering.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Blog Card 1 */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80" 
                alt="AI Diagnostics article thumbnail" 
                className="w-full h-44 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col space-y-3">
                <h4 className="text-base font-bold text-[#0F172A] leading-snug">
                  Deploying CNN Models on Clinical Scanners
                </h4>
                <p className="text-xs text-[#334155] leading-relaxed flex-1">
                  How database middleware latency can impact real-time scan image classification, and the pipelines built to fix it.
                </p>
                <div className="pt-2">
                  <span className="text-xs font-bold text-[#009966] flex items-center hover:underline cursor-pointer">
                    Read Article <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Blog Card 2 */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
              <img 
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80" 
                alt="Electronic Health Records security thumbnail" 
                className="w-full h-44 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col space-y-3">
                <h4 className="text-base font-bold text-[#0F172A] leading-snug">
                  Unlocking EHR Interoperability with AES Keys
                </h4>
                <p className="text-xs text-[#334155] leading-relaxed flex-1">
                  Secure data transfer architectures enabling disparate clinical systems to exchange records safely under key structures.
                </p>
                <div className="pt-2">
                  <span className="text-xs font-bold text-[#009966] flex items-center hover:underline cursor-pointer">
                    Read Article <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Blog Card 3 */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
              <img 
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80" 
                alt="Clinical IoT monitor thumbnail" 
                className="w-full h-44 object-cover"
              />
              <div className="p-6 flex-1 flex flex-col space-y-3">
                <h4 className="text-base font-bold text-[#0F172A] leading-snug">
                  Edge AI in Clinical IoT Monitors
                </h4>
                <p className="text-xs text-[#334155] leading-relaxed flex-1">
                  How local computation prevents critical vital alert delay loops in environments with transient network drops.
                </p>
                <div className="pt-2">
                  <span className="text-xs font-bold text-[#009966] flex items-center hover:underline cursor-pointer">
                    Read Article <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Newsletter Signup Form (Absolute Bottom Section) */}
      <section id="contact-cta" className="bg-slate-50 border-t border-b border-slate-100 py-16 px-6 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">
            Subscribe to Newsletter
          </h2>
          <p className="text-sm text-[#334155] leading-relaxed font-medium">
            Receive quarterly engineering summaries, platform API updates, and clinical AI implementation studies.
          </p>
          
          {subscribeSuccess ? (
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center space-x-2 text-[#009966] font-bold text-sm">
              <CheckCircle className="w-5 h-5" />
              <span>Subscribed successfully!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                required
                placeholder="Enter your enterprise email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white border border-gray-200 focus:border-[#009966] focus:outline-none rounded-xl px-4 py-3 text-sm text-[#0F172A] shadow-sm"
              />
              <button 
                type="submit"
                className="bg-[#009966] hover:bg-[#007a52] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-sm shadow-[#009966]/10 shrink-0 text-sm"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer onOpenChat={() => {}} />
    </div>
  );
}
