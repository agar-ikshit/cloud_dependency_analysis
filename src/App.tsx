import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BarChart2, Share2, Bot,Search } from 'lucide-react';
import { Dashboard } from './pages/Dashboard';
import { DependencyGraph } from './pages/DependencyGraph';
import { AIAnalysis } from './pages/AIAnalysis';
import { URLAnalysis } from './pages/URLAnalysis';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <nav className="w-64 bg-gray-800 text-white p-6">
          <h1 className="text-xl font-bold mb-8">Dependency Analyzer</h1>
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 transition-colors"
              >
                <BarChart2 className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/graph"
                className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Dependency Graph</span>
              </Link>
            </li>
            <li>
              <Link
                to="/ai-analysis"
                className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 transition-colors"
              >
                <Bot className="w-5 h-5" />
                <span>AI Analysis</span>
              </Link>
            </li>
            <li>
              <Link
                to="/url-analysis"
                className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 transition-colors"
              >
                <Search className="w-5 h-5" />
                <span>URL Analysis</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <main className="flex-1 bg-gray-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/graph" element={<DependencyGraph />} />
            <Route path="/ai-analysis" element={<AIAnalysis />} />
            <Route path="/url-analysis" element={<URLAnalysis />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;