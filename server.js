const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://www.wmeagency.com", "https://dsqvyt2qb7cgs.cloudfront.net"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://www.wmeagency.com"],
            imgSrc: ["'self'", "data:", "https:", "https://dsqvyt2qb7cgs.cloudfront.net"],
            fontSrc: ["'self'", "https:", "data:"],
            connectSrc: ["'self'", "https://www.google-analytics.com", "https://www.googletagmanager.com"],
            frameSrc: ["'self'", "https://www.googletagmanager.com"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: []
        }
    }
}));

// Compression middleware
app.use(compression());

// CORS middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use(express.static('public', {
    maxAge: '1y',
    etag: true,
    lastModified: true
}));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime() 
    });
});

// Contact form submission endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message, subject } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ 
            error: 'Missing required fields', 
            required: ['name', 'email', 'message'] 
        });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            error: 'Invalid email format' 
        });
    }
    
    // Here you would typically send the email or save to database
    console.log('Contact form submission:', { name, email, subject, message });
    
    res.json({ 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon.' 
    });
});

// Office locations API
app.get('/api/offices', (req, res) => {
    const offices = [
        {
            id: 'los-angeles',
            name: 'Los Angeles',
            address: '9601 Wilshire Blvd\nBeverly Hills, CA 90210',
            phone: '310-285-9000',
            coordinates: { lat: 34.0678186, lng: -118.403733 }
        },
        {
            id: 'new-york',
            name: 'New York',
            address: '11 Madison Avenue\nNew York, NY 10010',
            phone: '212-586-5100',
            coordinates: { lat: 40.7416326, lng: -73.9870711 }
        },
        {
            id: 'nashville',
            name: 'Nashville',
            address: '1201 Demonbreun\nNashville, TN 37203',
            phone: '615-963-3000',
            coordinates: { lat: 36.1539262, lng: -86.7869553 }
        },
        {
            id: 'london',
            name: 'London',
            address: '100 New Oxford St\nLondon WC1A 1HB',
            phone: '+44 20 8929 8400',
            coordinates: { lat: 51.5168556, lng: -0.1283434 }
        },
        {
            id: 'chicago',
            name: 'Chicago',
            address: '121 West Wacker Drive\nChicago, IL 60601',
            phone: '312-275-8201',
            coordinates: { lat: 41.886652, lng: -87.6318694 }
        },
        {
            id: 'washington-dc',
            name: 'Washington D.C.',
            address: '1666 Connecticut Ave NW #550\nWashington, DC 20009',
            phone: '(202) 328-3282',
            coordinates: { lat: 38.912322, lng: -77.045446 }
        },
        {
            id: 'miami',
            name: 'Miami',
            address: '150 Alhambra Plaza Suite 950\nCoral Gables, FL 33134',
            phone: '+1 (305) 447-6382',
            coordinates: { lat: 25.7519569, lng: -80.2578024 }
        },
        {
            id: 'sydney',
            name: 'Sydney',
            address: 'Level 45, 25 Martin Place\nSydney NSW 2000 Australia',
            phone: '+61 2 8046 0300',
            coordinates: { lat: -33.867846, lng: 151.209641 }
        }
    ];
    
    res.json(offices);
});

// 404 handler
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});

app.listen(PORT, () => {
    console.log(`🚀 WME Agency server running on port ${PORT}`);
    console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
});

module.exports = app;
