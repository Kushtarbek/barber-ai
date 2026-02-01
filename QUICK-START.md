# Quick Start Guide

## Current Configuration

The server is configured to run on **port 8080** by default.

## Starting the Server

```bash
npm run server
```

Or explicitly:
```bash
npm run start:8080
```

Then open your browser to: **http://localhost:8080**

## Important: Network Permission Required

**The port change won't fix the permission issue.** You still need to grant Node.js network access on macOS.

### Quick Fix:

1. **Run the server:**
   ```bash
   npm run server
   ```

2. **Watch for a macOS popup** asking for network permission
   - Click **"Allow"** if it appears

3. **If no popup appears**, you need to manually grant permission:
   - Open **System Settings**
   - Search for **"firewall"** or go to **Network → Firewall**
   - Add Node.js (`/opt/homebrew/bin/node`) to allowed applications
   - Set it to **"Allow incoming connections"**

## Verify It's Working

After granting permissions, check:
```bash
curl http://localhost:8080/api/health
```

You should see:
```json
{"status":"ok","message":"Blade & Brush API is running"}
```

## Access the Application

- **Frontend:** http://localhost:8080
- **API Health:** http://localhost:8080/api/health
- **Admin Dashboard:** http://localhost:8080/admin

## Changing the Port

If you want to use a different port:

```bash
PORT=9000 npm run server
```

Then access at: http://localhost:9000

**Note:** You'll also need to update:
- `vite.config.ts` (proxy target)
- `src/api/client.ts` (API_BASE_URL)

Or set the environment variable:
```bash
export VITE_API_URL=http://localhost:9000/api
npm run build
```
