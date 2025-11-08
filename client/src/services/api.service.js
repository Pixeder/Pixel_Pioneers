import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
  // It's a good practice to use environment variables for the base URL
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can also add interceptors for handling requests and responses globally.
// For example, to add an authentication token to every request:
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
