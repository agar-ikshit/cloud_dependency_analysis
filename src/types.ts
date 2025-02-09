export interface DependencyNode {
  name: string;
  version: string;
  type: 'cloud' | 'application';
  category: string;
  failurePoints: string[];
  dependencies: string[];
  riskLevel: 'low' | 'medium' | 'high';
  uptime?: string;
  lastIncident?: string;
  usage?: string;
  lastUpdate?: string;
}

export interface DependencyData {
  cloud: DependencyNode[];
  application: DependencyNode[];
}