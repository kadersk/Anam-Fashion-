# ANAM FASHION - Backend

## Setup

```bash
cd backend
npm install

# Create .env
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Start

```bash
npm run dev
```

## API Endpoints

- POST /api/v1/auth/register
- POST /api/v1/auth/login
- GET /api/v1/customers
- POST /api/v1/customers
- GET /api/v1/orders
- POST /api/v1/orders
- GET /api/v1/invoices
- POST /api/v1/invoices
- GET /api/v1/dashboard/stats
