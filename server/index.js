import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

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
  const { name, email, enterprise, requirements } = req.body;
  if (!name || !email || !requirements) {
    return res.status(400).json({ error: 'Name, email, and requirements are required' });
  }

  const payload = { name, email, enterprise, requirements, createdAt: new Date() };

  if (isMongoConnected) {
    try {
      const doc = new Consultation(payload);
      await doc.save();
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
    return res.status(201).json({ success: true, message: 'Consultation saved to local JSON store', data: payload });
  } catch (err) {
    return res.status(500).json({ error: 'Could not write consultation to fallback database' });
  }
});

// 2. Submit newsletter subscription
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const payload = { email, createdAt: new Date() };

  if (isMongoConnected) {
    try {
      const doc = new Subscriber(payload);
      await doc.save();
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
  seedDefaultAdmin().catch((err) => console.error('Admin seed failed:', err));
});
