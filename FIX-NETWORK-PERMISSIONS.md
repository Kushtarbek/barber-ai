# Fixing Network Permissions on macOS

## Option 1: Check Firewall Settings

1. Open **System Settings** (or System Preferences)
2. Go to **Network** → **Firewall**
3. Click **Options** or **Firewall Options**
4. Look for Node.js in the list of applications
5. Make sure it's set to **Allow incoming connections**

## Option 2: Grant Permission When Prompted

Sometimes macOS will show a popup when Node.js first tries to access the network:

1. Try running the server: `npm run server`
2. If a popup appears asking for network access, click **Allow**
3. You may need to enter your password

## Option 3: Check Full Disk Access

1. Open **System Settings**
2. Go to **Privacy & Security**
3. Scroll down to **Full Disk Access**
4. Click the lock icon and enter your password
5. Click the **+** button
6. Navigate to `/usr/local/bin/node` or wherever Node.js is installed
7. Add Node.js and make sure it's enabled

To find Node.js location:
```bash
which node
```

## Option 4: Use Terminal to Open Firewall Settings

Run this command to open Firewall settings directly:
```bash
open "x-apple.systempreferences:com.apple.preference.security?Firewall"
```

## Option 5: Temporary Workaround - Use Python Server

If you can't fix the Node.js permissions right now, you can use Python to serve the built files:

```bash
# Build the frontend
npm run build

# Serve with Python (this should work without permission issues)
cd dist
python3 -m http.server 8000
```

Then open: http://localhost:8000

**Note:** This only serves the frontend. The API won't work with this method, but you can at least see the website.

## Option 6: Disable Firewall Temporarily (Not Recommended)

Only for testing:
1. System Settings → Network → Firewall
2. Turn off Firewall temporarily
3. Try running the server
4. **Remember to turn it back on!**

## Still Having Issues?

Try running Node.js with sudo (not recommended for production, but might help identify the issue):
```bash
sudo npm run server
```

If this works, it confirms it's a permission issue. You'll need to grant proper permissions to Node.js.
