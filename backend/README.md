# Madame Boutique Backend

Express API for the existing static boutique frontend.

## Run locally

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The API runs at `http://localhost:5000`.

## Endpoints

- `GET /api/health`
- `GET /api/products`
- `GET /api/products?category=sale`
- `GET /api/products/:id`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/orders`
- `GET /api/orders`
- `POST /api/contact`

The product catalog, users, and orders are currently in memory so the API can run immediately. Set `MONGODB_URI` and replace the in-memory stores with models before production deployment.
