const express = require('express');
const path = require('path');

const app = express();
app.use(express.json({ limit: '16kb' }));
app.use('/modern.css', express.static(path.join(__dirname, 'src', 'modern.css')));
app.use('/modern.js', express.static(path.join(__dirname, 'src', 'modern.js')));

// Keep browser enquiries same-origin; forward on the server to the existing backend.
app.post('/api/contact', async (req, res) => {
  const { name = '', email = '', message = '' } = req.body || {};
  if (typeof email !== 'string' || typeof message !== 'string' || !email.includes('@') || !message.trim() || message.length > 5000) {
    return res.status(400).json({ ok: false, error: 'Invalid enquiry' });
  }
  try {
    const upstream = await fetch(process.env.CONTACT_BACKEND_URL || 'http://127.0.0.1:8600/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: String(name).slice(0,120), email: email.slice(0,200), message: message.slice(0,5000) }),
      signal: AbortSignal.timeout(15000),
    });
    return res.status(upstream.ok ? 200 : 502).json({ ok: upstream.ok });
  } catch (error) { console.error('Contact backend unavailable:', error); return res.status(503).json({ ok: false }); }
});
const PORT = 3600;

// Serve static files from public and src directories
app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles.css', express.static(path.join(__dirname, 'src', 'styles.css')));
app.use('/app.js', express.static(path.join(__dirname, 'src', 'app.js')));
app.use('/translations.js', express.static(path.join(__dirname, 'src', 'translations.js')));

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

