import { DependencyNode } from '../types';

export const findCircularDependencies = (dependencies: DependencyNode[]): string[][] => {
  const graph = new Map<string, string[]>();
  dependencies.forEach(dep => {
    graph.set(dep.name, dep.dependencies);
  });

  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const circularDeps: string[][] = [];

  const dfs = (node: string, path: string[] = []): void => {
    if (recursionStack.has(node)) {
      const cycleStart = path.indexOf(node);
      circularDeps.push(path.slice(cycleStart));
      return;
    }
    if (visited.has(node)) return;

    visited.add(node);
    recursionStack.add(node);
    path.push(node);

    const neighbors = graph.get(node) || [];
    neighbors.forEach(neighbor => {
      dfs(neighbor, [...path]);
    });

    recursionStack.delete(node);
  };

  [...graph.keys()].forEach(node => {
    if (!visited.has(node)) {
      dfs(node);
    }
  });

  return circularDeps;
};

export const calculateSecurityScore = (dependencies: DependencyNode[]): number => {
  const factors = {
    riskLevel: { high: -30, medium: -15, low: 0 },
    uptime: (value: string) => parseFloat(value.replace('%', '')) - 95, // Normalize to -5 to +5
    lastIncident: (date: string) => {
      const days = (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);
      return Math.min(days / 30, 10); // Max 10 points for 30+ days without incident
    }
  };

  let totalScore = 100; // Start with perfect score
  let applicableFactors = 0;

  dependencies.forEach(dep => {
    // Risk Level Impact
    totalScore += factors.riskLevel[dep.riskLevel];
    applicableFactors++;

    // Uptime Impact (if available)
    if (dep.uptime) {
      totalScore += factors.uptime(dep.uptime);
      applicableFactors++;
    }

    // Last Incident Impact (if available)
    if (dep.lastIncident) {
      totalScore += factors.lastIncident(dep.lastIncident);
      applicableFactors++;
    }
  });

  // Normalize score between 0 and 100
  return Math.max(0, Math.min(100, totalScore / applicableFactors));
};

export const calculatePerformanceMetrics = (dependencies: DependencyNode[]) => {
  const uptimeAvg = dependencies
    .filter(dep => dep.uptime)
    .reduce((acc, dep) => acc + parseFloat(dep.uptime?.replace('%', '') || '0'), 0) / 
    dependencies.filter(dep => dep.uptime).length;

  const failurePointsFrequency = dependencies.reduce((acc, dep) => {
    dep.failurePoints.forEach(point => {
      acc[point] = (acc[point] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return {
    uptimeAvg,
    failurePointsFrequency,
    totalDependencies: dependencies.length,
    criticalDependencies: dependencies.filter(dep => dep.riskLevel === 'high').length,
  };
};