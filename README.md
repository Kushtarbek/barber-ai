# Tilek Studio

A barbershop website with a React frontend and Express.js backend API. Features online booking, admin dashboard, gallery management, and Instagram/TikTok video embeds.

## Quick Start

```bash
npm install
npm run build
npm run server
```

Then open **http://localhost:8080**

- **Frontend:** http://localhost:8080
- **Admin Dashboard:** http://localhost:8080/admin
- **API Health:** http://localhost:8080/api/health

## API Endpoints

All endpoints are prefixed with `/api`. Base URL: `http://localhost:8080/api`

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Check if API is running |

### Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/appointments` | Get all appointments |
| `GET` | `/api/appointments/:id` | Get appointment by ID |
| `POST` | `/api/appointments` | Create new appointment |
| `PUT` | `/api/appointments/:id` | Update appointment |
| `DELETE` | `/api/appointments/:id` | Delete appointment |

### Customers

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/customers` | Get all customers |
| `GET` | `/api/customers/:id` | Get customer by ID |
| `POST` | `/api/customers` | Create new customer |
| `PUT` | `/api/customers/:id` | Update customer |
| `DELETE` | `/api/customers/:id` | Delete customer |

### Messages

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/messages` | Get all messages |
| `GET` | `/api/messages/:id` | Get message by ID |
| `POST` | `/api/messages` | Create new message |
| `PUT` | `/api/messages/:id` | Update message (e.g., mark as read) |
| `DELETE` | `/api/messages/:id` | Delete message |

### Gallery

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gallery` | Get all gallery images |
| `GET` | `/api/gallery/:id` | Get image by ID |
| `POST` | `/api/gallery` | Create new gallery image |
| `PUT` | `/api/gallery/:id` | Update gallery image |
| `DELETE` | `/api/gallery/:id` | Delete gallery image |

### Social Embeds (Instagram / TikTok)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/socials` | Get all social media embeds |
| `POST` | `/api/socials` | Add embed (body: `{ "url": "https://..." }`) |
| `DELETE` | `/api/socials/:id` | Remove embed by ID |

## Project Structure

```
Tilek Studio/
├── backend/                 # Express.js API server
│   ├── data/               # JSON data files (auto-created, gitignored)
│   ├── routes/             # API route handlers
│   │   ├── appointments.js
│   │   ├── customers.js
│   │   ├── gallery.js
│   │   ├── messages.js
│   │   └── socials.js
│   ├── utils/              # Shared utilities
│   │   └── socials.js      # Instagram/TikTok embed helpers
│   ├── dataStorage.js      # Data access layer
│   ├── initDemoData.js     # Demo data initialization
│   ├── server.js           # Express app entry point
│   └── README.md           # Backend API documentation
│
├── src/                    # React frontend source
│   ├── api/
│   │   └── client.ts       # TypeScript API client
│   ├── components/
│   │   ├── About.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── Footer.tsx
│   │   ├── Gallery.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── SocialEmbed.tsx
│   │   └── ...
│   ├── App.tsx
│   └── main.tsx
│
├── public/                 # Static assets
│   └── images/            # Service and gallery images
│
├── docs/                   # Documentation
│   ├── QUICK-START.md
│   ├── SETUP.md
│   ├── MACOS-PERMISSIONS-GUIDE.md
│   └── ...
│
├── dist/                   # Built frontend (gitignored)
├── index.html
├── style.css
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (frontend only) |
| `npm run build` | Build frontend to `dist/` |
| `npm run server` | Start backend API + serve frontend |
| `npm start` | Alias for `npm run server` |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8080` | Backend server port |
| `VITE_API_URL` | `http://localhost:8080/api` | API base URL (set before build) |

## Documentation

- [Backend API](backend/README.md) - Detailed API documentation
- [docs/](docs/) - Setup guides, troubleshooting, and server docs

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Backend:** Express.js, Node.js
- **Storage:** JSON files (backend/data/)
