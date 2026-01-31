import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PropertyCard = ({ property }) => {
  const {
    id,
    _id,
    title,
    price,
    location,
    images,
    bedrooms,
    bathrooms,
    area,
    type,
  } = property;

  const propertyId = id || _id;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card group"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {type || 'For Sale'}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary-50 transition-colors duration-200">
            <svg className="w-5 h-5 text-dark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-5">

        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-bold text-primary-600">{formatPrice(price)}</h3>
        </div>

       
        <h4 className="text-lg font-semibold text-dark-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors duration-200">
          {title}
        </h4>

        
        <div className="flex items-center text-dark-600 mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm line-clamp-1">{location}</span>
        </div>

        
        <div className="flex items-center justify-between text-sm text-dark-600 border-t border-dark-200 pt-4">
          <div className="flex items-center space-x-4">
            {bedrooms && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>{bedrooms} Beds</span>
              </div>
            )}
            {bathrooms && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                <span>{bathrooms} Baths</span>
              </div>
            )}
            {area && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span>{area} sqft</span>
              </div>
            )}
          </div>
        </div>

      
        <Link
          to={`/properties/${propertyId}`}
          className="mt-4 w-full block text-center bg-primary-600 text-white py-2.5 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
