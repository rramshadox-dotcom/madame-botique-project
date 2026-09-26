# Frontend Backend Connection Guide

## Setup

### 1. Backend Running
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

Backend runs on: `http://localhost:5000/api`

### 2. Use Connected Frontend

Replace your current `index.html` with `index-connected.html` OR update your existing `index.html` to load these scripts BEFORE `script.js`:

```html
<script>window.MADAME_API_URL = 'http://localhost:5000/api';</script>
<script src="frontend-api.js"></script>
<script src="backend-integration.js"></script>
<script src="script.js"></script>
```

### 3. Key Features Connected

✅ **Products**: Loaded from MongoDB backend
✅ **Authentication**: Login/Register with JWT tokens
✅ **Cart**: Stored in localStorage (frontend)
✅ **Orders**: Sent to backend with email + WhatsApp notifications
✅ **Contact Form**: Submitted to backend

### 4. Checkout Flow

When user clicks "Checkout":
1. Frontend collects cart items + shipping details
2. Sends POST request to `/api/orders`
3. Backend creates order in MongoDB
4. Email confirmation sent to customer
5. Admin notification email sent
6. WhatsApp message triggered
7. Order confirmation returned to frontend

### 5. Login/Register

Users can now:
- Register with email + password
- Login with JWT token (stored in localStorage)
- Token sent with every order request
- User data persisted across sessions

## Files Added

- `frontend-api.js` - API client wrapper
- `backend-integration.js` - Product loading from backend
- `index-connected.html` - Updated HTML with proper script order

## Environment

Update `window.MADAME_API_URL` in script tag if backend runs on different port/domain.
