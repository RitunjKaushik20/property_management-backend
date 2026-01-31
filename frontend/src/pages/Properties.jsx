import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '../components/PropertyCard';
import propertyService from '../services/propertyService';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await propertyService.getProperties(filters);
      // Backend returns array directly, not wrapped in {properties: [...]}
      setProperties(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Set demo data for now
      setProperties(getDemoProperties());
    } finally {
      setLoading(false);
    }
  };

  const getDemoProperties = () => [
    {
      _id: '1',
      title: 'Modern Downtown Apartment',
      price: 450000,
      location: 'Manhattan, New York',
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: 'For Sale',
    },
    {
      _id: '2',
      title: 'Luxury Beachfront Villa',
      price: 1250000,
      location: 'Miami Beach, Florida',
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'],
      bedrooms: 4,
      bathrooms: 3,
      area: 3500,
      type: 'For Sale',
    },
    {
      _id: '3',
      title: 'Cozy Suburban House',
      price: 325000,
      location: 'Austin, Texas',
      images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
      bedrooms: 3,
      bathrooms: 2,
      area: 2000,
      type: 'For Sale',
    },
    {
      _id: '4',
      title: 'Penthouse with City View',
      price: 890000,
      location: 'Chicago, Illinois',
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
      bedrooms: 3,
      bathrooms: 2,
      area: 2200,
      type: 'For Sale',
    },
    {
      _id: '5',
      title: 'Charming Country Estate',
      price: 675000,
      location: 'Nashville, Tennessee',
      images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800'],
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      type: 'For Sale',
    },
    {
      _id: '6',
      title: 'Contemporary Loft',
      price: 520000,
      location: 'Seattle, Washington',
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
      bedrooms: 2,
      bathrooms: 2,
      area: 1500,
      type: 'For Sale',
    },
    {
      _id: '7',
      title: 'Mountain View Cabin',
      price: 385000,
      location: 'Denver, Colorado',
      images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      type: 'For Sale',
    },
    {
      _id: '8',
      title: 'Waterfront Condo',
      price: 710000,
      location: 'San Diego, California',
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
      bedrooms: 2,
      bathrooms: 2,
      area: 1600,
      type: 'For Sale',
    },
    {
      _id: '9',
      title: 'Historic Brownstone',
      price: 925000,
      location: 'Boston, Massachusetts',
      images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800'],
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      type: 'For Sale',
    },
  ];

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
    });
    fetchProperties();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20 pt-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Find Your Dream Property</h1>
            <p className="text-xl text-white/90">
              Browse through {properties.length}+ verified properties
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white shadow-md sticky top-20 z-40">
        <div className="container mx-auto px-4 py-6">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by location or title..."
              className="md:col-span-2 input-field"
            />
            
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="">All Types</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>

            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min Price"
              className="input-field"
            />

            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max Price"
              className="input-field"
            />

            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="">Bedrooms</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </form>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSearch}
              className="btn-primary"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="btn-outline"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-dark-600">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-24 h-24 mx-auto text-dark-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-2xl font-bold text-dark-900 mb-2">No Properties Found</h3>
              <p className="text-dark-600">Try adjusting your filters to see more results</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-dark-900">
                  {properties.length} Properties Available
                </h2>
                <select className="input-field w-48">
                  <option>Sort by: Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12 space-x-2">
                <button className="px-4 py-2 border border-dark-300 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                  Previous
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-dark-300 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                  2
                </button>
                <button className="px-4 py-2 border border-dark-300 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                  3
                </button>
                <button className="px-4 py-2 border border-dark-300 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties;
