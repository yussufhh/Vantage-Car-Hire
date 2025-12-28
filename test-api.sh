#!/bin/bash

echo "🧪 Testing Vantage Car Hire API..."
echo "=================================="
echo ""

API_URL="http://localhost:5000/api"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to test endpoint
test_endpoint() {
    local name=$1
    local url=$2
    local method=${3:-GET}
    local data=$4
    
    echo -n "Testing $name... "
    
    if [ "$method" = "POST" ]; then
        response=$(curl -s -w "\n%{http_code}" -X POST "$url" \
            -H "Content-Type: application/json" \
            -d "$data")
    else
        response=$(curl -s -w "\n%{http_code}" "$url")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
        echo -e "${GREEN}✅ PASSED${NC} (HTTP $http_code)"
        PASSED=$((PASSED + 1))
        return 0
    else
        echo -e "${RED}❌ FAILED${NC} (HTTP $http_code)"
        echo "  Response: $body"
        FAILED=$((FAILED + 1))
        return 1
    fi
}

# Check if backend is running
echo "Checking if backend is running..."
if ! curl -s "$API_URL/health" > /dev/null 2>&1; then
    echo -e "${RED}❌ Backend is not running on port 5000${NC}"
    echo "Please start the backend first:"
    echo "  cd backend && ./run.sh"
    exit 1
fi
echo -e "${GREEN}✅ Backend is running${NC}"
echo ""

# Run tests
echo "Running API Tests..."
echo "-------------------"

# 1. Health check
test_endpoint "Health Check" "$API_URL/health"

# 2. Get all cars
test_endpoint "Get All Cars" "$API_URL/cars"

# 3. Get single car
test_endpoint "Get Car by ID" "$API_URL/cars/1"

# 4. Filter cars by category
test_endpoint "Filter Cars (SUV)" "$API_URL/cars?category=SUV"

# 5. Filter cars by price
test_endpoint "Filter Cars (Price)" "$API_URL/cars?min_price=5000&max_price=10000"

# 6. Login with renter
LOGIN_DATA='{"email":"ahmed@example.com","password":"password123"}'
if test_endpoint "Login (Renter)" "$API_URL/auth/login" "POST" "$LOGIN_DATA"; then
    # Extract token
    RENTER_TOKEN=$(curl -s -X POST "$API_URL/auth/login" \
        -H "Content-Type: application/json" \
        -d "$LOGIN_DATA" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
    
    if [ -n "$RENTER_TOKEN" ]; then
        echo "  Token: ${RENTER_TOKEN:0:20}..."
        
        # Test protected endpoints with token
        echo -n "Testing Get Current User... "
        http_code=$(curl -s -w "%{http_code}" -o /dev/null \
            "$API_URL/auth/me" \
            -H "Authorization: Bearer $RENTER_TOKEN")
        
        if [ "$http_code" = "200" ]; then
            echo -e "${GREEN}✅ PASSED${NC} (HTTP $http_code)"
            PASSED=$((PASSED + 1))
        else
            echo -e "${RED}❌ FAILED${NC} (HTTP $http_code)"
            FAILED=$((FAILED + 1))
        fi
        
        echo -n "Testing Get User Bookings... "
        http_code=$(curl -s -w "%{http_code}" -o /dev/null \
            "$API_URL/bookings/user" \
            -H "Authorization: Bearer $RENTER_TOKEN")
        
        if [ "$http_code" = "200" ]; then
            echo -e "${GREEN}✅ PASSED${NC} (HTTP $http_code)"
            PASSED=$((PASSED + 1))
        else
            echo -e "${RED}❌ FAILED${NC} (HTTP $http_code)"
            FAILED=$((FAILED + 1))
        fi
        
        echo -n "Testing Get User Stats... "
        http_code=$(curl -s -w "%{http_code}" -o /dev/null \
            "$API_URL/dashboard/user/stats" \
            -H "Authorization: Bearer $RENTER_TOKEN")
        
        if [ "$http_code" = "200" ]; then
            echo -e "${GREEN}✅ PASSED${NC} (HTTP $http_code)"
            PASSED=$((PASSED + 1))
        else
            echo -e "${RED}❌ FAILED${NC} (HTTP $http_code)"
            FAILED=$((FAILED + 1))
        fi
    fi
fi

# 7. Login with owner
OWNER_DATA='{"email":"ibrahim@example.com","password":"password123"}'
if test_endpoint "Login (Owner)" "$API_URL/auth/login" "POST" "$OWNER_DATA"; then
    # Extract token
    OWNER_TOKEN=$(curl -s -X POST "$API_URL/auth/login" \
        -H "Content-Type: application/json" \
        -d "$OWNER_DATA" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
    
    if [ -n "$OWNER_TOKEN" ]; then
        echo "  Token: ${OWNER_TOKEN:0:20}..."
        
        echo -n "Testing Get Owner Cars... "
        http_code=$(curl -s -w "%{http_code}" -o /dev/null \
            "$API_URL/owner/cars" \
            -H "Authorization: Bearer $OWNER_TOKEN")
        
        if [ "$http_code" = "200" ]; then
            echo -e "${GREEN}✅ PASSED${NC} (HTTP $http_code)"
            PASSED=$((PASSED + 1))
        else
            echo -e "${RED}❌ FAILED${NC} (HTTP $http_code)"
            FAILED=$((FAILED + 1))
        fi
        
        echo -n "Testing Get Owner Stats... "
        http_code=$(curl -s -w "%{http_code}" -o /dev/null \
            "$API_URL/dashboard/owner/stats" \
            -H "Authorization: Bearer $OWNER_TOKEN")
        
        if [ "$http_code" = "200" ]; then
            echo -e "${GREEN}✅ PASSED${NC} (HTTP $http_code)"
            PASSED=$((PASSED + 1))
        else
            echo -e "${RED}❌ FAILED${NC} (HTTP $http_code)"
            FAILED=$((FAILED + 1))
        fi
    fi
fi

# 8. Test signup
SIGNUP_DATA='{"full_name":"Test User","email":"test'$(date +%s)'@example.com","phone":"+254700123456","password":"test123","user_type":"renter","location":"Garissa, Kenya"}'
test_endpoint "User Signup" "$API_URL/auth/signup" "POST" "$SIGNUP_DATA"

# Results
echo ""
echo "=================================="
echo "Test Results:"
echo "-------------------"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo "Total: $((PASSED + FAILED))"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some tests failed. Check the output above.${NC}"
    exit 1
fi
