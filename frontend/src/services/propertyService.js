import api from '../api/axios';

const propertyService = {

  getProperties: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/properties?${queryParams}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch properties' };
    }
  },

  getPropertyById: async (id) => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch property' };
    }
  },


  createProperty: async (propertyData) => {
    try {
    
      const response = await api.post('/properties', propertyData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create property' };
    }
  },


  updateProperty: async (id, propertyData) => {
    try {
      const response = await api.put(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update property' };
    }
  },


  deleteProperty: async (id) => {
    try {
      const response = await api.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete property' };
    }
  },


  getMyProperties: async () => {
    try {
      const response = await api.get('/properties/my-properties');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch your properties' };
    }
  },


  uploadImages: async (propertyId, images) => {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await api.post(`/properties/${propertyId}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload images' };
    }
  },
};

export default propertyService;
