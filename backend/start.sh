#!/bin/bash

echo "🚗 Vantage Car Hire - Backend Setup Script"
echo "=========================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"
echo ""

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
    echo "✅ Virtual environment created"
else
    echo "✅ Virtual environment already exists"
fi

echo ""

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source venv/bin/activate

echo ""

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

echo ""

# Install dependencies
echo "📚 Installing dependencies from requirements.txt..."
pip install -r requirements.txt

echo ""

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
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
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

echo ""

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p uploads/cars
mkdir -p uploads/profiles
mkdir -p instance
echo "✅ Directories created"

echo ""

# Initialize database
echo "🗄️  Initializing database..."
python3 init_db.py
echo "✅ Database initialized with sample data"

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo ""
echo "To start the server, run:"
echo "  source venv/bin/activate"
echo "  python3 app.py"
echo ""
echo "Or simply run:"
echo "  ./run.sh"
echo "=========================================="
