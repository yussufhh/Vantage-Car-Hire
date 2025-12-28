#!/bin/bash

echo "🚗 Starting Vantage Car Hire Platform..."
echo "========================================"
echo ""

# Check if backend is already running
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Backend already running on port 5000"
else
    echo "🔧 Starting Backend..."
    cd backend
    ./run.sh &
    BACKEND_PID=$!
    cd ..
    sleep 3
    echo "✅ Backend started"
fi

echo ""

# Check if frontend is already running
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Frontend already running on port 5173"
else
    echo "🎨 Starting Frontend..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    sleep 3
    echo "✅ Frontend started"
fi

echo ""
echo "========================================"
echo "✅ Vantage Car Hire is running!"
echo ""
echo "🌐 Frontend: http://localhost:5173"
echo "🔌 Backend:  http://localhost:5000"
echo ""
echo "🔑 Test Credentials:"
echo "   Renter:  ahmed@example.com / password123"
echo "   Owner:   ibrahim@example.com / password123"
echo ""
echo "Press Ctrl+C to stop all servers"
echo "========================================"

# Wait for user to stop
wait
