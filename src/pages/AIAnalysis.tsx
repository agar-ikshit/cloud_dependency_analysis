import React, { useState, useEffect } from 'react';
import { Bot, Cpu, Database, Shield, Terminal, Zap } from 'lucide-react';
import { DependencyChat } from '../components/DependencyChat';
import { dependencyData } from '../data/mockData';

export const AIAnalysis: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Dependency Analysis
          </h1>
          <p className="text-gray-400 mt-2">
            Powered by advanced AI to analyze your dependencies and provide actionable insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: Shield,
              title: 'Security Analysis',
              description: 'Identify security vulnerabilities and risks',
            },
            {
              icon: Zap,
              title: 'Performance Impact',
              description: 'Analyze performance implications',
            },
            {
              icon: Database,
              title: 'Dependency Chain',
              description: 'Understand complex dependency relationships',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg bg-gray-800 border border-gray-700 transform transition-all duration-300 hover:scale-105 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-400" />
                Quick Commands
              </h3>
              <div className="space-y-3">
                {[
                  'Analyze security risks',
                  'Check for updates',
                  'Find circular dependencies',
                  'Suggest optimizations',
                  'Review best practices',
                ].map((command, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors text-sm"
                  >
                    {command}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-400" />
                AI Stats
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400">Response Time</div>
                  <div className="text-2xl font-semibold">~2.5s</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Analysis Accuracy</div>
                  <div className="text-2xl font-semibold">98.5%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="p-6 bg-gray-750 border-b border-gray-700 flex items-center gap-3">
                <Bot className="w-6 h-6 text-blue-400" />
                <div>
                  <h2 className="text-xl font-semibold">AI Assistant</h2>
                  <p className="text-sm text-gray-400">Ask anything about your dependencies</p>
                </div>
              </div>
              <DependencyChat
                apiKey={apiKey} 
                dependencyData={dependencyData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};