import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import propertyService from '../services/propertyService';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const data = await propertyService.getPropertyById(id);
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
      // Set demo data - use 'id' instead of '_id' for consistency
      setProperty(getDemoProperty(id));
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
    description: 'Stunning modern apartment in the heart of Manhattan. This beautifully designed unit features floor-to-ceiling windows, hardwood floors, and a gourmet kitchen. The open floor plan is perfect for entertaining, and the master suite offers a luxurious retreat with a spa-like bathroom. Building amenities include a 24-hour doorman, fitness center, and rooftop terrace with breathtaking city views.',
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
    propertyTax: 5200,
    hoaFees: 350,
    agent: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@propelboard.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
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

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark-900 mb-4">Property Not Found</h2>
          <Link to="/properties" className="btn-primary">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/properties" className="inline-flex items-center text-primary-600 hover:text-primary-700">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Properties
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
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {property.images.length > 1 && (
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
                    {property.type}
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
                  <p className="text-2xl font-bold text-dark-900">{property.bedrooms}</p>
                  <p className="text-sm text-dark-600">Bedrooms</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-dark-900">{property.bathrooms}</p>
                  <p className="text-sm text-dark-600">Bathrooms</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-dark-900">{property.area}</p>
                  <p className="text-sm text-dark-600">Sq Ft</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-dark-900">{property.yearBuilt}</p>
                  <p className="text-sm text-dark-600">Year Built</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Description</h2>
              <p className="text-dark-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
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

            {/* Additional Details */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Additional Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b border-dark-200">
                  <span className="text-dark-600">Parking:</span>
                  <span className="font-medium text-dark-900">{property.parking}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-200">
                  <span className="text-dark-600">Property Tax:</span>
                  <span className="font-medium text-dark-900">${property.propertyTax}/year</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-200">
                  <span className="text-dark-600">HOA Fees:</span>
                  <span className="font-medium text-dark-900">${property.hoaFees}/month</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-200">
                  <span className="text-dark-600">Type:</span>
                  <span className="font-medium text-dark-900">{property.type}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Agent & Contact */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
              <h3 className="text-xl font-bold text-dark-900 mb-4">Contact Agent</h3>
              
              {/* Agent Info */}
              <div className="flex items-center mb-6">
                <img
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold text-dark-900">{property.agent.name}</p>
                  <p className="text-sm text-dark-600">Licensed Agent</p>
                </div>
              </div>

              {/* Contact Form */}
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input-field"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-field"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input-field"
                />
                <textarea
                  rows="4"
                  placeholder="Message"
                  className="input-field"
                  defaultValue="I'm interested in this property. Please contact me with more details."
                ></textarea>
                <button type="submit" className="w-full btn-primary">
                  Send Message
                </button>
              </form>

              {/* Direct Contact */}
              <div className="mt-6 pt-6 border-t border-dark-200 space-y-3">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="flex items-center text-dark-700 hover:text-primary-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {property.agent.phone}
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="flex items-center text-dark-700 hover:text-primary-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {property.agent.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
