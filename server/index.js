import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

// --- Gmail SMTP Email Setup ---
let transporter = null;
let isEmailConfigured = false;
const GMAIL_USER = process.env.GMAIL_USER || 'quantionic@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || '';

if (GMAIL_APP_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
  isEmailConfigured = true;
  console.log(`Gmail SMTP configured for: ${GMAIL_USER}`);
} else {
  console.warn('No GMAIL_APP_PASSWORD set. Email notifications disabled.');
}

// Make sure fallback data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

// --- Database Connectivity / Fallback Store ---
let isMongoConnected = false;

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
      console.log('MongoDB successfully connected.');
      isMongoConnected = true;
    })
    .catch((err) => {
      console.warn('MongoDB connection failed. Backend is falling back to Local JSON Files storage.');
      isMongoConnected = false;
    });
} else {
  console.warn('No MONGODB_URI set. Running with local JSON file storage only.');
  isMongoConnected = false;
}

// --- Mongoose Schemas & Fallback Helpers ---
const consultationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  enterprise: { type: String },
  requirements: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const Consultation = mongoose.model('Consultation', consultationSchema);
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// --- User Schema (Admin Accounts) ---
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

const USERS_FILE = 'users.json';

const getLocalFileStore = (filename) => {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, JSON.stringify([]));
    return [];
  }
  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

const saveLocalFileStore = (filename, data) => {
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
};

// --- Gemini AI Setup ---
let isGenAIConfigured = false;
let genAI = null;
let aiModel = null;

if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    aiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    isGenAIConfigured = true;
    console.log('Gemini API configured successfully.');
  } catch (e) {
    console.error('Failed to configure Gemini AI:', e);
    isGenAIConfigured = false;
  }
} else {
  // No Gemini API key provided; running in mock mode without warning.
  isGenAIConfigured = false;
}

const AI_SYSTEM_PROMPT = `
You are the Quantionic AI Consultant, a professional technology strategist. 
You represent Quantionic, a premium full-stack software and intelligence engineering consultancy.
Quantionic builds:
1. Custom AI Pipelines (clinical summary generation, LLM orchestration, custom RAG systems using vector databases, Gemini/OpenAI fine-tuning).
2. Cloud & IoT Systems (sensor networks, cloud synchronization, high-performance dashboards).
3. Enterprise Platform Integrations (Salesforce real-time triggers, ServiceNow event trackers, custom middleware).
4. Modern Frontend Design (React, Vite, Tailwind v4, Framer Motion for responsive visual micro-animations).

Tone Guidelines:
- Keep answers professional, concise, and highly technical.
- Focus on how engineering can solve client business workflows.
- If clients want to build a solution, prompt them to fill out the "Book a Technical Consultation" form at the bottom of the page or scroll down to register their contact info.
- Never make up fake data or prices; explain that custom projects depend on technical requirements.
`;

// --- Auth Middleware ---
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_me';

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// --- Seed Default Admin Account ---
const seedDefaultAdmin = async () => {
  const defaultEmail = 'admin@quantionic.com';
  const defaultPassword = 'Quantionic@2026';

  if (isMongoConnected) {
    try {
      const exists = await User.findOne({ email: defaultEmail });
      if (!exists) {
        const hashed = await bcrypt.hash(defaultPassword, 12);
        await User.create({ name: 'Admin', email: defaultEmail, password: hashed, role: 'admin' });
        console.log('Default admin seeded: admin@quantionic.com / Quantum@2026');
      }
    } catch (e) {
      console.error('Failed to seed admin to MongoDB:', e);
    }
  } else {
    const users = getLocalFileStore(USERS_FILE);
    if (!users.find(u => u.email === defaultEmail)) {
      const hashed = await bcrypt.hash(defaultPassword, 12);
      users.push({
        _id: 'user-admin-1',
        name: 'Admin',
        email: defaultEmail,
        password: hashed,
        role: 'admin',
        createdAt: new Date().toISOString()
      });
      saveLocalFileStore(USERS_FILE, users);
      console.log('Default admin seeded to local JSON: admin@quantionic.com / Quantionic@2026');
    }
  }
};

// --- API ROUTES ---

// --- Email Helpers ---
const SEND_EMAIL = GMAIL_USER;
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY || '';
const isRecaptchaConfigured = !!RECAPTCHA_SECRET;

const verifyRecaptcha = async (token) => {
  if (!isRecaptchaConfigured) return true;
  if (!token) return false;
  try {
    const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(RECAPTCHA_SECRET)}&response=${encodeURIComponent(token)}`,
    });
    const data = await resp.json();
    console.log(`reCAPTCHA verify: score=${data.score}, success=${data.success}`);
    return data.success && data.score >= 0.5;
  } catch (err) {
    console.error('reCAPTCHA verification failed:', err);
    return true;
  }
};

const sendConsultationEmail = async ({ name, email, enterprise, requirements }) => {
  if (!isEmailConfigured) return;
  const adminEmail = process.env.ADMIN_EMAIL || 'mikeyadav10042006@gmail.com';
  try {
    await transporter.sendMail({
      from: `"Quantionic" <${GMAIL_USER}>`,
      to: adminEmail,
      subject: `New Consultation Booking from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <div style="background:#059669;color:white;padding:20px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="margin:0;font-size:22px;">New Consultation Booking</h1>
          </div>
          <div style="background:#f9fafb;padding:20px;border:1px solid #e5e7eb;border-radius:0 0 12px 12px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${enterprise || 'N/A'}</p>
            <p><strong>Requirements:</strong></p>
            <div style="background:white;padding:12px;border-radius:8px;border:1px solid #e5e7eb;margin-top:8px;">
              ${requirements}
            </div>
            <hr style="margin:20px 0;border:none;border-top:1px solid #e5e7eb;" />
            <p style="color:#6b7280;font-size:12px;">This booking was submitted from the Quantionic website contact form.</p>
          </div>
        </div>
      `,
    });
    console.log(`Consultation email sent for: ${email}`);
  } catch (err) {
    console.error('Failed to send consultation email:', err);
  }
};

const sendUserConfirmationEmail = async ({ name, email, type }) => {
  if (!isEmailConfigured) return;
  const subject = type === 'consultation'
    ? 'Your Consultation Request has been Received — Quantionic'
    : 'Your Message has been Received — Quantionic';
  const body = type === 'consultation'
    ? `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for reaching out to <strong>Quantionic</strong>. We have successfully received your technical consultation request.</p>
        <div style="background:white;padding:16px;border-radius:8px;border:1px solid #e5e7eb;margin:16px 0;">
          <p style="margin:0;color:#6b7280;font-size:13px;">Our engineering team will review your requirements and get back to you within <strong>24 hours</strong>.</p>
        </div>
        <p>In the meantime, feel free to explore our services or reach out to us directly:</p>
        <ul style="line-height:2;">
          <li>Email: <a href="mailto:quantionic@gmail.com" style="color:#059669;">quantionic@gmail.com</a></li>
          <li>Website: <a href="https://quant-web-theta.vercel.app" style="color:#059669;">quant-web-theta.vercel.app</a></li>
        </ul>
      `
    : `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for contacting <strong>Quantionic</strong>. We have received your message and will get back to you shortly.</p>
        <div style="background:white;padding:16px;border-radius:8px;border:1px solid #e5e7eb;margin:16px 0;">
          <p style="margin:0;color:#6b7280;font-size:13px;">Our team typically responds within <strong>24 hours</strong>.</p>
        </div>
        <p>Feel free to explore our services at <a href="https://quant-web-theta.vercel.app" style="color:#059669;">quant-web-theta.vercel.app</a>.</p>
      `;
  try {
    await transporter.sendMail({
      from: `"Quantionic" <${GMAIL_USER}>`,
      to: email,
      subject,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <div style="background:#059669;color:white;padding:20px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="margin:0;font-size:22px;">${type === 'consultation' ? 'Consultation Request Received' : 'Message Received'}</h1>
          </div>
          <div style="background:#f9fafb;padding:20px;border:1px solid #e5e7eb;border-radius:0 0 12px 12px;">
            ${body}
            <hr style="margin:20px 0;border:none;border-top:1px solid #e5e7eb;" />
            <p style="color:#6b7280;font-size:12px;">Quantionic — Premium Software & Intelligence Engineering.</p>
          </div>
        </div>
      `,
    });
    console.log(`User confirmation email sent to: ${email} (${type})`);
  } catch (err) {
    console.error('Failed to send user confirmation email:', err);
  }
};

const sendNewsletterWelcomeEmail = async ({ email }) => {
  if (!isEmailConfigured) return;
  try {
    await transporter.sendMail({
      from: `"Quantionic" <${GMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Quantionic Newsletter!',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <div style="background:#059669;color:white;padding:20px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="margin:0;font-size:22px;">Welcome to Quantionic!</h1>
          </div>
          <div style="background:#f9fafb;padding:20px;border:1px solid #e5e7eb;border-radius:0 0 12px 12px;">
            <p>Hi there,</p>
            <p>Thank you for subscribing to the <strong>Quantionic Newsletter</strong>. You'll now receive regular updates on:</p>
            <ul style="line-height:1.8;">
              <li>AI & Machine Learning innovations</li>
              <li>Enterprise integration solutions</li>
              <li>Cloud & IoT system architectures</li>
              <li>Industry insights and case studies</li>
            </ul>
            <p>If you have any questions, feel free to reach out at <a href="mailto:quantionic@gmail.com" style="color:#059669;">quantionic@gmail.com</a>.</p>
            <hr style="margin:20px 0;border:none;border-top:1px solid #e5e7eb;" />
            <p style="color:#6b7280;font-size:12px;">Quantionic — Premium Software & Intelligence Engineering.</p>
          </div>
        </div>
      `,
    });
    console.log(`Welcome email sent to: ${email}`);
  } catch (err) {
    console.error('Failed to send newsletter welcome email:', err);
  }
};

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'quantionic-backend', timestamp: new Date().toISOString() });
});

// Auth: Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  let user = null;

  if (isMongoConnected) {
    try {
      user = await User.findOne({ email: email.toLowerCase() });
    } catch (e) {
      console.error('MongoDB query error:', e);
    }
  }

  if (!user) {
    const users = getLocalFileStore(USERS_FILE);
    user = users.find(u => u.email === email.toLowerCase());
  }

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user._id || user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  return res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
});

// Auth: Register new admin (protected — requires existing admin token)
app.post('/api/auth/register', authMiddleware, async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  if (isMongoConnected) {
    try {
      const exists = await User.findOne({ email: email.toLowerCase() });
      if (exists) {
        return res.status(409).json({ error: 'Email already registered' });
      }
      const hashed = await bcrypt.hash(password, 12);
      const newUser = await User.create({ name, email: email.toLowerCase(), password: hashed, role: 'admin' });
      return res.status(201).json({ success: true, user: { name: newUser.name, email: newUser.email, role: newUser.role } });
    } catch (e) {
      console.error('MongoDB write error:', e);
    }
  }

  // Fallback
  const users = getLocalFileStore(USERS_FILE);
  if (users.find(u => u.email === email.toLowerCase())) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  const hashed = await bcrypt.hash(password, 12);
  const newUser = { _id: 'user-' + Date.now(), name, email: email.toLowerCase(), password: hashed, role: 'admin', createdAt: new Date().toISOString() };
  users.push(newUser);
  saveLocalFileStore(USERS_FILE, users);
  return res.status(201).json({ success: true, user: { name: newUser.name, email: newUser.email, role: newUser.role } });
});

// Auth: Verify token
app.get('/api/auth/me', authMiddleware, (req, res) => {
  return res.json({ user: { name: req.user.name, email: req.user.email, role: req.user.role } });
});

// 1. Submit consultation booking
app.post('/api/consultations', async (req, res) => {
  const { name, email, enterprise, requirements, recaptchaToken } = req.body;
  if (!name || !email || !requirements) {
    return res.status(400).json({ error: 'Name, email, and requirements are required' });
  }

  const human = await verifyRecaptcha(recaptchaToken);
  if (!human) {
    return res.status(403).json({ error: 'reCAPTCHA verification failed. Please try again.' });
  }

  const payload = { name, email, enterprise, requirements, createdAt: new Date() };

  if (isMongoConnected) {
    try {
      const doc = new Consultation(payload);
      await doc.save();
      sendConsultationEmail(payload).catch((e) => console.error('Email error:', e.message));
      sendUserConfirmationEmail({ name, email, type: 'consultation' }).catch((e) => console.error('Email error:', e.message));
      return res.status(201).json({ success: true, message: 'Consultation saved to MongoDB', data: doc });
    } catch (err) {
      console.error('MongoDB write error:', err);
    }
  }

  // Fallback storage
  try {
    const list = getLocalFileStore('consultations.json');
    payload._id = 'local-' + Date.now();
    list.unshift(payload);
    saveLocalFileStore('consultations.json', list);
    sendConsultationEmail(payload).catch((e) => console.error('Email error:', e.message));
    sendUserConfirmationEmail({ name, email, type: 'consultation' }).catch((e) => console.error('Email error:', e.message));
    return res.status(201).json({ success: true, message: 'Consultation saved to local JSON store', data: payload });
  } catch (err) {
    return res.status(500).json({ error: 'Could not write consultation to fallback database' });
  }
});

// 2. Submit newsletter subscription
app.post('/api/newsletter', async (req, res) => {
  const { email, recaptchaToken } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const human = await verifyRecaptcha(recaptchaToken);
  if (!human) {
    return res.status(403).json({ error: 'reCAPTCHA verification failed. Please try again.' });
  }

  const payload = { email, createdAt: new Date() };

  if (isMongoConnected) {
    try {
      const doc = new Subscriber(payload);
      await doc.save();
      sendNewsletterWelcomeEmail({ email }).catch((e) => console.error('Email error:', e.message));
      return res.status(201).json({ success: true, message: 'Newsletter subscribed in MongoDB', data: doc });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ error: 'Email already subscribed' });
      }
      console.error('MongoDB write error:', err);
    }
  }

  // Fallback storage
  try {
    const list = getLocalFileStore('subscribers.json');
    if (list.some(s => s.email.toLowerCase() === email.toLowerCase())) {
      return res.status(409).json({ error: 'Email already subscribed' });
    }
    payload._id = 'local-sub-' + Date.now();
    list.unshift(payload);
    saveLocalFileStore('subscribers.json', list);
    sendNewsletterWelcomeEmail({ email }).catch((e) => console.error('Email error:', e.message));
    return res.status(201).json({ success: true, message: 'Newsletter subscribed in local JSON store', data: payload });
  } catch (err) {
    return res.status(500).json({ error: 'Could not subscribe to fallback database' });
  }
});

// 3. Admin view submissions (PROTECTED)
app.get('/api/admin/data', authMiddleware, async (req, res) => {
  if (isMongoConnected) {
    try {
      const consultations = await Consultation.find().sort({ createdAt: -1 });
      const subscribers = await Subscriber.find().sort({ createdAt: -1 });
      return res.json({ consultations, subscribers });
    } catch (err) {
      console.error('MongoDB query error:', err);
    }
  }

  // Fallback query
  const consultations = getLocalFileStore('consultations.json');
  const subscribers = getLocalFileStore('subscribers.json');
  return res.json({ consultations, subscribers });
});

// 4. Chat with AI consultant
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  if (isGenAIConfigured) {
    try {
      const response = await aiModel.generateContent({
        contents: [
          { role: 'user', parts: [{ text: `${AI_SYSTEM_PROMPT}\n\nClient message: ${message}` }] }
        ]
      });
      const text = response.response.text();
      return res.json({ reply: text });
    } catch (err) {
      console.error('Gemini API call failed:', err);
    }
  }

  // Fallback chat reply matching some simple criteria
  let reply = "Hello, as the Quantionic AI Consultant, I can confirm that we build custom integrations. We link Node.js servers, MongoDB, Salesforce, and ServiceNow with custom AI models. If you have custom specifications, please scroll to the bottom of the page and submit our Technical Consultation booking form!";
  
  const msgLower = message.toLowerCase();
  if (msgLower.includes('service') || msgLower.includes('offer')) {
    reply = "Quantionic offers:\n- Full-Stack Software Engineering (React, Vite, Express, Mongoose)\n- Bespoke AI Automations (OpenAI & Gemini APIs, customized agents)\n- Enterprise System integrations (Salesforce trigger endpoints, ServiceNow API connectors)\n- IoT & Cloud Synchronization architectures\n\nScroll down to book a call and discuss your specifications!";
  } else if (msgLower.includes('booking') || msgLower.includes('consult') || msgLower.includes('schedule') || msgLower.includes('contact')) {
    reply = "To book a formal consultation with our engineering team, scroll down to the bottom of this page and fill out the 'Book a Technical Consultation' form. Once you enter your specifications, it will be stored in our database and we will contact you immediately!";
  } else if (msgLower.includes('blockchain') || msgLower.includes('oracle')) {
    reply = "We construct secure Web3 blockchain node connections, Solidity smart contract integrations, and custom Oracle systems. This allows real-time backend API data feeds to sync cryptographically on-chain. Let us know if you want to set up an oracle!";
  }

  return res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`Quantionic backend server running on port ${PORT}`);
  console.log(`Email configured: ${isEmailConfigured}, From: ${GMAIL_USER}, Admin: ${process.env.ADMIN_EMAIL || 'mikeyadav10042006@gmail.com'}`);
  seedDefaultAdmin().catch((err) => console.error('Admin seed failed:', err));
});
