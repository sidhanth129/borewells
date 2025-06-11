import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Truck, RefreshCw, Droplets, Settings, Search, Wrench, Download, Phone, Mail, Building2 } from 'lucide-react';

const Home: React.FC = () => {
  const services = [
    { icon: Truck, title: 'Borewell Drilling', description: 'Professional drilling services with modern equipment' },
    { icon: RefreshCw, title: 'Redrilling', description: 'Restore your existing borewell to optimal performance' },
    { icon: Droplets, title: 'Flushing', description: 'Clean and maintain your borewell system' },
    { icon: Settings, title: 'Pump Installation', description: 'Expert installation of water pumps' },
    { icon: Wrench, title: 'Casing', description: 'Protective casing for long-lasting borewells' },
    { icon: Search, title: 'Borewell Scanning', description: 'Advanced scanning to locate optimal drilling spots' }
  ];

  const scrollToContact = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const downloadQuote = () => {
    // Create a link to download the PDF
    const link = document.createElement('a');
    link.href = '/Shrinidhi Borewells.pdf.pdf';
    link.download = 'Shrinidhi_Borewells_Quote.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted Borewell Services
              <br />
              <span className="text-3xl md:text-5xl text-gray-700 dark:text-gray-300">in Bengaluru</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4 max-w-3xl mx-auto"
            >
              Est. 2018 | Member of KROA
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center space-x-2 text-lg text-gray-600 dark:text-gray-400 mb-8"
            >
              <Building2 size={20} />
              <span>GSTIN: 29ACPPJ9937Q1ZA</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <button
                onClick={scrollToContact}
                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
              >
                Get a Quote
              </button>
              
              <div className="flex items-center space-x-4">
                <a 
                  href="tel:9845000962"
                  className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-black dark:hover:border-white transition-colors"
                >
                  <Phone size={20} />
                  <span>Call Now</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="text-gray-400 dark:text-gray-600" size={24} />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive borewell solutions with professional expertise and modern equipment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-white dark:text-black" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rate Card Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Rate Card
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Transparent pricing for all our services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Drilling Rates</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Starting Rate</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">₹140/ft</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Advance Payment</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">₹75,000</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <button 
                    onClick={downloadQuote}
                    className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    <Download size={20} />
                    <span>Download Quote</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Owner Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
              About Our Owner
            </h2>
            
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div 
                className="w-48 h-48 rounded-full overflow-hidden shadow-lg flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/public/owner.png"
                  alt="Mr. Jagannath B.S. - Owner of Shrinidhi Borewells"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full items-center justify-center">
                  <span className="text-6xl text-gray-400 dark:text-gray-500">👤</span>
                </div>
              </motion.div>
              
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Mr. Jagannath B.S.
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  With over 15 years of experience in the borewell industry, Mr. Jagannath B.S. has established 
                  Shrinidhi Borewells as a trusted name in Bengaluru. As a proud member of KROA (Karnataka 
                  Rig Owners Association), he ensures that every project meets the highest standards of quality 
                  and professionalism.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="tel:9845000962"
                    className="flex items-center space-x-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    <Phone size={20} />
                    <span>9845000962</span>
                  </a>
                  <a 
                    href="mailto:shrinidhi.jagannath@gmail.com"
                    className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-black dark:hover:border-white transition-colors"
                  >
                    <Mail size={20} />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;