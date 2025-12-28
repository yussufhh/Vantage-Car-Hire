# Vantage Car Hire - Backend API

Complete Flask REST API for the Vantage Car Hire car rental platform.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with dual user types (renters & car owners)
- **User Management**: Registration, login, profile management
- **Car Management**: CRUD operations for car listings with features
- **Booking System**: Create, manage, and track car rentals
- **Reviews & Ratings**: User reviews and dynamic car ratings
- **Favorites**: Save favorite cars for quick access
- **Payment Methods**: Manage payment cards securely
- **Dashboard Analytics**: Real-time stats for users and owners
- **Advanced Filtering**: Search cars by category, price, location

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment (venv)

## 🛠️ Quick Start

### 1. Automated Setup (Recommended)

```bash
# Make scripts executable
chmod +x start.sh run.sh

# Run setup script (installs dependencies and initializes database)
./start.sh

# Start the server
./run.sh
```

### 2. Manual Setup

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Initialize database with sample data
python init_db.py

# Run the server
python app.py
```

## 🔐 Environment Configuration

Create a `.env` file in the backend directory:

```env
# Flask Configuration
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-change-this-in-production
JWT_SECRET_KEY=your-jwt-secret-key-change-this-in-production

# Database Configuration
DATABASE_URL=sqlite:///vantage_car_hire.db

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Upload Configuration
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216
```

## 📊 Database Schema

### Models

- **User**: User accounts (renters and car owners)
- **Car**: Vehicle listings with features and stats
- **Booking**: Rental reservations and transactions
- **Review**: User reviews and ratings
- **Favorite**: User's saved favorite cars
- **PaymentMethod**: Stored payment card information
- **CarFeature**: Individual car features/amenities

### Relationships

- User → Cars (owner's fleet)
- User → Bookings (rental history)
- User → Reviews (submitted reviews)
- User → Favorites (saved cars)
- User → PaymentMethods (payment cards)
- Car → Bookings (rental history)
- Car → Reviews (car reviews)
- Car → Features (amenities list)

## 🛣️ API Endpoints

### Authentication

```
POST   /api/auth/signup       - Register new user
POST   /api/auth/login        - Login user
GET    /api/auth/me           - Get current user (protected)
```

### Cars

```
GET    /api/cars              - List all available cars (with filters)
GET    /api/cars/:id          - Get single car details
POST   /api/cars              - Add new car (owner only)
PUT    /api/cars/:id          - Update car (owner only)
GET    /api/owner/cars        - Get owner's cars (protected)
```

### Bookings

```
POST   /api/bookings          - Create new booking (protected)
GET    /api/bookings/user     - Get user's bookings (protected)
GET    /api/bookings/owner    - Get owner's bookings (protected)
PUT    /api/bookings/:id/status - Update booking status (protected)
```

### Reviews

```
POST   /api/reviews           - Add review (protected)
GET    /api/cars/:id/reviews  - Get car reviews
```

### Favorites

```
POST   /api/favorites         - Add to favorites (protected)
GET    /api/favorites         - Get user favorites (protected)
DELETE /api/favorites/:id     - Remove from favorites (protected)
```

### Payment Methods

```
POST   /api/payment-methods   - Add payment method (protected)
GET    /api/payment-methods   - Get user's payment methods (protected)
```

### Dashboard Stats

```
GET    /api/dashboard/user/stats  - User dashboard stats (protected)
GET    /api/dashboard/owner/stats - Owner dashboard stats (protected)
```

### Health Check

```
GET    /api/health            - API health status
```

## 🧪 Sample Test Credentials

The database initialization script creates sample accounts:

**Renter Account:**
```
Email: ahmed@example.com
Password: password123
```

**Car Owner Account:**
```
Email: ibrahim@example.com
Password: password123
```

## 📦 Dependencies

### Core
- **Flask 3.0.0** - Web framework
- **Flask-SQLAlchemy 3.1.1** - ORM
- **Flask-JWT-Extended 4.6.0** - JWT authentication
- **Flask-Bcrypt 1.0.1** - Password hashing
- **Flask-CORS 4.0.0** - Cross-origin requests

### Database
- **SQLite3** - Database (included in Python)
- **Flask-Migrate 4.0.5** - Database migrations

### Utilities
- **python-dotenv 1.0.0** - Environment variables
- **Werkzeug 3.0.1** - WSGI utilities
- **email-validator 2.1.0** - Email validation
- **Pillow 10.1.0** - Image processing

### Production
- **gunicorn 21.2.0** - Production WSGI server

## 🗂️ Project Structure

```
backend/
├── app.py                 # Main Flask application
├── models.py              # Database models
├── init_db.py            # Database initialization script
├── requirements.txt       # Python dependencies
├── .env.example          # Environment template
├── start.sh              # Setup script
├── run.sh                # Server start script
├── vantage_car_hire.db   # SQLite database (generated)
├── venv/                 # Virtual environment (generated)
└── uploads/              # File uploads directory
    ├── cars/             # Car images
    └── profiles/         # Profile pictures
```

## 🔒 Security Features

- Password hashing with Bcrypt
- JWT token-based authentication
- Protected routes with role-based access
- CORS protection
- SQL injection prevention (SQLAlchemy ORM)
- Input validation

## 📈 Database Statistics

After initialization, you'll have:
- 4 Users (2 renters, 2 owners)
- 8 Cars (various categories)
- 3 Bookings (mix of confirmed and completed)
- 3 Reviews
- 4 Favorites
- 2 Payment Methods
- 35+ Car Features

## 🚦 API Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "error": "Error message description"
}
```

## 🔧 Development

### Running in Development Mode

```bash
# Activate virtual environment
source venv/bin/activate

# Run with hot reload
python app.py
```

The server runs on `http://localhost:5000` by default.

### Database Reset

To reset the database with fresh sample data:

```bash
python init_db.py
```

## 📝 Notes

- All timestamps are stored in UTC
- Car daily rates are in Kenyan Shillings (KES)
- All locations are in Garissa, Kenya region
- Images use Unsplash URLs for sample data
- JWT tokens expire after 7 days

## 🤝 Integration with Frontend

Frontend should:
1. Store JWT token in localStorage after login
2. Include token in Authorization header: `Bearer <token>`
3. Handle 401 responses by redirecting to login
4. Make API calls to `http://localhost:5000/api`

Example axios configuration:
```javascript
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

## 📞 Support

For issues or questions, check:
- Database logs in console
- Error responses from API
- Flask debug output

## 🎯 Next Steps

1. Start the backend: `./run.sh`
2. Update frontend to use API endpoints
3. Test authentication flow
4. Verify dashboard data loading
5. Test booking creation and management

---

**Built with ❤️ for Vantage Car Hire**
