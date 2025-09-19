const express = require('express');
const path = require('path');
const app = express();

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d',
  etag: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// NUCLEAR OPTION: Force all routes to serve index.html
app.get('*', (req, res) => {
  console.log(`Requested: ${req.path}`);
  
  // Always serve index.html for SPA routing
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      // Fallback: send basic HTML
      res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Loading...</title></head>
        <body>
          <div id="root">Loading...</div>
          <script>
            // Force redirect to hash version
            const path = window.location.pathname;
            if (path !== '/' && !window.location.hash) {
              window.location.replace('/#' + path);
            }
          </script>
        </body>
        </html>
      `);
    } else {
      console.log(`Served index.html for: ${req.path}`);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 NUCLEAR SPA SERVER running on port ${port}`);
  console.log(`📁 Serving from: ${path.join(__dirname, 'dist')}`);
  console.log(`🔥 ALL ROUTES → index.html`);
});
