import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, HelpCircle, Loader2 } from 'lucide-react';
import api from '../api';

const MemoizedMessages = React.memo(function MemoizedMessages({ messages }) {
  return messages.map((msg, index) => (
    <div
      key={index}
      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`flex items-start space-x-2 max-w-[85%] ${
          msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
        }`}
      >
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            msg.sender === 'user'
              ? 'bg-slate-900 text-white'
              : 'bg-teal-100 text-teal-700'
          }`}
        >
          {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>
        <div
          className={`p-3.5 rounded-2xl text-sm font-medium whitespace-pre-line leading-relaxed ${
            msg.sender === 'user'
              ? 'bg-slate-900 text-white rounded-tr-none'
              : 'bg-white border border-slate-100 shadow-sm text-slate-700 rounded-tl-none'
          }`}
        >
          {msg.text}
        </div>
      </div>
    </div>
  ));
});

const suggestedQuestions = [
  'What services does Quantionic provide?',
  'Explain the AI & Blockchain integrations',
  'How do I schedule a technical consultation?',
  'What features are in the Healthcare AI module?'
];

export default function AIConsultant({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your Quantionic AI Consultant. I can recommend engineering services, answer technical queries, or guide you through setting up integration pipelines. What can I build for you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const fallbackTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    };
  }, []);

  // Debounced scroll to bottom — avoids lag during rapid renders
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 80);
    return () => clearTimeout(timer);
  }, [messages, loading, scrollToBottom]);

  const handleSend = useCallback(async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    if (!textToSend) setInput('');

    // Append user message
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setLoading(true);

    try {
      // Connect to backend api
      const response = await api.post('/api/chat', { message: text });
      
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: response.data.reply }
      ]);
    } catch (error) {
      fallbackTimerRef.current = setTimeout(() => {
        let fallbackReply = "I'm having trouble connecting to the live Express server. However, as the Quantionic AI, I can tell you that we offer premium custom software development with full-stack Node/React/Tailwind, AI automation pipelines with Gemini/OpenAI, and data integrations (Salesforce, ServiceNow, MongoDB).";
        
        if (text.toLowerCase().includes('service')) {
          fallbackReply = "Quantionic specializes in: \n1. Custom AI Pipelines (Gemini/OpenAI solutions)\n2. Cloud & IoT Systems integration\n3. Enterprise CRM connectors (Salesforce/ServiceNow)\n4. Premium Frontend Design (Tailwind, React, Framer Motion)\n\nYou can book a consultation call at the bottom of the home page!";
        } else if (text.toLowerCase().includes('consult') || text.toLowerCase().includes('book') || text.toLowerCase().includes('schedule')) {
          fallbackReply = "To book a technical consultation, please scroll down to the 'Book a Technical Consultation' form on this page. Simply enter your Name, Email, Enterprise domain, and your specific requirements. We will register it into our MongoDB system and contact you immediately!";
        }
        
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: fallbackReply }
        ]);
      }, 800);
    } finally {
      setLoading(false);
    }
  }, [input]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end md:p-6 bg-slate-900/40 backdrop-blur-sm pointer-events-auto">
          {/* Overlay to close */}
          <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full h-full md:w-[480px] md:h-[90vh] bg-white md:rounded-3xl shadow-2xl flex flex-col border border-slate-100 z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Quantobot</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Powered by Quantionic AI</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close AI chat"
                className="p-2.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 no-scrollbar">
              <MemoizedMessages messages={messages} />

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 bg-white border border-slate-100 shadow-sm p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                    <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
                    <span className="text-xs text-slate-400 font-semibold">AI is analyzing prompt...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestions Box (Visible only when chat is starting) */}
            {messages.length === 1 && !loading && (
              <div className="px-5 py-3 bg-white border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>How can I help you today?</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="text-xs text-slate-600 hover:text-teal-600 bg-slate-50 hover:bg-teal-50 border border-slate-100 hover:border-teal-100 px-3 py-2.5 rounded-lg transition-colors text-left"
                      >
                        <Bot className="inline w-3 h-3 mr-1"/>{q}
                      </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-4 bg-white border-t border-slate-100 flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Ask about technologies, services or booking..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-teal-400 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="bg-slate-900 hover:bg-teal-600 text-white p-3.5 rounded-xl transition-all duration-200 disabled:bg-slate-100 disabled:text-slate-400 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
