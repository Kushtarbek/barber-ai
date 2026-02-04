# Tilek Studio - Setup Guide

## Overview

Tilek Studio is a barbershop website with a React frontend and Express.js backend API.

## Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Frontend

```bash
npm run build
```

### 3. Start the Backend Server

```bash
npm run server
```

The server will start on `http://localhost:3001` and serve both the API and the frontend.

### 4. Access the Application

- Frontend: http://localhost:3001
- API: http://localhost:3001/api
- Health Check: http://localhost:3001/api/health

## Development Mode

For development with hot reload:

### Terminal 1 - Backend Server
```bash
npm run server
```

### Terminal 2 - Frontend Dev Server
```bash
npm run dev
```

The frontend dev server will run on `http://localhost:5173` (or another port) and proxy API requests to the backend.

## Project Structure

```
blade-brush/
├── backend/
│   ├── data/              # JSON data files (auto-created)
│   ├── routes/            # API route handlers
│   ├── dataStorage.js     # Data access layer
│   ├── server.js         # Express server
│   └── initDemoData.js   # Demo data initialization
├── src/
│   ├── api/
│   │   └── client.ts     # API client for frontend
│   ├── components/       # React components
│   ├── App.tsx
│   └── main.tsx
├── dist/                 # Built frontend files
└── package.json
```

## API Endpoints

See `backend/README.md` for detailed API documentation.

### Quick Reference

- **Appointments**: `/api/appointments`
- **Customers**: `/api/customers`
- **Messages**: `/api/messages`
- **Gallery**: `/api/gallery`
- **Health**: `/api/health`

## Data Storage

Data is stored in JSON files in `backend/data/`:
- `appointments.json`
- `customers.json`
- `messages.json`
- `gallery.json`

Demo data is automatically initialized on first server start.

## Environment Variables

Create a `.env` file in the root directory (optional):

```
PORT=3001
VITE_API_URL=http://localhost:3001/api
```

## Troubleshooting

### Port Already in Use

If port 3001 is already in use, you can change it:

1. Set `PORT` environment variable: `PORT=3002 npm run server`
2. Or edit `backend/server.js` to change the default port

### API Not Responding

1. Make sure the backend server is running: `npm run server`
2. Check the console for errors
3. Verify the API health endpoint: http://localhost:3001/api/health

### Frontend Can't Connect to API

1. In development, make sure Vite proxy is configured (see `vite.config.ts`)
2. In production, set `VITE_API_URL` environment variable before building

## Production Deployment

1. Build the frontend:
```bash
npm run build
```

2. Start the server:
```bash
npm run server
```

The server will serve both the API and the built frontend from the `dist/` directory.

## Next Steps

- Consider migrating from JSON files to a proper database (PostgreSQL, MongoDB, etc.)
- Add authentication for the admin dashboard
- Implement email notifications for appointments
- Add image upload to cloud storage instead of base64
