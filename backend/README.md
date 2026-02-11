# Tilek Studio Backend API

This is the backend API server for the Tilek Studio barbershop website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the backend server:
```bash
npm run server
# or
npm start
```

The server will run on `http://localhost:8080` by default.

## API Endpoints

All API endpoints are prefixed with `/api`. Base URL: `http://localhost:8080/api`

### Health Check

- `GET /api/health` - Check if API is running

### Appointments

- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

**Appointment Object:**
```json
{
  "id": "string",
  "customerName": "string",
  "email": "string",
  "phone": "string",
  "service": "string",
  "date": "string",
  "time": "string",
  "status": "pending" | "confirmed" | "completed" | "cancelled"
}
```

### Customers

- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

**Customer Object:**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "lastVisit": "string",
  "totalVisits": "number"
}
```

### Messages

- `GET /api/messages` - Get all messages
- `GET /api/messages/:id` - Get message by ID
- `POST /api/messages` - Create new message
- `PUT /api/messages/:id` - Update message (e.g., mark as read)
- `DELETE /api/messages/:id` - Delete message

**Message Object:**
```json
{
  "id": "string",
  "customerName": "string",
  "email": "string",
  "phone": "string",
  "message": "string",
  "timestamp": "string",
  "read": "boolean"
}
```

### Gallery

- `GET /api/gallery` - Get all gallery images
- `GET /api/gallery/:id` - Get image by ID
- `POST /api/gallery` - Create new gallery image
- `PUT /api/gallery/:id` - Update gallery image
- `DELETE /api/gallery/:id` - Delete gallery image

**Gallery Image Object:**
```json
{
  "id": "string",
  "title": "string",
  "type": "Men" | "Women",
  "description": "string",
  "image": "string (base64 encoded)",
  "uploadedAt": "string"
}
```

### Social Embeds (Instagram / TikTok)

- `GET /api/socials` - Get all social media embeds
- `POST /api/socials` - Add embed (body: `{ "url": "https://instagram.com/reel/..." }`)
- `DELETE /api/socials/:id` - Remove embed by ID

**Social Embed Object:**
```json
{
  "id": "string",
  "platform": "instagram" | "tiktok",
  "url": "string",
  "embedUrl": "string",
  "createdAt": "string (ISO 8601)"
}
```

### Health Check

- `GET /api/health` - Check if API is running

## Data Storage

Data is stored in JSON files in the `backend/data/` directory:
- `appointments.json`
- `customers.json`
- `messages.json`
- `gallery.json`
- `socials.json`

The data directory is automatically created when the server starts.

## Development

The backend server also serves the frontend static files from the `dist/` directory. Make sure to build the frontend first:

```bash
npm run build
```

Then start the server:

```bash
npm run server
```

## Environment Variables

- `PORT` - Server port (default: 8080)

## Frontend Integration

The frontend is configured to use the API. In development mode, Vite proxies API requests to `http://localhost:8080/api`.

For production, set the `VITE_API_URL` environment variable to your API URL.
