import { motion } from 'framer-motion';

const About = () => {
  const team = [
    {
      name: 'Ritunj Kaushik',
      role: 'CEO & Founder',
      // image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
    
  ];

  const stats = [
    { number: '10K+', label: 'Properties Listed' },
    { number: '5K+', label: 'Happy Clients' },
    { number: '15+', label: 'Years Experience' },
    { number: '50+', label: 'Expert Agents' },
  ];

  return (
    <div className="min-h-screen bg-white">
     
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20 pt-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About PropelBoard</h1>
            <p className="text-xl text-white/90">
              Your trusted partner in finding the perfect property since 2009
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-dark-900 mb-6">Our Mission</h2>
              <p className="text-lg text-dark-700 leading-relaxed">
                At PropelBoard, we're on a mission to revolutionize the real estate industry by providing 
                transparent, efficient, and customer-centric property solutions. We believe that finding your 
                dream property should be an exciting journey, not a stressful process.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-primary-50 p-8 rounded-xl"
              >
                <h3 className="text-2xl font-bold text-dark-900 mb-4">Our Vision</h3>
                <p className="text-dark-700">
                  To become the most trusted and innovative real estate platform, empowering millions 
                  to make informed property decisions with confidence and ease.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-blue-50 p-8 rounded-xl"
              >
                <h3 className="text-2xl font-bold text-dark-900 mb-4">Our Values</h3>
                <p className="text-dark-700">
                  Integrity, transparency, and customer satisfaction are at the core of everything we do. 
                  We're committed to building lasting relationships based on trust and exceptional service.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-5xl font-bold text-primary-600 mb-2">{stat.number}</p>
                <p className="text-dark-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-dark-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-dark-600">
              Dedicated professionals committed to your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-dark-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

   
      <section className="py-20 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Join thousands of satisfied clients and find your dream property today
            </p>
            <a
              href="/properties"
              className="bg-white text-primary-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-all duration-300 inline-block hover:shadow-2xl"
            >
              Browse Properties
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
