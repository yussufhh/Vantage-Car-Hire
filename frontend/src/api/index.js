import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// ===================== AUTH API =====================

export const authAPI = {
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },

  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },
};

// ===================== CAR API =====================

export const carAPI = {
  getAll: async (filters = {}) => {
    const response = await api.get('/cars', { params: filters });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  },

  create: async (carData) => {
    const response = await api.post('/cars', carData);
    return response.data;
  },

  update: async (id, carData) => {
    const response = await api.put(`/cars/${id}`, carData);
    return response.data;
  },

  getOwnerCars: async () => {
    const response = await api.get('/owner/cars');
    return response.data;
  },

  getReviews: async (carId) => {
    const response = await api.get(`/cars/${carId}/reviews`);
    return response.data;
  },
};

// ===================== BOOKING API =====================

export const bookingAPI = {
  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  getUserBookings: async () => {
    const response = await api.get('/bookings/user');
    return response.data;
  },

  getOwnerBookings: async () => {
    const response = await api.get('/bookings/owner');
    return response.data;
  },

  updateStatus: async (bookingId, status) => {
    const response = await api.put(`/bookings/${bookingId}/status`, { status });
    return response.data;
  },
};

// ===================== REVIEW API =====================

export const reviewAPI = {
  create: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },
};

// ===================== FAVORITE API =====================

export const favoriteAPI = {
  add: async (carId) => {
    const response = await api.post('/favorites', { car_id: carId });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/favorites');
    return response.data;
  },

  remove: async (carId) => {
    const response = await api.delete(`/favorites/${carId}`);
    return response.data;
  },
};

// ===================== PAYMENT API =====================

export const paymentAPI = {
  addMethod: async (paymentData) => {
    const response = await api.post('/payment-methods', paymentData);
    return response.data;
  },

  getMethods: async () => {
    const response = await api.get('/payment-methods');
    return response.data;
  },
};

// ===================== DASHBOARD API =====================

export const dashboardAPI = {
  getUserStats: async () => {
    const response = await api.get('/dashboard/user/stats');
    return response.data;
  },

  getOwnerStats: async () => {
    const response = await api.get('/dashboard/owner/stats');
    return response.data;
  },
};

export default api;
