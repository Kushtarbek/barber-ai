#!/bin/bash

# Tilek Studio - Server Startup Script
echo "🚀 Starting Tilek Studio server..."

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "📦 Building project first..."
    npm run build
fi

# Try to start the server
echo "🌐 Attempting to start server on port 5000..."
echo ""
echo "If you see a permission error, you may need to:"
echo "1. Open System Settings → Network → Firewall"
echo "2. Click 'Options' and allow Node.js"
echo "3. Or go to Privacy & Security → Full Disk Access and add Node.js"
echo ""
echo "Node.js location: $(which node)"
echo ""

# Try to start the server
node backend/server.js
