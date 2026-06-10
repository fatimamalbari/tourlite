import axios from 'axios';
import { toast } from '@/hooks/use-toast';

export const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract error message
    let message = 'An unexpected error occurred';
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.data && error.response.data.error) {
        message = error.response.data.error;
      } else {
        message = `Server Error: ${error.response.status}`;
      }
    } else if (error.request) {
      // The request was made but no response was received
      message = 'Network error. Please check your connection.';
    } else {
      // Something happened in setting up the request that triggered an Error
      message = error.message;
    }

    // Trigger global error toast
    toast.error('Request Failed', message);

    return Promise.reject(error);
  }
);
