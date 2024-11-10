import axios from 'axios';

const api = axios.create({
  baseURL: 'secure-saas-service.azurewebsites.net', // Update this to your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
