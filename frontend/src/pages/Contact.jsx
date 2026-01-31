import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Visit Us',
      details: 'New Delhi, India',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Call Us',
      details: '+91 98765 43210',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email Us',
      details: 'support@propelboard.in',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20 pt-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-white/90">
              Have a question or need help? Reach out to us — we’re happy to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md text-center"
              >
                <div className="inline-block p-4 bg-primary-100 rounded-full text-primary-600 mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-dark-900 mb-2">{info.title}</h3>
                <p className="text-dark-600">{info.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-dark-900 mb-6">Send Us a Message</h2>

              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                  Thank you! We’ll get back to you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <input className="input-field" name="name" placeholder="Your Name" required onChange={handleChange} value={formData.name} />
                <input className="input-field" name="email" type="email" placeholder="Email Address" required onChange={handleChange} value={formData.email} />
                <input className="input-field" name="phone" placeholder="Phone Number (Optional)" onChange={handleChange} value={formData.phone} />
                <input className="input-field" name="subject" placeholder="Subject" required onChange={handleChange} value={formData.subject} />
                <textarea className="input-field" rows="5" name="message" placeholder="Your Message" required onChange={handleChange} value={formData.message}></textarea>
                <button type="submit" className="w-full btn-primary">Send Message</button>
              </form>
            </motion.div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden">
              <iframe
                title="India Office Location"
                src="https://www.google.com/maps?q=New%20Delhi%20India&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px' }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-md text-center">
            <h3 className="text-2xl font-bold mb-6">Office Hours (IST)</h3>
            <p>Monday – Friday: 10:00 AM – 7:00 PM</p>
            <p>Saturday: 10:00 AM – 2:00 PM</p>
            <p>Sunday & Public Holidays: Closed</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
