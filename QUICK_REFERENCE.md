# 🚀 Vantage Car Hire - Quick Reference

## ⚡ Quick Start

```bash
# Backend
cd backend && ./start.sh    # First time only
cd backend && ./run.sh      # Every time

# Frontend (new terminal)
cd frontend && npm install  # First time only
cd frontend && npm run dev  # Every time
```

## 🔑 Test Accounts

| Type   | Email                    | Password     |
|--------|--------------------------|--------------|
| Renter | ahmed@example.com        | password123  |
| Owner  | ibrahim@example.com      | password123  |

## 🌐 URLs

| Service  | URL                          |
|----------|------------------------------|
| Frontend | http://localhost:5173        |
| Backend  | http://localhost:5000        |
| API      | http://localhost:5000/api    |

## 📋 Common Commands

### Backend
```bash
# Start server
cd backend && ./run.sh

# Reset database
cd backend && python init_db.py

# View database
cd backend && sqlite3 vantage_car_hire.db
# Then: .tables, SELECT * FROM user;, .exit

# Test API
./test-api.sh
curl http://localhost:5000/api/health
```

### Frontend
```bash
# Start dev server
cd frontend && npm run dev

# Build for production
cd frontend && npm run build

# Reinstall dependencies
cd frontend && rm -rf node_modules && npm install
```

### Both
```bash
# Kill servers
lsof -ti:5000 | xargs kill -9    # Backend
lsof -ti:5173 | xargs kill -9    # Frontend

# Start both
./start-all.sh
```

## 📊 API Endpoints

### Auth
```bash
POST   /api/auth/signup          # Register
POST   /api/auth/login           # Login
GET    /api/auth/me              # Get user (🔒)
```

### Cars
```bash
GET    /api/cars                 # List all
GET    /api/cars/:id             # Get one
POST   /api/cars                 # Add (🔒 owner)
PUT    /api/cars/:id             # Update (🔒 owner)
GET    /api/owner/cars           # Owner's cars (🔒)
```

### Bookings
```bash
POST   /api/bookings             # Create (🔒)
GET    /api/bookings/user        # User's (🔒)
GET    /api/bookings/owner       # Owner's (🔒)
PUT    /api/bookings/:id/status  # Update (🔒)
```

### Other
```bash
POST   /api/reviews              # Add review (🔒)
GET    /api/favorites            # Get favorites (🔒)
POST   /api/favorites            # Add favorite (🔒)
GET    /api/dashboard/user/stats # User stats (🔒)
GET    /api/dashboard/owner/stats# Owner stats (🔒)
```

🔒 = Requires Authorization header with JWT token

## 🧪 Quick API Tests

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ahmed@example.com","password":"password123"}'
```

### Get Cars
```bash
curl http://localhost:5000/api/cars
curl "http://localhost:5000/api/cars?category=SUV"
curl "http://localhost:5000/api/cars?min_price=5000&max_price=10000"
```

### Protected Request
```bash
# First, get token from login response
TOKEN="your_token_here"

curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

## 📁 Project Structure

```
Vantage-Car-Hire/
├── backend/
│   ├── app.py              # Main Flask app
│   ├── models.py           # Database models
│   ├── init_db.py          # DB initialization
│   ├── requirements.txt    # Python packages
│   ├── start.sh            # Setup script
│   └── run.sh              # Start script
│
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api/            # API client
│   │   ├── App.jsx         # Main app
│   │   └── main.jsx        # Entry point
│   ├── package.json        # Dependencies
│   └── vite.config.js      # Vite config
│
└── README.md               # Documentation
```

## 🎨 Design Colors

```css
Primary:   #0F172A (Deep Navy Blue)
Accent:    #F97316 (Vibrant Orange)
Success:   #22C55E (Green)
Warning:   #F59E0B (Yellow)
Error:     #EF4444 (Red)
```

## 🗄️ Database Models

```
User
├── id, full_name, email, phone
├── password_hash, user_type
└── location, created_at

Car
├── id, owner_id, name, brand
├── model_year, category, daily_rate
├── transmission, seats, fuel_type
├── rating, status, location
└── total_bookings, total_earnings

Booking
├── id, user_id, car_id
├── pickup_date, return_date
├── total_amount, status
└── created_at

Review, Favorite, PaymentMethod, CarFeature
```

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port already in use | `lsof -ti:PORT \| xargs kill -9` |
| Module not found | Reinstall dependencies |
| Database error | Run `init_db.py` |
| CORS error | Check backend is running |
| Login fails | Verify credentials, check backend logs |
| API 401 error | Token expired, login again |

## 📝 Quick Edits

### Add a new API endpoint
Edit `backend/app.py`:
```python
@app.route('/api/your-endpoint', methods=['GET'])
def your_function():
    return jsonify({'data': 'value'}), 200
```

### Add a new frontend page
1. Create `frontend/src/components/YourPage.jsx`
2. Add route in `frontend/src/App.jsx`
3. Add nav link in `frontend/src/components/Navbar.jsx`

### Change database schema
1. Edit `backend/models.py`
2. Run `python init_db.py` to recreate DB
3. Restart backend

## 🎯 Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can login as renter
- [ ] Can login as owner
- [ ] Renter dashboard shows data
- [ ] Owner dashboard shows data
- [ ] API test script passes
- [ ] No console errors

## 📦 Sample Data

- 4 Users (2 renters, 2 owners)
- 8 Cars (SUV, Luxury, Economy)
- 3 Bookings (various statuses)
- 3 Reviews (all 5-star)
- 4 Favorites
- 2 Payment Methods
- 40+ Car Features

## 🚀 Deployment Quick

### Frontend (Vercel/Netlify)
```bash
npm run build
# Upload dist/ folder
# Set VITE_API_URL env var
```

### Backend (Heroku/Railway)
```bash
echo "web: gunicorn app:app" > Procfile
# Push to platform
# Set environment variables
```

## 🔗 Important Files

| File | Purpose |
|------|---------|
| README.md | Main documentation |
| SETUP_GUIDE.md | Detailed setup |
| API_TESTING.md | API examples |
| PROJECT_SUMMARY.md | Complete overview |
| VERIFICATION_CHECKLIST.md | Test checklist |

## 💡 Pro Tips

1. Always start backend before frontend
2. Check both terminals for errors
3. Use test credentials for quick testing
4. Run `./test-api.sh` after changes
5. Check browser console (F12) for frontend errors
6. Use `init_db.py` to reset data
7. Backend auto-reloads in debug mode
8. Frontend hot-reloads automatically

## 🎓 Learn More

- Flask Docs: https://flask.palletsprojects.com/
- React Docs: https://react.dev/
- SQLAlchemy: https://www.sqlalchemy.org/
- TailwindCSS: https://tailwindcss.com/
- Vite: https://vitejs.dev/

---

**Quick Help**: `cat QUICK_REFERENCE.md`
