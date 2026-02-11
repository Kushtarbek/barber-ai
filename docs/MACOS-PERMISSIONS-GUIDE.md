# macOS Network Permissions Guide

## The Problem

You're seeing: `Error: listen EPERM: operation not permitted`

This means macOS is blocking Node.js from creating network connections.

## Solution Steps for macOS 26.2

### Step 1: Open System Settings
Press `Cmd + Space` and type "System Settings", then press Enter.

### Step 2: Find Network/Firewall Settings

Try these locations (the exact path may vary):

**Option A: Network Settings**
1. Click **Network** in the sidebar
2. Look for **Firewall** or **Advanced** settings
3. Click to open firewall options

**Option B: Privacy & Security**
1. Click **Privacy & Security** in the sidebar
2. Scroll down and look for:
   - **Firewall**
   - **Network Access**
   - **Full Disk Access**

**Option C: Search**
1. Use the search bar at the top of System Settings
2. Type "firewall" or "network"
3. Click on the relevant result

### Step 3: Allow Node.js

Once you find Firewall/Network settings:

1. Click the **lock icon** (if present) and enter your password
2. Look for **Node.js** in the list of applications
3. If Node.js is not listed:
   - Click **+** or **Add Application**
   - Navigate to: `/opt/homebrew/bin/node` (or run `which node` to find it)
   - Add it to the list
4. Make sure Node.js is set to **Allow incoming connections**

### Step 4: Alternative - Try Running in Foreground

Sometimes macOS will show a permission popup when you run the server:

```bash
cd "/Users/kushtartyn/Desktop/development/2026/Tilek Studio"
npm run server
```

**Watch for a popup** that says something like:
- "Node.js would like to accept incoming network connections"
- Click **Allow** if it appears

### Step 5: Restart Terminal

After changing permissions:
1. Close your terminal completely
2. Open a new terminal
3. Try running the server again

## Quick Test

After granting permissions, test with:

```bash
cd "/Users/kushtartyn/Desktop/development/2026/Tilek Studio"
npm run server
```

You should see:
```
✅ Tilek Studio API server running on http://localhost:5000
```

Then open your browser to: **http://localhost:5000**

## Still Not Working?

1. **Check if Node.js path is correct:**
   ```bash
   which node
   ```
   Make sure this path is added to Firewall/Network settings

2. **Try running with explicit path:**
   ```bash
   /opt/homebrew/bin/node backend/server.js
   ```

3. **Check System Logs:**
   - Open Console.app
   - Look for Node.js related errors

4. **Contact Support:**
   - Share the exact error message
   - Share your macOS version (you're on 26.2)
   - Share the output of `which node`

## Temporary Workaround

If you just want to see the website (without the API working), you can use Python:

```bash
cd "/Users/kushtartyn/Desktop/development/2026/Tilek Studio"
npm run build
cd dist
python3 -m http.server 8000
```

Then open: **http://localhost:8000**

Note: The admin features won't work with this method, but you can see the website.
