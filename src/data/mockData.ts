export const dependencyData = {
  cloud: [
    {
      name: 'aws-sdk',
      version: '^3.1.0',
      type: 'cloud',
      category: 'AWS',
      failurePoints: [
        'API Rate Limiting',
        'Network Timeout',
        'Authentication Failure',
        'Region Availability'
      ],
      dependencies: ['aws-lambda', 'aws-s3'],
      riskLevel: 'high',
      uptime: '99.95%',
      lastIncident: '2024-01-15'
    },
    {
      name: 'aws-lambda',
      version: '^2.0.0',
      type: 'cloud',
      category: 'AWS',
      failurePoints: [
        'Cold Start Delays',
        'Memory Limits',
        'Timeout Issues'
      ],
      dependencies: ['aws-sdk'],
      riskLevel: 'medium',
      uptime: '99.9%',
      lastIncident: '2024-01-20'
    },
    {
      name: 'aws-s3',
      version: '^3.0.0',
      type: 'cloud',
      category: 'AWS',
      failurePoints: [
        'Storage Limits',
        'Access Control',
        'Data Transfer Speed'
      ],
      dependencies: ['aws-sdk'],
      riskLevel: 'low',
      uptime: '99.99%',
      lastIncident: '2023-12-15'
    },
    {
      name: 'azure-storage',
      version: '^12.1.0',
      type: 'cloud',
      category: 'Azure',
      failurePoints: [
        'Connection Issues',
        'Quota Limits',
        'Replication Lag'
      ],
      dependencies: ['@azure/identity'],
      riskLevel: 'medium',
      uptime: '99.95%',
      lastIncident: '2024-01-10'
    },
    {
      name: '@azure/identity',
      version: '^3.0.0',
      type: 'cloud',
      category: 'Azure',
      failurePoints: [
        'Token Expiry',
        'Authentication Failure',
        'Rate Limiting'
      ],
      dependencies: [],
      riskLevel: 'low',
      uptime: '99.98%',
      lastIncident: '2023-12-20'
    }
  ],
  application: [
    {
      name: 'react',
      version: '^18.2.0',
      type: 'application',
      category: 'Frontend',
      failurePoints: [
        'Memory Leak',
        'Render Performance',
        'State Management Issues'
      ],
      dependencies: ['react-dom'],
      riskLevel: 'low',
      usage: 'Critical',
      lastUpdate: '2024-01-10'
    },
    {
      name: 'react-dom',
      version: '^18.2.0',
      type: 'application',
      category: 'Frontend',
      failurePoints: [
        'DOM Updates',
        'Event Handling',
        'Browser Compatibility'
      ],
      dependencies: [],
      riskLevel: 'low',
      usage: 'Critical',
      lastUpdate: '2024-01-10'
    },
    {
      name: 'express',
      version: '^4.18.2',
      type: 'application',
      category: 'Backend',
      failurePoints: [
        'Request Handling',
        'Memory Usage',
        'Connection Pool'
      ],
      dependencies: ['body-parser', 'cors'],
      riskLevel: 'medium',
      usage: 'High',
      lastUpdate: '2024-01-15'
    },
    {
      name: 'body-parser',
      version: '^1.20.0',
      type: 'application',
      category: 'Backend',
      failurePoints: [
        'Payload Size',
        'Parser Errors',
        'Memory Usage'
      ],
      dependencies: [],
      riskLevel: 'low',
      usage: 'Medium',
      lastUpdate: '2023-12-20'
    },
    {
      name: 'cors',
      version: '^2.8.5',
      type: 'application',
      category: 'Backend',
      failurePoints: [
        'Configuration',
        'Security Headers',
        'Origin Validation'
      ],
      dependencies: [],
      riskLevel: 'medium',
      usage: 'Medium',
      lastUpdate: '2023-12-20'
    },
    {
      name: 'mongoose',
      version: '^7.5.0',
      type: 'application',
      category: 'Database',
      failurePoints: [
        'Connection Issues',
        'Query Performance',
        'Schema Validation'
      ],
      dependencies: [],
      riskLevel: 'high',
      usage: 'High',
      lastUpdate: '2024-01-05'
    },
    {
      name: 'redux',
      version: '^4.2.0',
      type: 'application',
      category: 'State Management',
      failurePoints: [
        'State Updates',
        'Action Handling',
        'Store Performance'
      ],
      dependencies: ['react-redux'],
      riskLevel: 'low',
      usage: 'High',
      lastUpdate: '2024-01-01'
    },
    {
      name: 'react-redux',
      version: '^8.0.5',
      type: 'application',
      category: 'State Management',
      failurePoints: [
        'Component Updates',
        'Selector Performance',
        'Store Connection'
      ],
      dependencies: ['redux'],
      riskLevel: 'low',
      usage: 'High',
      lastUpdate: '2024-01-01'
    }
  ]
} as const;