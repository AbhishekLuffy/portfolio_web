const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Log .env variables to check if they are loaded correctly
console.log('GMAIL_USER:', process.env.GMAIL_USER);
console.log('GMAIL_PASS length:', process.env.GMAIL_PASS ? process.env.GMAIL_PASS.length : 0);

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
  res.send('Portfolio backend is live ✅');
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('FATAL: Nodemailer transporter verification failed.', error);
    process.exit(1); // Exit the process with an error code
  } else {
    console.log('Server is ready to take messages');
  }
});

// API endpoint for sending emails
app.post('/api/contact', async (req, res) => {
  console.log('Received /api/contact request with body:', req.body);
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please enter all fields.' });
  }

  const mailOptions = {
    from: `"Your Name" <${process.env.GMAIL_USER}>`, // Sender address
    to: process.env.GMAIL_USER, // List of receivers
    replyTo: email, // Reply to the form user's email
    subject: `New Contact Form Submission from ${name}`, // Subject line
    text: `You have a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // Plain text body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${mailOptions.to}`);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending failed with error:', error);
    res.status(500).json({ error: 'Email sending failed', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}); 