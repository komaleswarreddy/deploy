const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing - return index.html for all non-API routes
app.get('*', (req, res) => {
  console.log(`Requested path: ${req.path}`);
  
  // Check if the request is for a static file (has file extension)
  if (req.path.includes('.') && !req.path.endsWith('/')) {
    console.log(`Static file requested: ${req.path}`);
    return res.status(404).send('File not found');
  }
  
  console.log(`Serving index.html for route: ${req.path}`);
  // For all other routes, serve the React app
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(`Successfully served index.html for: ${req.path}`);
    }
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Test server running on port ${port}`);
  console.log(`Serving static files from: ${path.join(__dirname, 'dist')}`);
  console.log(`Try visiting: http://localhost:${port}/profile`);
});
