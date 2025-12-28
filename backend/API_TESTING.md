# API Testing Examples

Test these endpoints using curl, Postman, or your browser.

## Base URL
```
http://localhost:5000/api
```

## 1. Health Check
```bash
curl http://localhost:5000/api/health
```

## 2. User Registration (Renter)
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "email": "testuser@example.com",
    "phone": "+254700123456",
    "password": "password123",
    "user_type": "renter",
    "location": "Garissa, Kenya"
  }'
```

## 3. User Registration (Owner)
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Car Owner",
    "email": "owner@example.com",
    "phone": "+254700987654",
    "password": "password123",
    "user_type": "owner",
    "location": "Garissa, Kenya"
  }'
```

## 4. User Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmed@example.com",
    "password": "password123"
  }'
```

**Save the `access_token` from the response for authenticated requests!**

## 5. Get Current User (Protected)
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

## 6. Get All Cars
```bash
# All cars
curl http://localhost:5000/api/cars

# Filter by category
curl "http://localhost:5000/api/cars?category=SUV"

# Filter by price range
curl "http://localhost:5000/api/cars?min_price=5000&max_price=10000"

# Filter by location
curl "http://localhost:5000/api/cars?location=Airport"
```

## 7. Get Single Car
```bash
curl http://localhost:5000/api/cars/1
```

## 8. Add New Car (Owner Only, Protected)
```bash
curl -X POST http://localhost:5000/api/cars \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_OWNER_TOKEN_HERE" \
  -d '{
    "name": "Toyota RAV4",
    "brand": "Toyota",
    "model_year": 2023,
    "category": "SUV",
    "daily_rate": 7000,
    "location": "Garissa Town Center",
    "transmission": "Automatic",
    "seats": 5,
    "fuel_type": "Petrol",
    "luggage": 3,
    "description": "Compact SUV perfect for city and off-road",
    "image_url": "https://images.unsplash.com/photo-1234567890",
    "features": ["GPS", "Bluetooth", "Backup Camera"]
  }'
```

## 9. Get Owner's Cars (Protected)
```bash
curl http://localhost:5000/api/owner/cars \
  -H "Authorization: Bearer YOUR_OWNER_TOKEN_HERE"
```

## 10. Create Booking (Protected)
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_RENTER_TOKEN_HERE" \
  -d '{
    "car_id": 1,
    "pickup_date": "2024-02-01T10:00:00Z",
    "return_date": "2024-02-05T10:00:00Z",
    "pickup_location": "Garissa Town Center"
  }'
```

## 11. Get User Bookings (Protected)
```bash
curl http://localhost:5000/api/bookings/user \
  -H "Authorization: Bearer YOUR_RENTER_TOKEN_HERE"
```

## 12. Get Owner Bookings (Protected)
```bash
curl http://localhost:5000/api/bookings/owner \
  -H "Authorization: Bearer YOUR_OWNER_TOKEN_HERE"
```

## 13. Update Booking Status (Protected)
```bash
curl -X PUT http://localhost:5000/api/bookings/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "status": "Completed"
  }'
```

## 14. Add Review (Protected)
```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_RENTER_TOKEN_HERE" \
  -d '{
    "car_id": 1,
    "rating": 5,
    "comment": "Excellent car! Highly recommend!"
  }'
```

## 15. Get Car Reviews
```bash
curl http://localhost:5000/api/cars/1/reviews
```

## 16. Add to Favorites (Protected)
```bash
curl -X POST http://localhost:5000/api/favorites \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_RENTER_TOKEN_HERE" \
  -d '{
    "car_id": 1
  }'
```

## 17. Get Favorites (Protected)
```bash
curl http://localhost:5000/api/favorites \
  -H "Authorization: Bearer YOUR_RENTER_TOKEN_HERE"
```

## 18. Remove from Favorites (Protected)
```bash
curl -X DELETE http://localhost:5000/api/favorites/1 \
  -H "Authorization: Bearer YOUR_RENTER_TOKEN_HERE"
```

## 19. Add Payment Method (Protected)
```bash
curl -X POST http://localhost:5000/api/payment-methods \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "card_type": "Visa",
    "last_four": "1234",
    "expiry_month": 12,
    "expiry_year": 2025,
    "is_default": true
  }'
```

## 20. Get Payment Methods (Protected)
```bash
curl http://localhost:5000/api/payment-methods \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 21. Get User Dashboard Stats (Protected)
```bash
curl http://localhost:5000/api/dashboard/user/stats \
  -H "Authorization: Bearer YOUR_RENTER_TOKEN_HERE"
```

## 22. Get Owner Dashboard Stats (Protected)
```bash
curl http://localhost:5000/api/dashboard/owner/stats \
  -H "Authorization: Bearer YOUR_OWNER_TOKEN_HERE"
```

---

## Testing Workflow

### 1. Test Authentication Flow
1. Register a new renter user
2. Login with credentials
3. Save the access token
4. Get current user info

### 2. Test Car Browsing (No Auth Required)
1. Get all cars
2. Filter cars by category
3. Get single car details
4. Get car reviews

### 3. Test Renter Features (Requires Renter Auth)
1. Create a booking
2. Get user bookings
3. Add car to favorites
4. Get favorites
5. Add payment method
6. Add review
7. Get dashboard stats

### 4. Test Owner Features (Requires Owner Auth)
1. Register as owner
2. Add new car
3. Get owner's cars
4. Get owner bookings
5. Update car details
6. Get dashboard stats

---

## Common Response Formats

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Responses

**400 Bad Request**
```json
{
  "error": "Field is required"
}
```

**401 Unauthorized**
```json
{
  "error": "Invalid email or password"
}
```

**403 Forbidden**
```json
{
  "error": "Access denied"
}
```

**404 Not Found**
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error**
```json
{
  "error": "Server error message"
}
```

---

## Using with Frontend (JavaScript/React)

```javascript
// Configure axios
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests
const token = localStorage.getItem('access_token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Example: Login
const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  localStorage.setItem('access_token', response.data.access_token);
  return response.data;
};

// Example: Get cars
const getCars = async (filters = {}) => {
  const response = await api.get('/cars', { params: filters });
  return response.data;
};

// Example: Create booking
const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};
```
