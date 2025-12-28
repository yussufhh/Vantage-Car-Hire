# Vantage Car Hire - Complete Car Rental Platform

A professional, full-stack car rental platform with dual user types (renters and car owners) built with React, Flask, and SQLite3.

## 🌟 Features

### For Renters
- **Browse Fleet**: View and filter cars by category, price, and location
- **Advanced Search**: Find the perfect car with smart filtering
- **Booking System**: Easy reservation with real-time availability
- **Reviews & Ratings**: Read and write reviews for cars
- **Favorites**: Save favorite cars for quick access
- **Payment Management**: Securely store payment methods
- **User Dashboard**: Track bookings, manage profile, view loyalty points

### For Car Owners
- **Fleet Management**: Add, edit, and manage car listings
- **Booking Management**: View and manage reservations
- **Earnings Analytics**: Track revenue and performance
- **Review Monitoring**: See customer feedback
- **Dashboard Analytics**: Real-time stats and insights

## 🏗️ Technology Stack

### Frontend
- **React 18** with Vite
- **React Router v6** for navigation
- **TailwindCSS** for styling
- **Axios** for API communication
- **Modern UI/UX** with responsive design

### Backend
- **Flask 3.0** REST API
- **SQLAlchemy** ORM
- **SQLite3** database
- **JWT** authentication
- **Flask-CORS** for cross-origin requests
- **Flask-Bcrypt** for password security

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and npm
- **Python** 3.8+
- **Git**

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd Vantage-Car-Hire
```

#### 2. Backend Setup
```bash
cd backend

# Make scripts executable
chmod +x start.sh run.sh

# Run setup (installs dependencies & initializes database)
./start.sh

# Start the backend server
./run.sh
```

The backend will run on `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### Test Credentials

The database comes pre-populated with test accounts:

**Renter Account:**
- Email: `ahmed@example.com`
- Password: `password123`

**Car Owner Account:**
- Email: `ibrahim@example.com`
- Password: `password123`

## 📂 Project Structure

```
Vantage-Car-Hire/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── OurFleet.jsx
│   │   │   ├── AboutUs.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── AuthModal.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   └── OwnerDashboard.jsx
│   │   ├── api/
│   │   │   └── index.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── .env
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── init_db.py
│   ├── requirements.txt
│   ├── start.sh
│   ├── run.sh
│   ├── .env
│   ├── README.md
│   └── API_TESTING.md
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: Deep Navy Blue (`#0F172A`)
- **Accent**: Vibrant Orange (`#F97316`)
- **Background**: White & Light Gray
- **Text**: Slate shades

### Typography
- **Headings**: Bold, modern sans-serif
- **Body**: Clean, readable fonts
- **Consistency**: Maintained across all components

## 🛣️ Main Routes

### Frontend Routes
- `/` - Homepage with hero and featured cars
- `/fleet` - Browse all available cars
- `/about` - Company information
- `/services` - Service offerings
- `/contact` - Contact form and locations
- `/user-dashboard` - Renter dashboard (protected)
- `/owner-dashboard` - Owner dashboard (protected)

### Backend API Endpoints

#### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

#### Cars
- `GET /api/cars` - List cars (with filters)
- `GET /api/cars/:id` - Get car details
- `POST /api/cars` - Add car (owner only)
- `PUT /api/cars/:id` - Update car
- `GET /api/owner/cars` - Get owner's cars

#### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user` - User bookings
- `GET /api/bookings/owner` - Owner bookings
- `PUT /api/bookings/:id/status` - Update status

#### Reviews
- `POST /api/reviews` - Add review
- `GET /api/cars/:id/reviews` - Get reviews

#### Favorites
- `POST /api/favorites` - Add favorite
- `GET /api/favorites` - Get favorites
- `DELETE /api/favorites/:id` - Remove favorite

#### Dashboard
- `GET /api/dashboard/user/stats` - User stats
- `GET /api/dashboard/owner/stats` - Owner stats

See [backend/API_TESTING.md](backend/API_TESTING.md) for detailed API documentation.

## 🔐 Authentication Flow

1. User registers or logs in via AuthModal
2. Backend validates credentials and returns JWT token
3. Token stored in localStorage
4. Token included in subsequent API requests
5. Protected routes verify token before rendering
6. Auto-redirect on token expiration

## 📊 Database Schema

### Models
- **User** - User accounts (renters & owners)
- **Car** - Vehicle listings with features
- **Booking** - Rental reservations
- **Review** - User reviews and ratings
- **Favorite** - Saved favorite cars
- **PaymentMethod** - Stored payment cards
- **CarFeature** - Car amenities

### Sample Data
- 4 Users (2 renters, 2 owners)
- 8 Cars (various categories)
- 3 Bookings (confirmed & completed)
- 3 Reviews
- 4 Favorites
- 2 Payment Methods
- 40+ Car Features

## 🧪 Testing

### Backend Testing
```bash
cd backend

# Test health endpoint
curl http://localhost:5000/api/health

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ahmed@example.com","password":"password123"}'

# Get all cars
curl http://localhost:5000/api/cars
```

### Frontend Testing
1. Start both frontend and backend
2. Open `http://localhost:5173`
3. Click "Get Started" or "Sign In"
4. Use test credentials
5. Test renter and owner dashboards

## 📱 Responsive Design

- **Mobile**: < 640px - Stack layout, simplified nav
- **Tablet**: 640px - 1024px - Adjusted grids
- **Desktop**: > 1024px - Full featured layout

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev  # Start dev server
npm run build  # Build for production
npm run preview  # Preview production build
```

### Backend Development
```bash
cd backend
source venv/bin/activate
python app.py  # Start with auto-reload

# Reset database
python init_db.py
```

## 🌍 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
DATABASE_URL=sqlite:///vantage_car_hire.db
FRONTEND_URL=http://localhost:5173
```

## 🚢 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Update `VITE_API_URL` to production backend URL

### Backend (Heroku/Railway)
1. Ensure `gunicorn` is installed
2. Create `Procfile`: `web: gunicorn app:app`
3. Deploy with environment variables
4. Run database migrations

## 📝 Key Features Implementation

### Dual User Types
- Separate registration flows for renters and owners
- Role-based dashboard access
- Different feature sets per user type

### Dynamic Data Flow
- All data fetched from backend API
- Real-time updates with API calls
- No hardcoded data in dashboards

### Security
- Password hashing with Bcrypt
- JWT token authentication
- Protected API routes
- CORS protection
- SQL injection prevention

## 🎯 Future Enhancements

- [ ] Real-time chat between renters and owners
- [ ] Email notifications for bookings
- [ ] Payment gateway integration (M-Pesa)
- [ ] Advanced analytics dashboards
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Car availability calendar
- [ ] Insurance options
- [ ] Delivery service

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Built with ❤️ for Vantage Car Hire
- Location: Garissa, Kenya
- Focus: Premium car rental services

## 📞 Support

### Issues & Bugs
Open an issue on GitHub

### Documentation
- [Backend API Documentation](backend/README.md)
- [API Testing Guide](backend/API_TESTING.md)

### Quick Help
- Make sure both frontend and backend are running
- Check console for errors
- Verify environment variables
- Ensure database is initialized

---

**Ready to Go!** 🚀

1. Run backend: `cd backend && ./run.sh`
2. Run frontend: `cd frontend && npm run dev`
3. Open `http://localhost:5173`
4. Login with test credentials
5. Explore the platform!
