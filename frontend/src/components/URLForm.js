import React, { useState } from 'react';
import { Loader2, Link } from 'lucide-react';

const URLForm = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
          Enter your long URL
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            className="input-field pl-10"
            required
            disabled={loading}
          />
        </div>
      </div>
      
      <button
        type="submit"
        disabled={loading || !url.trim()}
        className="btn-primary w-full flex items-center justify-center space-x-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Shortening...</span>
          </>
        ) : (
          <>
            <Link className="h-4 w-4" />
            <span>Shorten URL</span>
          </>
        )}
      </button>
    </form>
  );
};

export default URLForm;