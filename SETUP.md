# 💻 ANAM FASHION - Local Setup

## Prerequisites

- Node.js 18+
- Git
- MongoDB (local or Atlas)
- VS Code

## Clone Repository

```bash
git clone https://github.com/kadersk/Anam-Fashion-.git
cd Anam-Fashion-
```

## Backend Setup

```bash
cd backend
npm install

# Create .env.local
MONGODB_URI=mongodb://localhost:27017/anam_fashion
JWT_SECRET=dev-secret
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Start
npm run dev
```

## Frontend Setup

```bash
cd frontend
npm install

# Create .env.local
REACT_APP_API_URL=http://localhost:5000/api/v1

# Start
npm start
```

## Open Browser

Visit: http://localhost:3000

## Project Structure

```
Anam-Fashion-/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── ARCHITECTURE.md
├── DATABASE.md
├── API-ENDPOINTS.md
└── DEPLOYMENT.md
```
