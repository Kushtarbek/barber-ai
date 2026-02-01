# Starting the Blade & Brush Server

## macOS Network Permission Issue

If you see an error like `Error: listen EPERM: operation not permitted`, macOS is blocking Node.js from accessing the network.

### Solution: Grant Network Access to Node.js

1. **Open System Settings** (or System Preferences on older macOS)
2. Go to **Privacy & Security** → **Network**
3. Look for **Node.js** in the list
4. **Enable** network access for Node.js
5. You may need to restart your terminal after granting permission

### Alternative: Use a Different Port

If the permission issue persists, you can try using a port above 1024:

```bash
PORT=5000 node backend/server.js
```

Then access the app at: http://localhost:5000

### Quick Start (After Granting Permissions)

1. **Start the backend server:**
   ```bash
   npm run server
   ```

2. **In a new terminal, start the frontend dev server (optional, for development):**
   ```bash
   npm run dev
   ```

3. **Or just use the built version:**
   ```bash
   npm run build
   npm run server
   ```
   Then open: http://localhost:8888

### Verify Server is Running

Check if the server is responding:
```bash
curl http://localhost:8888/api/health
```

You should see: `{"status":"ok","message":"Blade & Brush API is running"}`
