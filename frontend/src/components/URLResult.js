import React from 'react';
import { Copy, BarChart3, ExternalLink, RefreshCw } from 'lucide-react';

const URLResult = ({ shortUrl, originalUrl, shortCode, onCopy, onGetStats, onReset }) => {
  return (
    <div className="card mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Shortened URL</h3>
        <button
          onClick={onReset}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          title="Create another URL"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Short URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short URL
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium break-all"
              >
                {shortUrl}
              </a>
            </div>
            <button
              onClick={() => onCopy(shortUrl)}
              className="btn-secondary flex items-center space-x-1"
              title="Copy to clipboard"
            >
              <Copy className="h-4 w-4" />
              <span className="hidden sm:inline">Copy</span>
            </button>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center space-x-1"
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Open</span>
            </a>
          </div>
        </div>

        {/* Original URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original URL
          </label>
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
            <p className="text-gray-600 break-all text-sm">{originalUrl}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => onGetStats(shortCode)}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>View Statistics</span>
          </button>
          <button
            onClick={() => onCopy(shortUrl)}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <Copy className="h-4 w-4" />
            <span>Copy Short URL</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default URLResult;