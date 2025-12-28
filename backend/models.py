from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    user_type = db.Column(db.String(20), nullable=False)  # 'renter' or 'owner'
    profile_picture = db.Column(db.String(255))
    location = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    bookings = db.relationship('Booking', back_populates='user', foreign_keys='Booking.user_id')
    cars = db.relationship('Car', back_populates='owner', lazy='dynamic')
    reviews = db.relationship('Review', back_populates='user', lazy='dynamic')
    favorites = db.relationship('Favorite', back_populates='user', lazy='dynamic')
    payment_methods = db.relationship('PaymentMethod', back_populates='user', lazy='dynamic')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'phone': self.phone,
            'user_type': self.user_type,
            'profile_picture': self.profile_picture,
            'location': self.location,
            'created_at': self.created_at.isoformat()
        }


class Car(db.Model):
    __tablename__ = 'cars'
    
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    brand = db.Column(db.String(50), nullable=False)
    model_year = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    daily_rate = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    transmission = db.Column(db.String(20))
    seats = db.Column(db.Integer)
    fuel_type = db.Column(db.String(20))
    luggage = db.Column(db.Integer)
    description = db.Column(db.Text)
    status = db.Column(db.String(20), default='Available')  # Available, Rented, Maintenance
    rating = db.Column(db.Float, default=0.0)
    total_bookings = db.Column(db.Integer, default=0)
    total_earnings = db.Column(db.Float, default=0.0)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    owner = db.relationship('User', back_populates='cars')
    bookings = db.relationship('Booking', back_populates='car', lazy='dynamic')
    reviews = db.relationship('Review', back_populates='car', lazy='dynamic')
    favorites = db.relationship('Favorite', back_populates='car', lazy='dynamic')
    features = db.relationship('CarFeature', back_populates='car', lazy='dynamic')
    
    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'brand': self.brand,
            'model_year': self.model_year,
            'category': self.category,
            'daily_rate': self.daily_rate,
            'location': self.location,
            'transmission': self.transmission,
            'seats': self.seats,
            'fuel_type': self.fuel_type,
            'luggage': self.luggage,
            'description': self.description,
            'status': self.status,
            'rating': self.rating,
            'total_bookings': self.total_bookings,
            'total_earnings': self.total_earnings,
            'image_url': self.image_url,
            'created_at': self.created_at.isoformat(),
            'features': [f.feature for f in self.features.all()],
            'reviews_count': self.reviews.count()
        }


class CarFeature(db.Model):
    __tablename__ = 'car_features'
    
    id = db.Column(db.Integer, primary_key=True)
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    feature = db.Column(db.String(100), nullable=False)
    
    car = db.relationship('Car', back_populates='features')


class Booking(db.Model):
    __tablename__ = 'bookings'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    pickup_date = db.Column(db.DateTime, nullable=False)
    return_date = db.Column(db.DateTime, nullable=False)
    pickup_location = db.Column(db.String(100), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='Pending')  # Pending, Confirmed, Active, Completed, Cancelled
    payment_status = db.Column(db.String(20), default='Pending')  # Pending, Paid, Refunded
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', back_populates='bookings', foreign_keys=[user_id])
    car = db.relationship('Car', back_populates='bookings')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'car_id': self.car_id,
            'car': self.car.to_dict() if self.car else None,
            'user': self.user.to_dict() if self.user else None,
            'pickup_date': self.pickup_date.isoformat(),
            'return_date': self.return_date.isoformat(),
            'pickup_location': self.pickup_location,
            'total_amount': self.total_amount,
            'status': self.status,
            'payment_status': self.payment_status,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }


class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', back_populates='reviews')
    car = db.relationship('Car', back_populates='reviews')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'car_id': self.car_id,
            'user_name': self.user.full_name if self.user else None,
            'car_name': self.car.name if self.car else None,
            'rating': self.rating,
            'comment': self.comment,
            'created_at': self.created_at.isoformat()
        }


class Favorite(db.Model):
    __tablename__ = 'favorites'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', back_populates='favorites')
    car = db.relationship('Car', back_populates='favorites')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'car_id': self.car_id,
            'car': self.car.to_dict() if self.car else None,
            'created_at': self.created_at.isoformat()
        }


class PaymentMethod(db.Model):
    __tablename__ = 'payment_methods'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    card_type = db.Column(db.String(20), nullable=False)  # Visa, Mastercard, etc.
    last_four = db.Column(db.String(4), nullable=False)
    expiry_month = db.Column(db.Integer, nullable=False)
    expiry_year = db.Column(db.Integer, nullable=False)
    is_default = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', back_populates='payment_methods')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'card_type': self.card_type,
            'last_four': self.last_four,
            'expiry': f"{self.expiry_month:02d}/{self.expiry_year}",
            'is_default': self.is_default,
            'created_at': self.created_at.isoformat()
        }
