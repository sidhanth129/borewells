import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Placeholder images from Pexels
  const images = [
    {
      id: 1,
      src: '/public/1.png',
      category: 'drilling',
      title: 'Borewell Drilling Operation'
    },
    {
      id: 2,
      src: '/public/2.png',
      category: 'equipment',
      title: 'Professional Equipment'
    },
    {
      id: 3,
      src: '/public/3.png',
      category: 'drilling',
      title: 'Deep Drilling Process'
    },
    {
      id: 4,
      src: '/public/office.png',
      category: 'flushing',
      title: 'Borewell Flushing'
    },
    {
      id: 5,
      src: '/public/lorry.png',
      category: 'installation',
      title: 'Pump Installation'
    },
    {
      id: 6,
      src: '/public/6.png',
      category: 'drilling',
      title: 'Site Preparation'
    },
    {
      id: 7,
      src: "/public/jd.png",
      category: 'equipment',
      title: 'Modern Tools'
    },
    {
      id: 8,
      src: "/public/domestic.png",
      category: 'installation',
      title: 'Casing Installation'
    },
    {
      id: 9,
      src:"/public/oar2.jpg",
      category: 'flushing',
      title: 'Water Testing'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'drilling', label: 'Drilling' },
    { id: 'flushing', label: 'Flushing' },
    { id: 'installation', label: 'Installation' },
    { id: 'equipment', label: 'Equipment' }
  ];

  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Work Gallery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore our portfolio of successful borewell projects across Bengaluru
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Filter size={16} className="inline mr-2" />
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="wait">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotateY: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    rotateY: -90,
                    transition: { duration: 0.3 }
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 cursor-pointer"
                  style={{
                    clipPath: index % 3 === 0 
                      ? 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'
                      : index % 3 === 1
                      ? 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)'
                      : 'polygon(0 0, 100% 0, 100% 85%, 0% 100%)'
                  }}
                >
                  <div className="aspect-square overflow-hidden">
                    <motion.img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      onClick={() => setSelectedImage(image.src)}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  
                  <motion.div 
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                    initial={{ y: 100 }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 text-white">
                      <motion.h3 
                        className="text-lg font-semibold"
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {image.title}
                      </motion.h3>
                      <motion.p 
                        className="text-sm text-gray-300 capitalize"
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {image.category}
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* Floating animation effect */}
                  <motion.div
                    className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: -90 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={selectedImage}
                alt="Gallery Image"
                className="w-full h-full object-contain rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
              <motion.button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="text-white" size={24} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;