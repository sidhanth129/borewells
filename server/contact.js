const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Rate limiting - 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: 'Too many contact form submissions from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Validation function
const validateContactForm = (data) => {
  const { name, phone, email, message } = data;
  
  if (!name || name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  
  if (!phone || !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
    return 'Please provide a valid 10-digit phone number';
  }
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please provide a valid email address';
  }
  
  if (!message || message.trim().length < 10) {
    return 'Message must be at least 10 characters long';
  }
  
  return null;
};

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    
    // Validate input
    const validationError = validateContactForm(req.body);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('Email configuration error:', verifyError);
      return res.status(500).json({
        success: false,
        message: 'Email service is not properly configured. Please try again later.'
      });
    }

    // Email content to business owner
    const businessEmailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Use your configured email as sender
      to: 'shrinidhi.jagannath@gmail.com',
      replyTo: email, // Set reply-to as the customer's email
      subject: `New Contact Form Submission - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background-color: #000000; color: #ffffff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Shrinidhi Borewells</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px;">New Contact Form Submission</p>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px; margin-top: 0;">
              Contact Details
            </h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333; width: 100px;">Name:</td>
                  <td style="padding: 8px 0; color: #555;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
                  <td style="padding: 8px 0; color: #555;">
                    <a href="tel:${phone}" style="color: #0066cc; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                  <td style="padding: 8px 0; color: #555;">
                    <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>
                  </td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 2px solid #e0e0e0; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0; font-size: 18px;">Message:</h3>
              <p style="line-height: 1.6; color: #555; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                <strong>Submission Details:</strong><br>
                Submitted: ${new Date().toLocaleString('en-IN', { 
                  timeZone: 'Asia/Kolkata',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}<br>
                Source: Shrinidhi Borewells Website Contact Form
              </p>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #f0f0f0; border-radius: 8px; text-align: center;">
              <h3 style="color: #333; margin-top: 0;">Quick Actions</h3>
              <div style="margin: 15px 0;">
                <a href="tel:${phone}" style="display: inline-block; background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px;">
                  📞 Call ${name}
                </a>
                <a href="mailto:${email}" style="display: inline-block; background-color: #0066cc; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px;">
                  ✉️ Reply via Email
                </a>
              </div>
            </div>
          </div>
          
          <div style="background-color: #f8f8f8; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0; color: #888; font-size: 12px;">
              This email was automatically generated from your website contact form.<br>
              Shrinidhi Borewells | Est. 2018 | Member of KROA<br>
              📧 shrinidhi.jagannath@gmail.com | 📱 9845000962
            </p>
          </div>
        </div>
      `
    };

    // Auto-reply email to customer
    const customerEmailOptions = {
      from: `"Shrinidhi Borewells" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting Shrinidhi Borewells',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background-color: #000000; color: #ffffff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Shrinidhi Borewells</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Thank you for your inquiry</p>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="color: #333; margin-top: 0;">Dear ${name},</h2>
            
            <p style="color: #555; line-height: 1.6;">
              Thank you for contacting Shrinidhi Borewells. We have received your message and will get back to you within 24 hours.
            </p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
              <p style="color: #555; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Contact Information:</h3>
              <p style="color: #555; margin: 5px 0;">📞 Phone: <a href="tel:9845000962" style="color: #0066cc;">9845000962</a></p>
              <p style="color: #555; margin: 5px 0;">📧 Email: <a href="mailto:shrinidhi.jagannath@gmail.com" style="color: #0066cc;">shrinidhi.jagannath@gmail.com</a></p>
              <p style="color: #555; margin: 5px 0;">📍 Location: Bengaluru, Karnataka</p>
              <p style="color: #555; margin: 5px 0;">🕒 Working Hours: Monday - Saturday, 8:00 AM - 6:00 PM</p>
            </div>
            
            <p style="color: #555; line-height: 1.6;">
              For urgent matters, please feel free to call us directly at <strong>9845000962</strong>.
            </p>
            
            <p style="color: #555; line-height: 1.6;">
              Best regards,<br>
              <strong>Mr. Jagannath B.S.</strong><br>
              Owner, Shrinidhi Borewells<br>
              Member of KROA (Karnataka Rig Owners Association)
            </p>
          </div>
          
          <div style="background-color: #f8f8f8; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0; color: #888; font-size: 12px;">
              Shrinidhi Borewells | Est. 2018 | Member of KROA<br>
              📧 shrinidhi.jagannath@gmail.com | 📱 9845000962
            </p>
          </div>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(businessEmailOptions),
      transporter.sendMail(customerEmailOptions)
    ]);

    // Log the contact (for debugging)
    console.log(`New contact form submission from ${name} (${email}) at ${new Date().toISOString()}`);

    res.json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Shrinidhi Borewells Contact API'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`Contact API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Contact endpoint: http://localhost:${PORT}/api/contact`);
});

module.exports = app;