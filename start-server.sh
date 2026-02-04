#!/bin/bash

# Tilek Studio - Server Startup Script
echo "🚀 Starting Tilek Studio server..."

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "📦 Building project first..."
    npm run build
fi

# Try to start the server
echo "🌐 Attempting to start server on port 8888..."

# Try Vite preview first
npm run preview -- --port 8888 --host 127.0.0.1 --open 2>&1 || {
    echo "⚠️  Vite preview failed, trying custom server..."
    node server.js
}
