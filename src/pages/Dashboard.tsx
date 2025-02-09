import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Shield, AlertTriangle, Clock, CloudLightning, CircleSlash2, GitFork } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { RiskBadge } from '../components/RiskBadge';
import { CircularProgressBar } from '../components/CircularProgressBar';
import { dependencyData } from '../data/mockData';

const Dashboard: React.FC = () => {
  const allDependencies = [...dependencyData.cloud, ...dependencyData.application];
  
  const riskDistribution = {
    high: allDependencies.filter(d => d.riskLevel === 'high').length,
    medium: allDependencies.filter(d => d.riskLevel === 'medium').length,
    low: allDependencies.filter(d => d.riskLevel === 'low').length,
  };

  const chartData = [
    { name: 'High', value: riskDistribution.high, color: '#EF4444' },
    { name: 'Medium', value: riskDistribution.medium, color: '#F59E0B' },
    { name: 'Low', value: riskDistribution.low, color: '#10B981' },
  ];

  const categoryDistribution = Object.entries(
    allDependencies.reduce((acc, dep) => {
      acc[dep.category] = (acc[dep.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const uptimeData = dependencyData.cloud
    .filter(dep => dep.uptime)
    .map(dep => ({
      name: dep.name,
      uptime: parseFloat(dep.uptime?.replace('%', '') || '0'),
    }));

  const failurePointsData = Object.entries(
    allDependencies.reduce((acc, dep) => {
      dep.failurePoints.forEach(point => {
        acc[point] = (acc[point] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const typeDistribution = {
    cloud: dependencyData.cloud.length,
    application: dependencyData.application.length,
  };

  // New metrics from the cloud security report
  const securityScore = 87.5; // 100 - average risk score
  const bottlenecks = 4; // From the report
  const circularDeps = 3; // From the report

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dependency Analysis Dashboard</h1>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Security Score">
          <div className="flex items-center justify-between">
            <Shield className="w-8 h-8 text-blue-500" />
            <CircularProgressBar 
              percentage={securityScore} 
              size={80} 
              strokeWidth={8} 
              color={securityScore > 80 ? '#10B981' : securityScore > 60 ? '#F59E0B' : '#EF4444'}
            />
          </div>
        </DashboardCard>

        <DashboardCard title="System Bottlenecks">
          <div className="flex items-center justify-between">
            <CircleSlash2 className="w-8 h-8 text-yellow-500" />
            <div className="text-right">
              <span className="text-3xl font-bold">{bottlenecks}</span>
              <p className="text-sm text-gray-500">Identified Issues</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Circular Dependencies">
          <div className="flex items-center justify-between">
            <GitFork className="w-8 h-8 text-red-500" />
            <div className="text-right">
              <span className="text-3xl font-bold">{circularDeps}</span>
              <p className="text-sm text-gray-500">Critical Chains</p>
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="Risk Distribution" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Service Uptime" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={uptimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis domain={[99, 100]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="uptime" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }}
                name="Uptime %"
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="Top Failure Points" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={failurePointsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Category Distribution" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%">
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar
                name="Dependencies"
                dataKey="value"
                data={categoryDistribution}
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Critical Dependencies">
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {allDependencies
              .filter(dep => dep.riskLevel === 'high')
              .map(dep => (
                <div key={dep.name} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div>
                    <h3 className="font-medium">{dep.name}</h3>
                    <p className="text-sm text-gray-500">{dep.category}</p>
                    <div className="mt-1 text-xs text-gray-400">
                      Last Updated: {dep.lastUpdate || 'N/A'}
                    </div>
                  </div>
                  <div className="text-right">
                    <RiskBadge level={dep.riskLevel} />
                    {dep.uptime && (
                      <div className="mt-2 text-xs text-gray-500">
                        Uptime: {dep.uptime}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Recent Incidents">
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {allDependencies
              .filter(dep => dep.lastIncident)
              .sort((a, b) => new Date(b.lastIncident!).getTime() - new Date(a.lastIncident!).getTime())
              .map(dep => (
                <div key={dep.name} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{dep.name}</h3>
                      <p className="text-sm text-gray-500">{dep.category}</p>
                    </div>
                    <RiskBadge level={dep.riskLevel} />
                  </div>
                  <div className="mt-2 text-sm">
                    <div className="text-gray-500">
                      Last Incident: {new Date(dep.lastIncident!).toLocaleDateString()}
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      Failure Points: {dep.failurePoints.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;

export { Dashboard }