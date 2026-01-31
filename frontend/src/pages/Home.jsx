import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropertyCard from '../components/PropertyCard';
import propertyService from '../services/propertyService';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      // Fetch first 6 properties as featured
      const data = await propertyService.getProperties({ limit: 6 });
      setFeaturedProperties(data.properties || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Set demo data for now
      setFeaturedProperties(getDemoProperties());
    } finally {
      setLoading(false);
    }
  };

  const getDemoProperties = () => [
    {
      _id: '1',
      title: 'Modern Apartment in South Delhi',
      price: 8500000, // ₹85 Lakhs
      location: 'South Delhi, Delhi',
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
      type: 'For Sale',
    },
    {
      _id: '2',
      title: 'Luxury Villa in Mumbai Suburbs',
      price: 35000000, // ₹3.5 Cr
      location: 'Bandra West, Mumbai',
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'],
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      type: 'For Sale',
    },
    {
      _id: '3',
      title: 'Cozy 2BHK in Bangalore',
      price: 6500000, // ₹65 Lakhs
      location: 'Whitefield, Bangalore',
      images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      type: 'For Sale',
    },
    {
      _id: '4',
      title: 'Penthouse with City View in Pune',
      price: 12000000, // ₹1.2 Cr
      location: 'Koregaon Park, Pune',
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
      bedrooms: 3,
      bathrooms: 3,
      area: 2000,
      type: 'For Sale',
    },
    {
      _id: '5',
      title: 'Elegant Villa in Jaipur',
      price: 9500000, // ₹95 Lakhs
      location: 'C-Scheme, Jaipur',
      images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800'],
      bedrooms: 4,
      bathrooms: 3,
      area: 3000,
      type: 'For Sale',
    },
    {
      _id: '6',
      title: 'Contemporary 2BHK in Hyderabad',
      price: 7200000, // ₹72 Lakhs
      location: 'Gachibowli, Hyderabad',
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: 'For Sale',
    },
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Verified Properties',
      description: 'All listings are thoroughly verified for authenticity and legal approvals',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Best Prices',
      description: 'Competitive pricing with transparent fees and no hidden costs',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your property queries',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-primary-900 to-primary-700">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920')] bg-cover bg-center opacity-10"></div>
        </div>

        {/* Animated circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Trusted Property Solutions
              <br />
              <span className="text-primary-300">Across India</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto">
              Discover your dream home from thousands of verified listings. 
              Professional service, transparent pricing, and expert guidance in every major Indian city.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/properties"
                className="bg-white text-primary-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                Explore Properties
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary-700 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-xl hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-block p-4 bg-primary-100 rounded-full text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-dark-900 mb-2">{feature.title}</h3>
                <p className="text-dark-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Featured Properties in India</h2>
            <p className="section-subtitle">
              Explore our hand-picked selection of premium properties
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/properties"
              className="btn-primary inline-block"
            >
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your Dream Property in India?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Join thousands of satisfied clients across India who found their perfect home
            </p>
            <Link
              to="/register"
              className="bg-white text-primary-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-all duration-300 inline-block hover:shadow-2xl hover:-translate-y-1"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
