import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface PerformanceData {
  coreWebVitals: {
    FCP: string;
    LCP: string;
    CLS: string;
    INP: string;
    SpeedIndex: string;
    TBT: string;
  };
  opportunities: {
    renderBlocking: number;
    unusedCSS: number;
    unusedJS: number;
    thirdPartyResources: number;
  };
  network: {
    totalRequests: number;
    totalPageSize: number;
    mainThreadTime: string;
  };
  scores: {
    performance: {
      score: number;
    };
    seo: {
      score: number;
    };
  };
}

export function URLAnalysis() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/analyze/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url
        })
      });
      
      if (!response.ok) {
        throw new Error('Analysis failed');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError('Failed to analyze URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">URL Analysis</h1>
      
      <div className="mb-8">
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Search className="w-4 h-4" />
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Core Web Vitals</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">First Contentful Paint</p>
                <p className="text-lg font-medium">{data.coreWebVitals.FCP}</p>
              </div>
              <div>
                <p className="text-gray-600">Largest Contentful Paint</p>
                <p className="text-lg font-medium">{data.coreWebVitals.LCP}</p>
              </div>
              <div>
                <p className="text-gray-600">Cumulative Layout Shift</p>
                <p className="text-lg font-medium">{data.coreWebVitals.CLS}</p>
              </div>
              <div>
                <p className="text-gray-600">Speed Index</p>
                <p className="text-lg font-medium">{data.coreWebVitals.SpeedIndex}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Opportunities</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Unused JavaScript</p>
                <p className="text-lg font-medium">{data.opportunities.unusedJS} bytes</p>
              </div>
              <div>
                <p className="text-gray-600">Unused CSS</p>
                <p className="text-lg font-medium">{data.opportunities.unusedCSS} bytes</p>
              </div>
              <div>
                <p className="text-gray-600">Render Blocking Resources</p>
                <p className="text-lg font-medium">{data.opportunities.renderBlocking}</p>
              </div>
              <div>
                <p className="text-gray-600">Third Party Resources</p>
                <p className="text-lg font-medium">{data.opportunities.thirdPartyResources}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Network</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Total Requests</p>
                <p className="text-lg font-medium">{data.network.totalRequests}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Page Size</p>
                <p className="text-lg font-medium">{Math.round(data.network.totalPageSize / 1024)} KB</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Scores</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Performance Score</p>
                <p className="text-lg font-medium">{Math.round(data.scores.performance.score * 100)}%</p>
              </div>
              <div>
                <p className="text-gray-600">SEO Score</p>
                <p className="text-lg font-medium">{Math.round(data.scores.seo.score * 100)}%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}