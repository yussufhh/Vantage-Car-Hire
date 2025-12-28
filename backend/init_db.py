from app import app, db
from models import User, Car, Booking, Review, Favorite, PaymentMethod, CarFeature
from datetime import datetime, timedelta

def init_database():
    with app.app_context():
        # Drop all tables and recreate
        print("Creating database tables...")
        db.drop_all()
        db.create_all()
        
        # Create sample users
        print("Creating sample users...")
        
        # Renters
        renter1 = User(
            full_name="Ahmed Mohamed",
            email="ahmed@example.com",
            phone="+254712345678",
            user_type="renter",
            location="Garissa, Kenya"
        )
        renter1.set_password("password123")
        
        renter2 = User(
            full_name="Fatima Hassan",
            email="fatima@example.com",
            phone="+254723456789",
            user_type="renter",
            location="Garissa, Kenya"
        )
        renter2.set_password("password123")
        
        # Owners
        owner1 = User(
            full_name="Ibrahim Ali",
            email="ibrahim@example.com",
            phone="+254734567890",
            user_type="owner",
            location="Garissa, Kenya"
        )
        owner1.set_password("password123")
        
        owner2 = User(
            full_name="Amina Osman",
            email="amina@example.com",
            phone="+254745678901",
            user_type="owner",
            location="Garissa, Kenya"
        )
        owner2.set_password("password123")
        
        db.session.add_all([renter1, renter2, owner1, owner2])
        db.session.commit()
        
        print("Creating sample cars...")
        
        # Cars for owner1
        cars_data = [
            {
                "owner_id": owner1.id,
                "name": "Toyota Land Cruiser V8",
                "brand": "Toyota",
                "model_year": 2023,
                "category": "SUV",
                "daily_rate": 12000,
                "location": "Garissa Town Center",
                "transmission": "Automatic",
                "seats": 7,
                "fuel_type": "Diesel",
                "luggage": 5,
                "description": "Luxury SUV perfect for family trips and desert adventures. Fully equipped with modern amenities.",
                "image_url": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500",
                "rating": 4.8,
                "status": "Available"
            },
            {
                "owner_id": owner1.id,
                "name": "Mercedes-Benz E-Class",
                "brand": "Mercedes-Benz",
                "model_year": 2023,
                "category": "Luxury",
                "daily_rate": 15000,
                "location": "Garissa Town Center",
                "transmission": "Automatic",
                "seats": 5,
                "fuel_type": "Petrol",
                "luggage": 3,
                "description": "Premium luxury sedan with cutting-edge technology and unmatched comfort.",
                "image_url": "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=500",
                "rating": 4.9,
                "status": "Available"
            },
            {
                "owner_id": owner1.id,
                "name": "Toyota Corolla",
                "brand": "Toyota",
                "model_year": 2022,
                "category": "Economy",
                "daily_rate": 4500,
                "location": "Garissa Airport",
                "transmission": "Automatic",
                "seats": 5,
                "fuel_type": "Petrol",
                "luggage": 2,
                "description": "Reliable and fuel-efficient sedan perfect for city driving.",
                "image_url": "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500",
                "rating": 4.6,
                "status": "Available"
            },
            {
                "owner_id": owner2.id,
                "name": "Nissan X-Trail",
                "brand": "Nissan",
                "model_year": 2023,
                "category": "SUV",
                "daily_rate": 8500,
                "location": "Garissa Town Center",
                "transmission": "Automatic",
                "seats": 7,
                "fuel_type": "Petrol",
                "luggage": 4,
                "description": "Spacious SUV ideal for family trips with excellent off-road capabilities.",
                "image_url": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500",
                "rating": 4.7,
                "status": "Available"
            },
            {
                "owner_id": owner2.id,
                "name": "Honda Civic",
                "brand": "Honda",
                "model_year": 2023,
                "category": "Economy",
                "daily_rate": 5000,
                "location": "Garissa Town Center",
                "transmission": "Automatic",
                "seats": 5,
                "fuel_type": "Petrol",
                "luggage": 2,
                "description": "Modern and stylish sedan with great fuel economy.",
                "image_url": "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=500",
                "rating": 4.5,
                "status": "Available"
            },
            {
                "owner_id": owner2.id,
                "name": "BMW 5 Series",
                "brand": "BMW",
                "model_year": 2023,
                "category": "Luxury",
                "daily_rate": 18000,
                "location": "Garissa Airport",
                "transmission": "Automatic",
                "seats": 5,
                "fuel_type": "Petrol",
                "luggage": 3,
                "description": "Executive luxury sedan with superior performance and comfort.",
                "image_url": "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500",
                "rating": 4.9,
                "status": "Available"
            },
            {
                "owner_id": owner1.id,
                "name": "Mazda CX-5",
                "brand": "Mazda",
                "model_year": 2022,
                "category": "SUV",
                "daily_rate": 7500,
                "location": "Garissa Town Center",
                "transmission": "Automatic",
                "seats": 5,
                "fuel_type": "Petrol",
                "luggage": 4,
                "description": "Compact SUV with premium features and excellent handling.",
                "image_url": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500",
                "rating": 4.6,
                "status": "Available"
            },
            {
                "owner_id": owner2.id,
                "name": "Audi A6",
                "brand": "Audi",
                "model_year": 2023,
                "category": "Luxury",
                "daily_rate": 17000,
                "location": "Garissa Town Center",
                "transmission": "Automatic",
                "seats": 5,
                "fuel_type": "Petrol",
                "luggage": 3,
                "description": "Sophisticated luxury sedan with advanced technology.",
                "image_url": "https://images.unsplash.com/photo-1610768764270-790fbec18178?w=500",
                "rating": 4.8,
                "status": "Available"
            }
        ]
        
        cars = []
        for car_data in cars_data:
            car = Car(**car_data)
            cars.append(car)
            db.session.add(car)
        
        db.session.commit()
        
        print("Creating car features...")
        
        # Add features to cars
        features_map = {
            0: ["GPS Navigation", "Bluetooth", "Backup Camera", "Sunroof", "Leather Seats", "4WD"],
            1: ["Premium Sound System", "Heated Seats", "Parking Sensors", "LED Headlights", "Apple CarPlay"],
            2: ["Bluetooth", "Backup Camera", "USB Ports", "Air Conditioning"],
            3: ["GPS Navigation", "Bluetooth", "Backup Camera", "Roof Rails", "Third Row Seating"],
            4: ["Bluetooth", "Backup Camera", "USB Ports", "Cruise Control", "Air Conditioning"],
            5: ["Premium Sound System", "Heated Seats", "Parking Sensors", "Sunroof", "Wireless Charging"],
            6: ["GPS Navigation", "Bluetooth", "Backup Camera", "Blind Spot Monitoring", "Lane Assist"],
            7: ["Virtual Cockpit", "Matrix LED", "Massage Seats", "Bang & Olufsen Sound", "Adaptive Cruise"]
        }
        
        for idx, car in enumerate(cars):
            if idx in features_map:
                for feature_text in features_map[idx]:
                    feature = CarFeature(car_id=car.id, feature=feature_text)
                    db.session.add(feature)
        
        db.session.commit()
        
        print("Creating sample bookings...")
        
        # Sample bookings
        bookings_data = [
            {
                "user_id": renter1.id,
                "car_id": cars[0].id,
                "pickup_date": datetime.now() + timedelta(days=2),
                "return_date": datetime.now() + timedelta(days=5),
                "pickup_location": "Garissa Town Center",
                "total_amount": 36000,
                "status": "Confirmed"
            },
            {
                "user_id": renter2.id,
                "car_id": cars[2].id,
                "pickup_date": datetime.now() - timedelta(days=5),
                "return_date": datetime.now() - timedelta(days=2),
                "pickup_location": "Garissa Airport",
                "total_amount": 13500,
                "status": "Completed"
            },
            {
                "user_id": renter1.id,
                "car_id": cars[4].id,
                "pickup_date": datetime.now() - timedelta(days=10),
                "return_date": datetime.now() - timedelta(days=7),
                "pickup_location": "Garissa Town Center",
                "total_amount": 15000,
                "status": "Completed"
            }
        ]
        
        for booking_data in bookings_data:
            booking = Booking(**booking_data)
            db.session.add(booking)
            
            # Update car stats for completed bookings
            if booking.status == "Completed":
                car = Car.query.get(booking.car_id)
                car.total_bookings += 1
                car.total_earnings += booking.total_amount
        
        db.session.commit()
        
        print("Creating sample reviews...")
        
        # Sample reviews
        reviews_data = [
            {
                "user_id": renter1.id,
                "car_id": cars[4].id,
                "rating": 5,
                "comment": "Excellent car! Very clean and fuel efficient. Highly recommended!"
            },
            {
                "user_id": renter2.id,
                "car_id": cars[2].id,
                "rating": 5,
                "comment": "Great experience! The car was in perfect condition and the owner was very responsive."
            },
            {
                "user_id": renter1.id,
                "car_id": cars[0].id,
                "rating": 5,
                "comment": "Amazing SUV! Perfect for our family trip. Very comfortable and powerful."
            }
        ]
        
        for review_data in reviews_data:
            review = Review(**review_data)
            db.session.add(review)
        
        db.session.commit()
        
        print("Creating sample favorites...")
        
        # Sample favorites
        favorites_data = [
            {"user_id": renter1.id, "car_id": cars[1].id},
            {"user_id": renter1.id, "car_id": cars[5].id},
            {"user_id": renter2.id, "car_id": cars[0].id},
            {"user_id": renter2.id, "car_id": cars[3].id}
        ]
        
        for fav_data in favorites_data:
            favorite = Favorite(**fav_data)
            db.session.add(favorite)
        
        db.session.commit()
        
        print("Creating sample payment methods...")
        
        # Sample payment methods
        payment_methods_data = [
            {
                "user_id": renter1.id,
                "card_type": "Visa",
                "last_four": "4532",
                "expiry_month": 12,
                "expiry_year": 2025,
                "is_default": True
            },
            {
                "user_id": renter2.id,
                "card_type": "Mastercard",
                "last_four": "8765",
                "expiry_month": 6,
                "expiry_year": 2026,
                "is_default": True
            }
        ]
        
        for pm_data in payment_methods_data:
            payment_method = PaymentMethod(**pm_data)
            db.session.add(payment_method)
        
        db.session.commit()
        
        print("\n✅ Database initialized successfully!")
        print("\n📊 Summary:")
        print(f"  - Users: {User.query.count()} (2 renters, 2 owners)")
        print(f"  - Cars: {Car.query.count()}")
        print(f"  - Bookings: {Booking.query.count()}")
        print(f"  - Reviews: {Review.query.count()}")
        print(f"  - Favorites: {Favorite.query.count()}")
        print(f"  - Payment Methods: {PaymentMethod.query.count()}")
        print(f"  - Car Features: {CarFeature.query.count()}")
        
        print("\n🔑 Test Credentials:")
        print("\n  Renter Account:")
        print("    Email: ahmed@example.com")
        print("    Password: password123")
        print("\n  Owner Account:")
        print("    Email: ibrahim@example.com")
        print("    Password: password123")
        print()


if __name__ == '__main__':
    init_database()
