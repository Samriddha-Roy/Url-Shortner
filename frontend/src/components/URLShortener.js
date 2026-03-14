import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link2, Copy, BarChart3, ExternalLink, Loader2 } from 'lucide-react';
import axios from 'axios';
import URLForm from './URLForm';
import URLResult from './URLResult';
import URLStats from './URLStats';
import RecentURLs from './RecentURLs';

const URLShortener = () => {
  const [shortUrl, setShortUrl] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentUrls, setRecentUrls] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState(null);

  const handleSubmit = async (url) => {
    if (!url.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/shorten', {
        originalUrl: url.trim()
      });

      const { shortUrl, shortCode, originalUrl } = response.data;
      
      setShortUrl(shortUrl);
      setOriginalUrl(originalUrl);
      setShortCode(shortCode);
      
      // Add to recent URLs
      const newUrl = {
        shortUrl,
        shortCode,
        originalUrl,
        createdAt: new Date().toISOString()
      };
      
      setRecentUrls(prev => [newUrl, ...prev.slice(0, 4)]);
      
      toast.success('URL shortened successfully!');
    } catch (error) {
      console.error('Error shortening URL:', error);
      const errorMessage = error.response?.data?.error || 'Failed to shorten URL';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const handleGetStats = async (code) => {
    try {
      const response = await axios.get(`/api/stats/${code}`);
      setStats(response.data);
      setShowStats(true);
    } catch (error) {
      toast.error('Failed to fetch statistics');
    }
  };

  const handleReset = () => {
    setShortUrl('');
    setOriginalUrl('');
    setShortCode('');
    setShowStats(false);
    setStats(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="bg-primary-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <Link2 className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Shorten Your URLs
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform long, complex URLs into short, shareable links. Track clicks and manage your links with ease.
        </p>
      </div>

      {/* Main Form */}
      <div className="card mb-8">
        <URLForm onSubmit={handleSubmit} loading={loading} />
      </div>

      {/* Results */}
      {shortUrl && (
        <URLResult
          shortUrl={shortUrl}
          originalUrl={originalUrl}
          shortCode={shortCode}
          onCopy={handleCopy}
          onGetStats={handleGetStats}
          onReset={handleReset}
        />
      )}

      {/* Statistics Modal */}
      {showStats && stats && (
        <URLStats
          stats={stats}
          onClose={() => setShowStats(false)}
        />
      )}

      {/* Recent URLs */}
      {recentUrls.length > 0 && (
        <RecentURLs
          urls={recentUrls}
          onCopy={handleCopy}
          onGetStats={handleGetStats}
        />
      )}

      {/* Features Section */}
      <div id="features" className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Why Choose Our URL Shortener?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Link2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Instant Shortening</h3>
            <p className="text-gray-600 text-sm">
              Generate short URLs instantly with our fast and reliable service.
            </p>
          </div>
          <div className="card text-center">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Click Analytics</h3>
            <p className="text-gray-600 text-sm">
              Track clicks and monitor the performance of your shortened URLs.
            </p>
          </div>
          <div className="card text-center">
            <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <ExternalLink className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Sharing</h3>
            <p className="text-gray-600 text-sm">
              Share your shortened URLs anywhere with one-click copy functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLShortener;