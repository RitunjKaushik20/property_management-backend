import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import propertyService from '../services/propertyService';

const AddProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'For Sale',
    bedrooms: '',
    bathrooms: '',
    area: '',
    yearBuilt: '',
    parking: '',
    features: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; 
    
    for (const file of files) {
      if (!validTypes.includes(file.type)) {
        setError('Invalid file type. Only JPEG, PNG, and WebP are allowed.');
        return;
      }
      if (file.size > maxSize) {
        setError('File size too large. Maximum size is 5MB.');
        return;
      }
    }

    setSelectedImages(files);
    
  
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      
      const propertyFormData = new FormData();
      
      propertyFormData.append('title', formData.title);
      propertyFormData.append('description', formData.description);
      propertyFormData.append('price', formData.price);
      propertyFormData.append('location', formData.location);
      propertyFormData.append('type', formData.type);
      propertyFormData.append('bedrooms', formData.bedrooms);
      propertyFormData.append('bathrooms', formData.bathrooms);
      propertyFormData.append('area', formData.area);
      
      if (formData.yearBuilt) {
        propertyFormData.append('yearBuilt', formData.yearBuilt);
      }
      if (formData.parking) {
        propertyFormData.append('parking', formData.parking);
      }
      if (formData.features) {
        propertyFormData.append('features', formData.features);
      }

 
      selectedImages.forEach((image) => {
        propertyFormData.append('images', image);
      });

      await propertyService.createProperty(propertyFormData);
      setSuccess('Property added successfully!');

      setTimeout(() => {
        navigate('/my-properties');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to add property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-dark-900 mb-2">
            Add New Property
          </h1>
          <p className="text-dark-600 mb-8">
            Enter property details to list it on the platform
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6">
              {success} Redirecting to your listings…
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-8"
          >
           
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">
                Basic Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., 3 BHK Luxury Apartment"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    rows="5"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Spacious flat in a gated society with lift, power backup, and security..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">
                      Listing Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="For Sale">For Sale</option>
                      <option value="For Rent">For Rent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      required
                      value={formData.price}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="7500000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Whitefield, Bengaluru, Karnataka"
                  />
                </div>
              </div>
            </div>

         
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">
                Property Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">
                    Bedrooms (BHK) *
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    required
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">
                    Bathrooms *
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    required
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">
                    Area (sq ft) *
                  </label>
                  <input
                    type="number"
                    name="area"
                    required
                    value={formData.area}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="1350"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">
                    Year Built
                  </label>
                  <input
                    type="number"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="2021"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-1">
                    Parking
                  </label>
                  <input
                    type="text"
                    name="parking"
                    value={formData.parking}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Covered car parking - 1 slot"
                  />
                </div>
              </div>
            </div>

          
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">
                Amenities
              </h2>

              <textarea
                name="features"
                rows="3"
                value={formData.features}
                onChange={handleChange}
                className="input-field"
                placeholder="Lift, Power Backup, Security, Gym, Swimming Pool, Park"
              />
              <p className="text-sm text-dark-500 mt-1">
                Enter amenities separated by commas
              </p>
            </div>

            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">
                Property Images
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600">Click to upload images</span>
                  <span className="text-sm text-gray-500 mt-1">JPEG, PNG, WebP up to 5MB each</span>
                </label>
              </div>

             
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                {loading ? 'Adding Property...' : 'Add Property'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddProperty;
