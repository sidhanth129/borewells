# Shrinidhi Borewells Website

A modern, responsive website for Shrinidhi Borewells - a trusted borewell service provider in Bengaluru.

## Features

- **Modern Design**: Clean black & white aesthetic with smooth transitions
- **Dark/Light Mode**: Toggle between themes with localStorage persistence
- **Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Animated Gallery**: CSS clip-path styling with hover effects and filtering
- **Contact Form**: Functional form with backend email integration
- **Professional Layout**: Multiple pages with smooth navigation
- **KROA Certificate Display**: Modal popup for membership certificate
- **Enhanced Logo**: Hover animation effects

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Lucide React for icons

### Backend
- Node.js with Express
- Nodemailer for email functionality
- CORS and security middleware
- Rate limiting for API protection

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp server/.env.example server/.env
   ```
   Edit `server/.env` with your Gmail credentials.

4. Add required images to the public folder:
   - `owner-photo.jpg` - Photo of Mr. Jagannath B.S.
   - `kroa-certificate.jpg` - KROA membership certificate

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Start the backend server (in a separate terminal):
   ```bash
   npm run server
   ```

## Adding/Changing Images

### Owner Photo
1. Add your owner photo as `/public/owner-photo.jpg`
2. Recommended size: 400x400px or larger (square aspect ratio)
3. Supported formats: JPG, PNG, WebP

### KROA Certificate
1. Add your KROA certificate as `/public/kroa-certificate.jpg`
2. Recommended size: High resolution for clear viewing
3. Supported formats: JPG, PNG, PDF (convert to image first)

### Easy Image Management
```bash
# Navigate to the public folder
cd public/

# Replace owner photo
# Simply copy your image file and rename it to owner-photo.jpg

# Replace KROA certificate
# Simply copy your certificate image and rename it to kroa-certificate.jpg
```

## Email Configuration

To enable the contact form:

1. Use a Gmail account
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Google Account Settings
   - Security > 2-Step Verification > App passwords
   - Create a new app password
4. Add credentials to `server/.env`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.tsx      # Navigation header with KROA modal
│   └── Footer.tsx      # Site footer
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Theme management
├── pages/              # Page components
│   ├── Home.tsx        # Homepage with services & about sections
│   ├── Gallery.tsx     # Image gallery
│   └── Contact.tsx     # Contact form
└── App.tsx             # Main app component

server/
└── index.js            # Express server

public/
├── owner-photo.jpg     # Owner's photograph (add this file)
├── kroa-certificate.jpg # KROA certificate (add this file)
└── WhatsApp Image...   # Logo file
```

## Navigation Features

- **Home**: Main landing page
- **Services**: Scrolls to services section on homepage
- **About**: Scrolls to about owner section on homepage
- **Gallery**: Dedicated gallery page
- **Contact**: Contact form page
- **KROA Certificate**: Click "Member of KROA" to view certificate modal

## Services Offered

- Borewell Drilling
- Redrilling
- Flushing
- Pump Installation
- Casing
- Borewell Scanning

## Contact Information

- **Phone**: 9845000962
- **Email**: shrinidhi.jagannath@gmail.com
- **Location**: Bengaluru, Karnataka
- **Owner**: Mr. Jagannath B.S.
- **Established**: 2018
- **Membership**: KROA (Karnataka Rig Owners Association)

## Deployment

The frontend can be deployed to:
- Vercel
- Netlify
- GitHub Pages

The backend can be deployed to:
- Render
- Railway
- Cyclic

## License

This project is private and proprietary to Shrinidhi Borewells.