/**
 * KOMPLYINT OY Website Backend
 * Minimal support service for public website only.
 * Not related to Todiscope or any other platform.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 8600;

// Email transporter configuration (Google Workspace SMTP)
const createTransporter = () => {
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!user || !password) {
    console.error('SMTP credentials not configured. Email sending will fail.');
    return null;
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: user,
      pass: password
    }
  });
};

// CORS - allow only the frontend
const corsOptions = {
  origin: 'http://localhost:3600',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Basic request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// POST /contact endpoint
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        ok: false
      });
    }

    const trimmedEmail = email.trim().slice(0, 200);
    if (!isValidEmail(trimmedEmail)) {
      return res.status(400).json({
        ok: false
      });
    }

    // Validate message
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        ok: false
      });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0 || trimmedMessage.length > 5000) {
      return res.status(400).json({
        ok: false
      });
    }

    // Sanitize name (optional)
    const trimmedName = name && typeof name === 'string' ? name.trim().slice(0, 120) : null;

    // Send email
    const transporter = createTransporter();
    if (!transporter) {
      console.error(`${new Date().toISOString()} Contact request failed: SMTP not configured`);
      return res.status(500).json({
        ok: false
      });
    }

    const emailBody = `---
New website contact message

Name: ${trimmedName || '-'}
Email: ${trimmedEmail}

Message:
${trimmedMessage}

Received at: ${new Date().toISOString()}
Website origin: KOMPLYINT OY website
---`;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'info@komplyint.fi',
      replyTo: trimmedEmail,
      subject: 'Website contact message',
      text: emailBody
    });

    console.log(`${new Date().toISOString()} Contact request sent successfully`);

    // Return success response
    res.status(200).json({
      ok: true
    });

  } catch (error) {
    console.error(`${new Date().toISOString()} Contact request failed: ${error.message}`);
    res.status(500).json({
      ok: false
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`KOMPLYINT website backend running on http://localhost:${PORT}`);
});

