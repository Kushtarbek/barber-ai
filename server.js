const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8888;
const distDir = path.join(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);
  
  // Security: prevent directory traversal
  if (!filePath.startsWith(distDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // If file not found, serve index.html for SPA routing
        fs.readFile(path.join(distDir, 'index.html'), (err, content) => {
          if (err) {
            res.writeHead(404);
            res.end('File not found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Try localhost first, fallback to 127.0.0.1
const host = 'localhost';

server.listen(PORT, host, () => {
  console.log(`✅ Server running at http://${host}:${PORT}/`);
  console.log(`   Also available at http://127.0.0.1:${PORT}/`);
  console.log('Press Ctrl+C to stop the server');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Try a different port.`);
  } else if (err.code === 'EPERM') {
    console.error(`❌ Permission denied. You may need to:`);
    console.error(`   1. Grant network access to Node.js in System Settings`);
    console.error(`   2. Try a different port (edit server.js)`);
    console.error(`   3. Run: sudo npm run serve (not recommended)`);
  } else {
    console.error(`❌ Server error: ${err.message}`);
  }
  process.exit(1);
});
