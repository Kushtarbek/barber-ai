#!/bin/bash
# Blade & Brush - Run and open in browser

cd "$(dirname "$0")"

echo "🚀 Blade & Brush - Starting demo..."
echo ""

# Build if needed
if [ ! -f "dist/index.html" ]; then
  echo "📦 Building frontend..."
  npm run build
  echo ""
fi

# Check if server is already running
if curl -s http://localhost:8080/ > /dev/null 2>&1; then
  echo "✅ Server already running on http://localhost:8080"
else
  echo "🌐 Starting server on port 8080..."
  echo "   (Run in background - open a new terminal to stop with: pkill -f 'node backend/server.js')"
  node backend/server.js &
  sleep 2
fi

echo ""
echo "📂 Open in your browser:"
echo "   → http://localhost:8080"
echo ""
echo "Demo flow:"
echo "   1. Home page: Hero, Services, Gallery, About, Contact"
echo "   2. Click 'Admin' in the footer → Admin Dashboard"
echo "   3. Tabs: Overview, Appointments, Customers, Messages, Gallery"
echo "   4. Click '← Back to Website' to return"
echo ""

# Try to open browser (macOS)
if command -v open > /dev/null 2>&1; then
  open "http://localhost:8080" 2>/dev/null && echo "   Browser opened." || echo "   Open http://localhost:8080 manually."
fi
