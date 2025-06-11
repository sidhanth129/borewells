import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <img 
                  src="/WhatsApp Image 2025-05-20 at 12.52.00_4cdd4ffd.jpg" 
                  alt="Shrinidhi Borewells Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">Shrinidhi Borewells</h3>
                <p className="text-sm text-gray-400">Est. 2018 | Member of KROA</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Trusted borewell services in Bengaluru with over 6 years of experience. 
              We provide reliable water solutions for residential and commercial properties.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-400" />
                <a href="tel:9845000962" className="text-gray-300 hover:text-white transition-colors">
                  9845000962
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-400" />
                <a href="mailto:shrinidhi.jagannath@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  shrinidhi.jagannath@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-gray-300">Bengaluru, Karnataka</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock size={16} className="text-gray-400" />
                <span className="text-gray-300">Mon - Sat: 8:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Borewell Drilling</li>
              <li>Redrilling</li>
              <li>Flushing</li>
              <li>Pump Installation</li>
              <li>Casing</li>
              <li>Borewell Scanning</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Shrinidhi Borewells. All rights reserved. | Owner: Mr. Jagannath B.S.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;