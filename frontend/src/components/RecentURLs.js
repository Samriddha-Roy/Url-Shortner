import React from 'react';
import { Copy, BarChart3, ExternalLink, Clock } from 'lucide-react';

const RecentURLs = ({ urls, onCopy, onGetStats }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="h-5 w-5 text-gray-500" />
        <h3 className="text-lg font-semibold text-gray-900">Recent URLs</h3>
      </div>
      
      <div className="space-y-3">
        {urls.map((url, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <a
                href={url.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {url.shortUrl}
              </a>
              <span className="text-xs text-gray-500">
                {formatDate(url.createdAt)}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3 break-all">
              {url.originalUrl}
            </p>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onCopy(url.shortUrl)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded flex items-center space-x-1"
              >
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </button>
              <button
                onClick={() => onGetStats(url.shortCode)}
                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded flex items-center space-x-1"
              >
                <BarChart3 className="h-3 w-3" />
                <span>Stats</span>
              </button>
              <a
                href={url.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded flex items-center space-x-1"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Open</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentURLs;