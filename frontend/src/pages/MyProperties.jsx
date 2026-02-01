import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import propertyService from '../services/propertyService';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const data = await propertyService.getMyProperties();
      // Backend returns array with 'id' field (Prisma default)
      setProperties(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Demo data for India - using 'id' instead of '_id'
      setProperties(getDemoProperties());
    } finally {
      setLoading(false);
    }
  };

  const getDemoProperties = () => [
    {
      id: '1',
      title: '3 BHK Luxury Apartment',
      price: 8500000,
      location: 'Whitefield, Bengaluru',
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
      bedrooms: 3,
      bathrooms: 2,
      area: 1450,
      type: 'For Sale',
      status: 'Active',
      views: 342,
      inquiries: 18,
    },
    {
      id: '2',
      title: 'Independent Villa with Garden',
      price: 21500000,
      location: 'Gurgaon Sector 57, Haryana',
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'],
      bedrooms: 4,
      bathrooms: 4,
      area: 3200,
      type: 'For Sale',
      status: 'Active',
      views: 610,
      inquiries: 34,
    },
    {
      id: '3',
      title: '2 BHK Ready-to-Move Flat',
      price: 6200000,
      location: 'Andheri East, Mumbai',
      images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
      bedrooms: 2,
      bathrooms: 2,
      area: 980,
      type: 'For Sale',
      status: 'Pending',
      views: 198,
      inquiries: 9,
    },
  ];

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await propertyService.deleteProperty(id);
        // Remove deleted property from state
        setProperties(properties.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Failed to delete property. Please try again.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-property/${id}`);
  };

  // 🇮🇳 INR formatting
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-dark-600">Loading your properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-dark-900 mb-2">My Properties</h1>
              <p className="text-dark-600">Manage and track your property listings</p>
            </div>
            <Link to="/add-property" className="btn-primary">
              + Add New Property
            </Link>
          </div>

          {properties.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <h3 className="text-2xl font-bold text-dark-900 mb-2">No Properties Added</h3>
              <p className="text-dark-600 mb-6">
                Start by adding your first property listing
              </p>
              <Link to="/add-property" className="btn-primary inline-block">
                Add Property
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {properties.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/3">
                      <img
                        src={property.images?.[0]}
                        alt={property.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          property.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {property.status}
                        </span>
                        <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-medium">
                          {property.type}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-dark-900">
                        {property.title}
                      </h3>

                      <p className="text-sm text-dark-600 mb-2">
                        📍 {property.location}
                      </p>

                      <p className="text-3xl font-bold text-primary-600 mb-4">
                        {formatPrice(property.price)}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 border-t pt-4">
                        <div>
                          <p className="text-sm text-dark-600">Bedrooms</p>
                          <p className="font-semibold">{property.bedrooms}</p>
                        </div>
                        <div>
                          <p className="text-sm text-dark-600">Bathrooms</p>
                          <p className="font-semibold">{property.bathrooms}</p>
                        </div>
                        <div>
                          <p className="text-sm text-dark-600">Area</p>
                          <p className="font-semibold">{property.area} sq ft</p>
                        </div>
                        <div>
                          <p className="text-sm text-dark-600">Inquiries</p>
                          <p className="font-semibold">{property.inquiries}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Link
                          to={`/properties/${property.id}`}
                          className="flex-1 text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleEdit(property.id)}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyProperties;
