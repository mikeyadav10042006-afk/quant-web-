import React from 'react';
import Image from 'next/image';

// Simple SVG icons (you can replace with your preferred icon library)
const Icon = ({ children }) => (
  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
    {children}
  </div>
);

export default function Healthcare() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          AI Powered Healthcare
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Transforming patient care with predictive analytics, real‑time monitoring, and intelligent diagnostics.
        </p>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto py-12 px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Predictive Analytics */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start space-y-4">
          <Icon>{/* chart icon */}<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18" /></svg></Icon>
          <h3 className="text-xl font-semibold text-blue-700">Predictive Analytics</h3>
          <p className="text-gray-600 text-sm">
            Forecast patient outcomes, identify risk factors early, and optimise treatment pathways with AI‑driven models.
          </p>
        </div>
        {/* Patient Monitoring */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start space-y-4">
          <Icon>{/* heart monitor */}<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg></Icon>
          <h3 className="text-xl font-semibold text-blue-700">Patient Monitoring</h3>
          <p className="text-gray-600 text-sm">
            Continuous vital‑sign tracking with alerts that empower clinicians to intervene before issues become critical.
          </p>
        </div>
        {/* Smart Diagnostics */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start space-y-4">
          <Icon>{/* microscope */}<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 11h8M8 15h8M5 19h14" /></svg></Icon>
          <h3 className="text-xl font-semibold text-blue-700">Smart Diagnostics</h3>
          <p className="text-gray-600 text-sm">
            AI‑enhanced imaging and lab analysis that reduces false positives and speeds up diagnosis.
          </p>
        </div>
        {/* Data Security */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-start space-y-4">
          <Icon>{/* lock */}<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 22h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z" /></svg></Icon>
          <h3 className="text-xl font-semibold text-blue-700">Data Security</h3>
          <p className="text-gray-600 text-sm">
            End‑to‑end encryption, HIPAA‑level compliance, and audit‑ready logs keep patient data safe.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-blue-800 py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to modernise your healthcare operations?
        </h2>
        <p className="text-white mb-6 max-w-xl mx-auto">
          Get in touch with our AI specialists and start delivering smarter, safer patient care today.
        </p>
        <a
          href="/contact"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
