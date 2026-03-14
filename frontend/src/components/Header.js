import React from 'react';
import { Link2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Link2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">URL Shortener</h1>
              <p className="text-sm text-gray-500">Shorten your links instantly</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">
              Features
            </a>
            <a href="#stats" className="text-gray-600 hover:text-primary-600 transition-colors">
              Analytics
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;