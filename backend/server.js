const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize demo data if needed
require('./initDemoData');

// Import routes
const appointmentsRouter = require('./routes/appointments');
const customersRouter = require('./routes/customers');
const messagesRouter = require('./routes/messages');
const galleryRouter = require('./routes/gallery');

const app = express();
const PORT = process.env.PORT || 8080;
const API_PREFIX = '/api';

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increased limit for base64 images
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// API Routes
app.use(`${API_PREFIX}/appointments`, appointmentsRouter);
app.use(`${API_PREFIX}/customers`, customersRouter);
app.use(`${API_PREFIX}/messages`, messagesRouter);
app.use(`${API_PREFIX}/gallery`, galleryRouter);

// Health check endpoint
app.get(`${API_PREFIX}/health`, (req, res) => {
  res.json({ status: 'ok', message: 'Blade & Brush API is running' });
});

// Serve static files from dist directory
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath, {
  // Don't serve index.html for static files - let SPA route handle it
  index: false
}));

// SPA fallback - serve index.html for all non-API routes
// This handles client-side routing (e.g., /admin)
app.get('*', (req, res, next) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith(API_PREFIX)) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // For all other routes (like /admin), serve index.html for SPA routing
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send('Error loading application');
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`✅ Blade & Brush API server running on http://localhost:${PORT}`);
  console.log(`   API endpoints available at http://localhost:${PORT}${API_PREFIX}`);
  console.log(`   Frontend available at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});

module.exports = app;
