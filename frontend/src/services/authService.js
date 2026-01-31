import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});


const authService = {

  register: async (userData) => {
    try {
      const { name, email, password } = userData;


      if (!name || !email || !password) {
        throw { message: 'Name, email, and password are required.' };
      }

      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      return response.data;
    } catch (error) {

      throw error.response?.data || { message: error.message || 'Registration failed' };
    }
  },


  login: async (credentials) => {
    try {
      const { email, password } = credentials;

      if (!email || !password) {
        throw { message: 'Email and password are required.' };
      }

      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message || 'Login failed' };
    }
  },


  getProfile: async () => {
    try {
      const response = await api.get('/auth/me'); 
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  },


  updateProfile: async (userData) => {
    try {
      const { username, email } = userData;

      if (!username || !email) {
        throw { message: 'Username and email are required.' };
      }

      const response = await api.put('/auth/profile', { username, email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },


  changePassword: async (passwordData) => {
    try {
      const { currentPassword, newPassword } = passwordData;

      if (!currentPassword || !newPassword) {
        throw { message: 'Current and new password are required.' };
      }

      const response = await api.put('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to change password' };
    }
  },
};

export default authService;
