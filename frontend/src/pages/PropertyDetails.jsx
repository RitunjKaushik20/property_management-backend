import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import propertyService from '../services/propertyService';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      console.log('Fetching property with id:', id);
      const data = await propertyService.getPropertyById(id);
      console.log('Property data:', data);
      if (data) {
        setProperty(data);
        setError(null);
      } else {
        // Property not found
        setProperty(null);
        setError('Property not found');
      }
    } catch (error) {
      console.error('Error fetching property:', error);
      console.error('Error response:', error.response?.data);
      
      // Check if it's a 404 or other error
      if (error.response?.status === 404) {
        setProperty(null);
        setError('Property not found');
      } else if (error.response?.status === 401) {
        // Unauthorized - might need to show login
        setProperty(null);
        setError('Please login to view this property');
      } else {
        // Show demo data for demo purposes when API fails
        setProperty(getDemoProperty(id));
      }
    } finally {
      setLoading(false);
    }
  };

  const getDemoProperty = (id) => ({
    id: id,
    title: 'Modern Downtown Apartment',
    price: 450000,
    location: '123 Main Street, Manhattan, New York, NY 10001',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200',
    ],
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: 'For Sale',
    description: 'Stunning modern apartment in the heart of Manhattan. This beautifully designed unit features floor-to-ceiling windows, hardwood floors, and a gourmet kitchen.',
    features: [
      'Central Air Conditioning',
      'Hardwood Floors',
      'Granite Countertops',
      'Stainless Steel Appliances',
      'In-Unit Washer/Dryer',
      'Walk-in Closets',
      'Balcony',
      'Pet Friendly',
    ],
    yearBuilt: 2020,
    parking: 'Covered Parking - 1 Space',
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-dark-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error && !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark-900 mb-4">Oops!</h2>
          <p className="text-dark-600 mb-6">{error}</p>
          <Link to="/my-properties" className="btn-primary">
            Back to My Properties
          </Link>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark-900 mb-4">Property Not Found</h2>
          <Link to="/my-properties" className="btn-primary">
            Back to My Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/my-properties" className="inline-flex items-center text-primary-600 hover:text-primary-700">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to My Properties
        </Link>
      </div>

      {/* Image Gallery */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative h-96 md:h-[500px] rounded-xl overflow-hidden"
            >
              <img
                src={property.images?.[currentImageIndex] || property.images?.[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {property.images && property.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </motion.div>

            {/* Thumbnails */}
            {property.images && property.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {property.images.slice(0, 6).map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-32 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      currentImageIndex === index ? 'border-primary-600' : 'border-transparent hover:border-dark-300'
                    }`}
                  >
                    <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    {property.type || 'For Sale'}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-dark-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-dark-600">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary-600">{formatPrice(property.price)}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-dark-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-dark-900">{property.bedrooms || '-'}</p>
                  <p className="text-sm text-dark-600">Bedrooms</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-dark-900">{property.bathrooms || '-'}</p>
                  <p className="text-sm text-dark-600">Bathrooms</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-dark-900">{property.area || '-'}</p>
                  <p className="text-sm text-dark-600">Sq Ft</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-dark-900">{property.yearBuilt || '-'}</p>
                  <p className="text-sm text-dark-600">Year Built</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Description</h2>
              <p className="text-dark-700 leading-relaxed">{property.description || 'No description available.'}</p>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-dark-900 mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-dark-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Details */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Additional Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.parking && (
                  <div className="flex justify-between py-2 border-b border-dark-200">
                    <span className="text-dark-600">Parking:</span>
                    <span className="font-medium text-dark-900">{property.parking}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-dark-200">
                  <span className="text-dark-600">Type:</span>
                  <span className="font-medium text-dark-900">{property.type || 'For Sale'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
              <h3 className="text-xl font-bold text-dark-900 mb-4">Property Actions</h3>
              
              <div className="space-y-4">
                <Link
                  to={`/edit-property/${property.id}`}
                  className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Edit Property
                </Link>
                
                <button
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  onClick={() => alert('Delete functionality would go here')}
                >
                  Delete Property
                </button>
              </div>

              {/* Owner Info */}
              {property.owner && (
                <div className="mt-6 pt-6 border-t border-dark-200">
                  <h4 className="font-semibold text-dark-900 mb-2">Listed By</h4>
                  <p className="text-dark-600">{property.owner.name || 'Property Owner'}</p>
                  <p className="text-dark-600">{property.owner.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;

