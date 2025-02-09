import React from 'react';

interface RiskBadgeProps {
  level: 'low' | 'medium' | 'high';
}

const riskColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level }) => {
  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${riskColors[level]}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)} Risk
    </span>
  );
};