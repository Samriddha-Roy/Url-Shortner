import React from 'react';
import { Github, Twitter, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">URL Shortener</h3>
            <p className="text-gray-400 text-sm">
              A fast, reliable, and secure URL shortening service built with modern web technologies.
            </p>
          </div>
          <div>
            <h4 className="text-md font-medium mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Instant URL shortening</li>
              <li>• Click analytics</li>
              <li>• Custom short codes</li>
              <li>• Rate limiting protection</li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-medium mb-4">Connect</h4>
            <div className="flex space-x-4">
              <Github className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Globe className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2024 URL Shortener. Built with React & Node.js</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;