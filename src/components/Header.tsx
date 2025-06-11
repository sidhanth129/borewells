import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showCertificate, setShowCertificate] = React.useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.href = `/#${sectionId}`;
    } else {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (item: any) => {
    if (item.path === '/services') {
      scrollToSection('services');
    } else if (item.path === '/about') {
      scrollToSection('about');
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 3.0 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src="/WhatsApp Image 2025-05-20 at 12.52.00_4cdd4ffd.jpg" 
                  alt="Shrinidhi Borewells Logo" 
                  className="w-10 h-10 object-contain dark:invert"
                />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Shrinidhi Borewells
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Est. 2018 | 
                  <button 
                    onClick={() => setShowCertificate(true)}
                    className="ml-1 hover:text-black dark:hover:text-white transition-colors underline"
                  >
                    Member of KROA
                  </button>
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.path}>
                  {item.path === '/services' || item.path === '/about' ? (
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                        (item.path === '/services' && location.hash === '#services') ||
                        (item.path === '/about' && location.hash === '#about')
                          ? 'text-black dark:text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                        location.pathname === item.path
                          ? 'text-black dark:text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {item.label}
                      {location.pathname === item.path && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Contact Info & Theme Toggle */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-4 text-sm">
                <a 
                  href="tel:9845000962" 
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Phone size={16} />
                  <span>9845000962</span>
                </a>
                <a 
                  href="mailto:shrinidhi.jagannath@gmail.com" 
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Mail size={16} />
                  <span>shrinidhi.jagannath@gmail.com</span>
                </a>
              </div>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 border-t border-gray-200 dark:border-gray-700 pt-4"
              >
                <nav className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <div key={item.path}>
                      {item.path === '/services' || item.path === '/about' ? (
                        <button
                          onClick={() => handleNavClick(item)}
                          className="w-full text-left px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`px-3 py-2 text-sm font-medium transition-colors ${
                            location.pathname === item.path
                              ? 'text-black dark:text-white bg-gray-100 dark:bg-gray-800 rounded-lg'
                              : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <a 
                    href="tel:9845000962" 
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <Phone size={16} />
                    <span>9845000962</span>
                  </a>
                  <a 
                    href="mailto:shrinidhi.jagannath@gmail.com" 
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <Mail size={16} />
                    <span>shrinidhi.jagannath@gmail.com</span>
                  </a>
                  <button 
                    onClick={() => setShowCertificate(true)}
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors underline"
                  >
                    View KROA Certificate
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* KROA Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowCertificate(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full bg-white dark:bg-gray-800 rounded-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  KROA Membership Certificate
                </h3>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="text-gray-500 dark:text-gray-400" size={24} />
                </button>
              </div>
              
              {/* Certificate Image Container */}
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center">
                <img
                  src="/public/kroa-certificate.jpg"
                  alt="KROA Membership Certificate"
                  className="max-w-full max-h-96 mx-auto object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <div className="hidden text-gray-500 dark:text-gray-400">
                  <div className="w-64 h-48 bg-gray-200 dark:bg-gray-600 rounded-lg mx-auto flex items-center justify-center mb-4">
                    <span className="text-4xl">📜</span>
                  </div>
                  <p className="text-lg font-semibold mb-2">KROA Membership Certificate</p>
                  <p className="text-sm">
                    Certificate image not found. Please add your KROA certificate image as 
                    <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded mx-1">
                      /public/kroa-certificate.jpg
                    </code>
                  </p>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Karnataka Rig Owners Association - Member since 2018
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;