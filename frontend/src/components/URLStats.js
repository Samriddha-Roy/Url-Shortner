import React from 'react';
import { X, BarChart3, Calendar, MousePointer } from 'lucide-react';

const URLStats = ({ stats, onClose }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">URL Statistics</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Short Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Code
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              <code className="text-primary-600 font-mono font-medium">
                {stats.shortCode}
              </code>
            </div>
          </div>

          {/* Original URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original URL
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              <p className="text-gray-600 break-all text-sm">
                {stats.originalUrl}
              </p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MousePointer className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Total Clicks</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{stats.clicks}</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Created</span>
              </div>
              <p className="text-xs font-medium text-green-900">
                {formatDate(stats.createdAt)}
              </p>
            </div>
          </div>

          {/* Performance Indicator */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Performance</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Click Rate</span>
                <span className="font-medium text-gray-900">
                  {stats.clicks > 0 ? 'Active' : 'No clicks yet'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(stats.clicks * 10, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full btn-primary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default URLStats;