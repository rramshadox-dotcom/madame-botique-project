# Frontend API integration

The backend is available through `window.MadameAPI`.

Add these lines before `script.js` in `index.html`:

```html
<script>window.MADAME_API_URL = 'http://localhost:5000/api';</script>
<script src="frontend-api.js"></script>
<script src="script.js"></script>
```

Example usage:

```javascript
MadameAPI.getProducts('sale').then(products => console.log(products));
MadameAPI.login({ email, password }).then(({ token, user }) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));
});
```

The current `script.js` still contains its local fallback catalog and localStorage cart. Use `MadameAPI.getProducts()` for live catalog data and send checkout data with `MadameAPI.createOrder()` after the customer signs in.
