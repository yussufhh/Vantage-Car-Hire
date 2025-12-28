# Vantage Car Hire - Complete Setup Guide

This guide will walk you through the complete setup process for the Vantage Car Hire platform.

## 📋 Prerequisites Checklist

Before starting, ensure you have:
- [ ] **Node.js** version 16 or higher ([Download](https://nodejs.org/))
- [ ] **Python** version 3.8 or higher ([Download](https://python.org/))
- [ ] **npm** (comes with Node.js)
- [ ] **pip** (comes with Python)
- [ ] **Git** (optional, for cloning)

### Verify Installation

```bash
node --version   # Should show v16.0.0 or higher
npm --version    # Should show 7.0.0 or higher
python3 --version # Should show 3.8.0 or higher
pip --version    # Should show pip version
```

## 🚀 Step-by-Step Setup

### Step 1: Get the Project

If you have Git:
```bash
git clone <repository-url>
cd Vantage-Car-Hire
```

Or download and extract the ZIP file, then navigate to the folder.

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Make setup scripts executable (Linux/Mac)
chmod +x start.sh run.sh

# Run the automated setup script
./start.sh
```

**What happens during setup:**
1. ✅ Creates Python virtual environment
2. ✅ Installs all required Python packages
3. ✅ Creates `.env` configuration file
4. ✅ Creates necessary directories
5. ✅ Initializes SQLite database
6. ✅ Populates database with sample data

**Expected Output:**
```
✅ Database initialized successfully!

📊 Summary:
  - Users: 4 (2 renters, 2 owners)
  - Cars: 8
  - Bookings: 3
  - Reviews: 3
  - Favorites: 4
  - Payment Methods: 2
  - Car Features: 40

🔑 Test Credentials:
  Renter Account:
    Email: ahmed@example.com
    Password: password123

  Owner Account:
    Email: ibrahim@example.com
    Password: password123
```

### Step 3: Frontend Setup

Open a NEW terminal window/tab:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file (if not exists)
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

**What happens during setup:**
1. ✅ Installs React and all dependencies
2. ✅ Installs TailwindCSS
3. ✅ Installs React Router
4. ✅ Installs Axios for API calls
5. ✅ Configures environment variables

## 🎮 Running the Application

### Option 1: Manual Start (Recommended for Development)

#### Terminal 1 - Backend
```bash
cd backend
./run.sh
```

Wait for:
```
 * Running on http://127.0.0.1:5000
 * Debugger is active!
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Wait for:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Option 2: Automated Start (Both at Once)

From the project root:
```bash
./start-all.sh
```

## 🌐 Accessing the Application

### Frontend
Open your browser and go to:
```
http://localhost:5173
```

### Backend API
The API is available at:
```
http://localhost:5000/api
```

Test it:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"message":"Vantage Car Hire API is running","status":"healthy"}
```

## 🔐 Testing the Application

### 1. Test Renter Flow

1. **Open Application**: Go to `http://localhost:5173`
2. **Click "Get Started"** or **"Sign In"** in navbar
3. **Login with Renter Credentials**:
   - Email: `ahmed@example.com`
   - Password: `password123`
4. **You'll be redirected to User Dashboard**
5. **Explore**:
   - View active bookings
   - Check favorites
   - Browse payment methods
   - Update profile

### 2. Test Owner Flow

1. **Logout** (if logged in)
2. **Click "Sign In"**
3. **Login with Owner Credentials**:
   - Email: `ibrahim@example.com`
   - Password: `password123`
4. **You'll be redirected to Owner Dashboard**
5. **Explore**:
   - View fleet management
   - Add new cars
   - Check bookings
   - View earnings
   - Manage reviews

### 3. Test Public Features

Without logging in:
- **Browse Fleet**: Click "Our Fleet" in navbar
- **Filter Cars**: Use category, price filters
- **View Details**: Click on any car
- **About Us**: Learn about the company
- **Services**: See service offerings
- **Contact**: View contact form and locations

## 🔧 Troubleshooting

### Backend Issues

#### "Port 5000 already in use"
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9

# Then restart
cd backend && ./run.sh
```

#### "Module not found" errors
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

#### Database issues
```bash
# Reset database with fresh data
cd backend
python init_db.py
```

### Frontend Issues

#### "Port 5173 already in use"
```bash
# Find and kill the process
lsof -ti:5173 | xargs kill -9

# Then restart
cd frontend && npm run dev
```

#### "Cannot find module" errors
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### "Network Error" or API not connecting
1. Verify backend is running on port 5000
2. Check `.env` file in frontend folder has:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
3. Restart both servers

### Common Issues

#### CORS Errors
- Backend should automatically handle CORS
- Check backend console for error messages
- Verify FRONTEND_URL in backend/.env matches your frontend URL

#### Login not working
1. Check browser console for errors (F12)
2. Verify backend is running and accessible
3. Check Network tab in DevTools for API calls
4. Ensure database was initialized properly

#### Dashboard not showing data
1. Verify you're logged in (check localStorage for `access_token`)
2. Check browser console for API errors
3. Test API directly: `curl http://localhost:5000/api/auth/me -H "Authorization: Bearer YOUR_TOKEN"`

## 📊 Database Management

### View Database
```bash
cd backend
sqlite3 vantage_car_hire.db

# Common commands
.tables                    # List all tables
SELECT * FROM user;        # View all users
SELECT * FROM car;         # View all cars
SELECT * FROM booking;     # View all bookings
.exit                      # Exit SQLite
```

### Reset Database
```bash
cd backend
python init_db.py
```

### Backup Database
```bash
cd backend
cp vantage_car_hire.db vantage_car_hire.db.backup
```

## 🧪 Testing API Endpoints

### Test Authentication
```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "email": "test@example.com",
    "phone": "+254700000000",
    "password": "test123",
    "user_type": "renter"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmed@example.com",
    "password": "password123"
  }'
```

### Test Car Endpoints
```bash
# Get all cars
curl http://localhost:5000/api/cars

# Filter by category
curl "http://localhost:5000/api/cars?category=SUV"

# Get single car
curl http://localhost:5000/api/cars/1
```

### Test Protected Endpoints
```bash
# Get current user (requires token)
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

## 🎨 Customization

### Change Colors
Edit `frontend/src/components/*.jsx` files:
- Primary: `#0F172A` (Deep Navy Blue)
- Accent: `#F97316` (Vibrant Orange)

### Add More Sample Data
Edit `backend/init_db.py` and run:
```bash
cd backend
python init_db.py
```

### Modify API Endpoints
Edit `backend/app.py` - the Flask server will auto-reload

## 📝 Development Workflow

### 1. Make Changes
- Frontend: Edit files in `frontend/src/`
- Backend: Edit `backend/app.py` or `backend/models.py`

### 2. Test Changes
- Frontend: Hot-reload automatic (Vite)
- Backend: Auto-reload enabled (Flask debug mode)

### 3. Debug
- Frontend: Browser DevTools (F12)
- Backend: Check terminal output

### 4. Commit Changes
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

## 🚀 Production Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Upload 'dist' folder to Vercel
# Set VITE_API_URL to production backend URL
```

### Backend (Heroku/Railway)
```bash
cd backend
# Add Procfile:
echo "web: gunicorn app:app" > Procfile

# Deploy with your provider
# Set environment variables
```

## 📚 Additional Resources

- [Backend API Documentation](backend/README.md)
- [API Testing Examples](backend/API_TESTING.md)
- [Main README](README.md)

## ✅ Setup Verification Checklist

Before using the app, verify:
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can access http://localhost:5173 in browser
- [ ] Database initialized (4 users, 8 cars created)
- [ ] Can login with test credentials
- [ ] API health check returns success
- [ ] No errors in browser console
- [ ] No errors in backend terminal

## 🎉 Success!

If you can:
1. ✅ Access the homepage
2. ✅ Login successfully
3. ✅ See dashboard with real data
4. ✅ Browse cars in fleet

**Congratulations! Your setup is complete!** 🚀

---

Need help? Check the troubleshooting section or review the logs in both terminal windows.
