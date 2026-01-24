# Blade & Brush - Server Setup

## Quick Start

The project has been built successfully. To view it in your browser:

### Option 1: Use Vite Preview (Recommended)
```bash
npm run preview
```
This will start a server and automatically open your browser.

### Option 2: Use Custom Node Server
```bash
npm run serve
```
This uses a simple Node.js HTTP server on port 8888.

### Option 3: Use Python HTTP Server
```bash
cd dist
python3 -m http.server 8888
```
Then open http://127.0.0.1:8888 in your browser.

### Option 4: Use http-server
```bash
npx http-server dist -p 8888 -o
```

## If You Get Permission Errors

If you encounter "EPERM: operation not permitted" errors, this is a macOS security restriction. You may need to:

1. **Grant Network Access to Node.js:**
   - Go to System Settings > Privacy & Security > Network
   - Allow Node.js to accept incoming network connections

2. **Check Firewall Settings:**
   - System Settings > Network > Firewall
   - Make sure Node.js is allowed

3. **Try a Different Port:**
   - Edit `vite.config.ts` or `server.js` to use a different port (e.g., 5000, 3001, 9000)

## Development Mode

For development with hot reload:
```bash
npm run dev
```

The built files are in the `dist/` folder and can be served by any static file server.
