from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta

from models import db, User, Car, Booking, Review, Favorite, PaymentMethod, CarFeature

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'vantage-secret-key')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'vantage-jwt-secret')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///vantage_car_hire.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)

# Initialize extensions
db.init_app(app)
jwt = JWTManager(app)
CORS(app, resources={
    r"/api/*": {
        "origins": os.getenv('FRONTEND_URL', 'http://localhost:5173'),
        "allow_headers": ["Content-Type", "Authorization"],
        "expose_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# JWT error handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({'error': 'Token has expired'}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({'error': 'Invalid token', 'message': str(error)}), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({'error': 'Authorization token is missing', 'message': str(error)}), 401

# ===================== AUTH ROUTES =====================

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['full_name', 'email', 'phone', 'password', 'user_type']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already registered'}), 400
        
        # Create new user
        user = User(
            full_name=data['full_name'],
            email=data['email'],
            phone=data['phone'],
            user_type=data['user_type'],
            location=data.get('location', 'Garissa, Kenya')
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'message': 'User created successfully',
            'access_token': access_token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password required'}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not user.check_password(data['password']):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify(user.to_dict()), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ===================== CAR ROUTES =====================

@app.route('/api/cars', methods=['GET'])
def get_cars():
    try:
        # Get query parameters for filtering
        category = request.args.get('category')
        min_price = request.args.get('min_price', type=float)
        max_price = request.args.get('max_price', type=float)
        location = request.args.get('location')
        
        query = Car.query.filter_by(status='Available')
        
        if category and category != 'All':
            query = query.filter_by(category=category)
        if min_price:
            query = query.filter(Car.daily_rate >= min_price)
        if max_price:
            query = query.filter(Car.daily_rate <= max_price)
        if location:
            query = query.filter(Car.location.ilike(f'%{location}%'))
        
        cars = query.all()
        return jsonify([car.to_dict() for car in cars]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/cars/<int:car_id>', methods=['GET'])
def get_car(car_id):
    try:
        car = Car.query.get(car_id)
        if not car:
            return jsonify({'error': 'Car not found'}), 404
        
        return jsonify(car.to_dict()), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/cars', methods=['POST'])
@jwt_required()
def create_car():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.user_type != 'owner':
            return jsonify({'error': 'Only owners can add cars'}), 403
        
        data = request.get_json()
        
        car = Car(
            owner_id=current_user_id,
            name=data['name'],
            brand=data['brand'],
            model_year=data['model_year'],
            category=data['category'],
            daily_rate=data['daily_rate'],
            location=data['location'],
            transmission=data.get('transmission'),
            seats=data.get('seats'),
            fuel_type=data.get('fuel_type'),
            luggage=data.get('luggage'),
            description=data.get('description'),
            image_url=data.get('image_url')
        )
        
        db.session.add(car)
        db.session.commit()
        
        # Add features if provided
        if 'features' in data:
            for feature_text in data['features']:
                feature = CarFeature(car_id=car.id, feature=feature_text)
                db.session.add(feature)
            db.session.commit()
        
        return jsonify({
            'message': 'Car added successfully',
            'car': car.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/owner/cars', methods=['GET'])
@jwt_required()
def get_owner_cars():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.user_type != 'owner':
            return jsonify({'error': 'Access denied'}), 403
        
        cars = Car.query.filter_by(owner_id=current_user_id).all()
        return jsonify([car.to_dict() for car in cars]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/cars/<int:car_id>', methods=['PUT'])
@jwt_required()
def update_car(car_id):
    try:
        current_user_id = get_jwt_identity()
        car = Car.query.get(car_id)
        
        if not car:
            return jsonify({'error': 'Car not found'}), 404
        
        if car.owner_id != current_user_id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.get_json()
        
        # Update fields
        for key, value in data.items():
            if hasattr(car, key) and key not in ['id', 'owner_id', 'created_at']:
                setattr(car, key, value)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Car updated successfully',
            'car': car.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# ===================== BOOKING ROUTES =====================

@app.route('/api/bookings', methods=['POST'])
@jwt_required()
def create_booking():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Calculate total amount
        car = Car.query.get(data['car_id'])
        if not car:
            return jsonify({'error': 'Car not found'}), 404
        
        pickup = datetime.fromisoformat(data['pickup_date'].replace('Z', '+00:00'))
        return_date = datetime.fromisoformat(data['return_date'].replace('Z', '+00:00'))
        days = (return_date - pickup).days
        
        booking = Booking(
            user_id=current_user_id,
            car_id=data['car_id'],
            pickup_date=pickup,
            return_date=return_date,
            pickup_location=data['pickup_location'],
            total_amount=car.daily_rate * days,
            status='Confirmed'
        )
        
        db.session.add(booking)
        
        # Update car stats
        car.status = 'Rented'
        car.total_bookings += 1
        car.total_earnings += booking.total_amount
        
        db.session.commit()
        
        return jsonify({
            'message': 'Booking created successfully',
            'booking': booking.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/bookings/user', methods=['GET'])
@jwt_required()
def get_user_bookings():
    try:
        current_user_id = get_jwt_identity()
        bookings = Booking.query.filter_by(user_id=current_user_id).order_by(Booking.created_at.desc()).all()
        return jsonify([booking.to_dict() for booking in bookings]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/bookings/owner', methods=['GET'])
@jwt_required()
def get_owner_bookings():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if user.user_type != 'owner':
            return jsonify({'error': 'Access denied'}), 403
        
        # Get all bookings for owner's cars
        owner_cars = Car.query.filter_by(owner_id=current_user_id).all()
        car_ids = [car.id for car in owner_cars]
        
        bookings = Booking.query.filter(Booking.car_id.in_(car_ids)).order_by(Booking.created_at.desc()).all()
        return jsonify([booking.to_dict() for booking in bookings]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/bookings/<int:booking_id>/status', methods=['PUT'])
@jwt_required()
def update_booking_status(booking_id):
    try:
        data = request.get_json()
        booking = Booking.query.get(booking_id)
        
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        booking.status = data['status']
        
        # Update car status if booking is completed or cancelled
        if data['status'] in ['Completed', 'Cancelled']:
            booking.car.status = 'Available'
        
        db.session.commit()
        
        return jsonify({
            'message': 'Booking status updated',
            'booking': booking.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# ===================== REVIEW ROUTES =====================

@app.route('/api/reviews', methods=['POST'])
@jwt_required()
def create_review():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        review = Review(
            user_id=current_user_id,
            car_id=data['car_id'],
            rating=data['rating'],
            comment=data.get('comment', '')
        )
        
        db.session.add(review)
        
        # Update car rating
        car = Car.query.get(data['car_id'])
        reviews = Review.query.filter_by(car_id=data['car_id']).all()
        avg_rating = sum([r.rating for r in reviews]) / len(reviews) if reviews else 0
        car.rating = round(avg_rating, 1)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Review added successfully',
            'review': review.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/cars/<int:car_id>/reviews', methods=['GET'])
def get_car_reviews(car_id):
    try:
        reviews = Review.query.filter_by(car_id=car_id).order_by(Review.created_at.desc()).all()
        return jsonify([review.to_dict() for review in reviews]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ===================== FAVORITE ROUTES =====================

@app.route('/api/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Check if already favorited
        existing = Favorite.query.filter_by(user_id=current_user_id, car_id=data['car_id']).first()
        if existing:
            return jsonify({'error': 'Already in favorites'}), 400
        
        favorite = Favorite(
            user_id=current_user_id,
            car_id=data['car_id']
        )
        
        db.session.add(favorite)
        db.session.commit()
        
        return jsonify({
            'message': 'Added to favorites',
            'favorite': favorite.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    try:
        current_user_id = get_jwt_identity()
        favorites = Favorite.query.filter_by(user_id=current_user_id).all()
        return jsonify([fav.to_dict() for fav in favorites]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/favorites/<int:car_id>', methods=['DELETE'])
@jwt_required()
def remove_favorite(car_id):
    try:
        current_user_id = get_jwt_identity()
        favorite = Favorite.query.filter_by(user_id=current_user_id, car_id=car_id).first()
        
        if not favorite:
            return jsonify({'error': 'Favorite not found'}), 404
        
        db.session.delete(favorite)
        db.session.commit()
        
        return jsonify({'message': 'Removed from favorites'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# ===================== PAYMENT METHOD ROUTES =====================

@app.route('/api/payment-methods', methods=['POST'])
@jwt_required()
def add_payment_method():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        payment_method = PaymentMethod(
            user_id=current_user_id,
            card_type=data['card_type'],
            last_four=data['last_four'],
            expiry_month=data['expiry_month'],
            expiry_year=data['expiry_year'],
            is_default=data.get('is_default', False)
        )
        
        # If this is default, unset other defaults
        if payment_method.is_default:
            PaymentMethod.query.filter_by(user_id=current_user_id, is_default=True).update({'is_default': False})
        
        db.session.add(payment_method)
        db.session.commit()
        
        return jsonify({
            'message': 'Payment method added',
            'payment_method': payment_method.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/payment-methods', methods=['GET'])
@jwt_required()
def get_payment_methods():
    try:
        current_user_id = get_jwt_identity()
        methods = PaymentMethod.query.filter_by(user_id=current_user_id).all()
        return jsonify([method.to_dict() for method in methods]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ===================== DASHBOARD STATS ROUTES =====================

@app.route('/api/dashboard/user/stats', methods=['GET'])
@jwt_required()
def get_user_dashboard_stats():
    try:
        current_user_id = get_jwt_identity()
        
        # Get active bookings
        active_bookings = Booking.query.filter_by(
            user_id=current_user_id,
            status='Confirmed'
        ).count()
        
        # Get total rentals
        total_rentals = Booking.query.filter_by(user_id=current_user_id).count()
        
        # Calculate loyalty points (1 point per rental)
        loyalty_points = total_rentals * 100
        
        return jsonify({
            'active_bookings': active_bookings,
            'total_rentals': total_rentals,
            'loyalty_points': loyalty_points
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/dashboard/owner/stats', methods=['GET'])
@jwt_required()
def get_owner_dashboard_stats():
    try:
        current_user_id = get_jwt_identity()
        
        # Get total cars
        total_cars = Car.query.filter_by(owner_id=current_user_id).count()
        
        # Get active bookings
        owner_cars = Car.query.filter_by(owner_id=current_user_id).all()
        car_ids = [car.id for car in owner_cars]
        active_bookings = Booking.query.filter(
            Booking.car_id.in_(car_ids),
            Booking.status.in_(['Confirmed', 'Active'])
        ).count()
        
        # Calculate monthly earnings (this month)
        current_month = datetime.now().month
        current_year = datetime.now().year
        monthly_earnings = db.session.query(db.func.sum(Booking.total_amount)).filter(
            Booking.car_id.in_(car_ids),
            db.extract('month', Booking.created_at) == current_month,
            db.extract('year', Booking.created_at) == current_year
        ).scalar() or 0
        
        # Calculate average rating
        avg_rating = db.session.query(db.func.avg(Car.rating)).filter(
            Car.owner_id == current_user_id
        ).scalar() or 0
        
        return jsonify({
            'total_cars': total_cars,
            'active_bookings': active_bookings,
            'monthly_earnings': round(monthly_earnings, 2),
            'avg_rating': round(avg_rating, 2)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ===================== HEALTH CHECK =====================

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Vantage Car Hire API is running'}), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
