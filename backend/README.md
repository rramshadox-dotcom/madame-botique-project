# Madame Boutique Backend

## Setup

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

## Features
- MongoDB-backed product catalog
- JWT auth for users
- Order creation with email + WhatsApp confirmation
- Contact form submissions
- CORS-enabled API

## API endpoints
- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/orders`
- `GET /api/orders`
- `POST /api/contact`
