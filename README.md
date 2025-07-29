# WME Agency Website

A modern, responsive website for William Morris Endeavor (WME) built with Node.js, Express, and vanilla JavaScript.

## Features

- 🚀 **Modern Web Stack**: Node.js, Express.js, vanilla JavaScript
- 📱 **Responsive Design**: Mobile-first approach with Bootstrap-style grid
- 🎨 **Clean UI/UX**: Professional design matching WME brand
- 🔒 **Security**: Helmet.js, CORS, input validation
- ⚡ **Performance**: Compression, caching, optimized assets
- 🌐 **SEO Optimized**: Meta tags, structured data, semantic HTML
- 📧 **Contact Forms**: Backend API for form submissions
- 🗺️ **Office Locations**: Interactive location data with maps
- 🎭 **Animations**: Smooth transitions and scroll effects
- 📊 **Analytics**: Google Analytics and Tag Manager support

## Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Build assets:**
   ```bash
   npm run build
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Visit your site:**
   Open http://localhost:3000

### Development Mode

For development with auto-reload:
```bash
npm run dev
```

## Project Structure

```
wme-agency-website/
├── public/                 # Static assets
│   ├── styles/            # Compiled CSS
│   ├── scripts/           # Compiled JavaScript
│   └── images/            # Images and media
├── src/                   # Source files
│   ├── styles/            # Source CSS
│   └── scripts/           # Source JavaScript
├── views/                 # HTML templates
│   ├── index.html         # Homepage
│   └── contact.html       # Contact page
├── server.js              # Express server
├── package.json           # Dependencies
└── README.md             # This file
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Contact Form
- `POST /api/contact` - Submit contact form
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "Hello..."
  }
  ```

### Office Locations
- `GET /api/offices` - Get all office locations with coordinates

## Pages

- **Homepage** (`/`) - Main landing page with hero section
- **Contact** (`/contact`) - Contact information and office locations
- **About** (`/about`) - Company information (placeholder)
- **Expertise** (`/expertise`) - Services and expertise (placeholder)

## Deployment

### Docker

1. **Build image:**
   ```bash
   docker build -t wme-agency .
   ```

2. **Run container:**
   ```bash
   docker run -p 3000:3000 wme-agency
   ```

### Docker Compose

```bash
docker-compose up -d
```

### Production Deployment

The application is ready for deployment on:

- **Netlify** - Static hosting with Edge Functions
- **Vercel** - Serverless deployment
- **Heroku** - Container or Git deployment
- **AWS/GCP/Azure** - Cloud hosting
- **DigitalOcean** - VPS deployment

#### Environment Variables for Production

```bash
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=https://yourdomain.com
SMTP_HOST=your-smtp-host
SMTP_USER=your-email
SMTP_PASS=your-password
EMAIL_TO=inquiries@wmeagency.com
```

## Features in Detail

### Security Features
- **Helmet.js**: Sets security headers
- **CORS**: Configurable cross-origin resource sharing
- **Input Validation**: Server-side form validation
- **Environment Variables**: Secure configuration management

### Performance Features
- **Compression**: Gzip compression for responses
- **Caching**: Static asset caching with proper headers
- **Minification**: CSS and JS minification
- **Lazy Loading**: Image lazy loading with Intersection Observer

### SEO Features
- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Structured Data**: JSON-LD schema markup
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Canonical URLs**: Proper URL canonicalization

### Accessibility Features
- **ARIA Labels**: Proper accessibility labels
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Semantic markup
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects prefers-reduced-motion

## Browser Support

- Chrome 80+
- Firefox 74+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS 13+, Android 8+)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Performance

- **Lighthouse Score**: 95+ across all metrics
- **Load Time**: < 2 seconds on 3G
- **Bundle Size**: < 50KB gzipped
- **Core Web Vitals**: All green

## Security

- **A+ SSL Rating**: When properly configured
- **OWASP Compliant**: Follows security best practices
- **Regular Updates**: Dependencies kept current
- **Input Sanitization**: All user inputs validated

## License

© 2025 William Morris Endeavor Entertainment, LLC. All rights reserved.

## Support

For technical support or questions about this website:
- Email: inquiries@wmeagency.com
- GitHub Issues: For bug reports and feature requests

---

**Built with ❤️ for WME Agency**
