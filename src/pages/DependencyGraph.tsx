import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  NodeProps,
  Handle,
  Position,
  Panel,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { RiskBadge } from '../components/RiskBadge';
import { Lock, Unlock, ZoomIn, ZoomOut } from 'lucide-react';

const dependencyData = {
  cloud: [
    {
      name: 'aws-sdk',
      version: '^3.1.0',
      type: 'cloud',
      category: 'AWS',
      dependencies: ['aws-lambda', 'aws-s3'],
      riskLevel: 'high',
    },
    {
      name: 'aws-lambda',
      version: '^2.0.0',
      type: 'cloud',
      category: 'AWS',
      dependencies: ['aws-sdk'],
      riskLevel: 'medium',
    },
    {
      name: 'aws-s3',
      version: '^3.0.0',
      type: 'cloud',
      category: 'AWS',
      dependencies: ['aws-sdk'],
      riskLevel: 'low',
    },
    {
      name: 'azure-storage',
      version: '^12.1.0',
      type: 'cloud',
      category: 'Azure',
      dependencies: ['@azure/identity'],
      riskLevel: 'medium',
    },
    {
      name: '@azure/identity',
      version: '^3.0.0',
      type: 'cloud',
      category: 'Azure',
      dependencies: [],
      riskLevel: 'high',
    },
  ],
  application: [
    {
      name: 'react',
      version: '^18.2.0',
      type: 'application',
      category: 'Frontend',
      dependencies: ['react-dom'],
      riskLevel: 'low',
    },
    {
      name: 'react-dom',
      version: '^18.2.0',
      type: 'application',
      category: 'Frontend',
      dependencies: [],
      riskLevel: 'low',
    },
    {
      name: 'express',
      version: '^4.18.2',
      type: 'application',
      category: 'Backend',
      dependencies: ['body-parser', 'cors'],
      riskLevel: 'medium',
    },
    {
      name: 'body-parser',
      version: '^1.20.0',
      type: 'application',
      category: 'Backend',
      dependencies: [],
      riskLevel: 'low',
    },
    {
      name: 'cors',
      version: '^2.8.5',
      type: 'application',
      category: 'Backend',
      dependencies: [],
      riskLevel: 'medium',
    },
    {
      name: 'mongoose',
      version: '^7.5.0',
      type: 'application',
      category: 'Database',
      dependencies: [],
      riskLevel: 'high',
    },
    {
      name: 'redux',
      version: '^4.2.0',
      type: 'application',
      category: 'State Management',
      dependencies: ['react-redux'],
      riskLevel: 'medium',
    },
    {
      name: 'react-redux',
      version: '^8.0.5',
      type: 'application',
      category: 'State Management',
      dependencies: ['redux'],
      riskLevel: 'medium',
    },
  ],
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'high': return '#EF4444';
    case 'medium': return '#F59E0B';
    case 'low': return '#10B981';
    default: return '#6B7280';
  }
};

const CustomNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div 
      className="px-4 py-2 shadow-md rounded-md bg-white border-2 transition-transform hover:scale-105" 
      style={{ borderColor: data.borderColor }}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-16 !bg-gray-300" 
      />
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="ml-2">
            <div className="text-lg font-bold">{data.label}</div>
            <div className="text-gray-500">{data.category}</div>
            <div className="text-xs text-gray-400">{data.version}</div>
          </div>
        </div>
        <div className="mt-2">
          <RiskBadge level={data.riskLevel} />
        </div>
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-16 !bg-gray-300" 
      />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export const DependencyGraph: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    const positionMap: Record<string, { x: number; y: number }> = {};
    let yOffset = 0;

    const addNodesAndEdges = (dependencies: any[], yOffset: number) => {
      dependencies.forEach((dep, index) => {
        const xPos = index * 250;
        positionMap[dep.name] = { x: xPos, y: yOffset };

        newNodes.push({
          id: dep.name,
          type: 'custom',
          position: { x: xPos, y: yOffset },
          draggable: !isLocked,
          data: {
            label: dep.name,
            category: dep.category,
            riskLevel: dep.riskLevel,
            version: dep.version,
            borderColor: getRiskColor(dep.riskLevel),
          },
        });

        dep.dependencies.forEach((childDep: string) => {
          newEdges.push({
            id: `${dep.name}-${childDep}`,
            source: dep.name,
            target: childDep,
            type: 'default',
            animated: true,
            style: { stroke: '#64748b', strokeWidth: 2 },
          });
        });
      });
    };

    addNodesAndEdges(dependencyData.cloud, yOffset);
    addNodesAndEdges(dependencyData.application, yOffset + 300);

    setNodes(newNodes);
    setEdges(newEdges);
  }, [isLocked, setNodes, setEdges]);

  const toggleLock = useCallback(() => {
    setIsLocked(!isLocked);
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        draggable: isLocked,
      }))
    );
  }, [isLocked, setNodes]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    const dep = [...dependencyData.cloud, ...dependencyData.application].find(
      (d) => d.name === node.id
    );
    if (dep) {
      alert(JSON.stringify(dep, null, 2));
    }
  }, []);

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        connectionMode={ConnectionMode.Loose}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            return (node.data?.borderColor || '#eee');
          }}
        />
        <Panel position="top-left" className="bg-white p-2 rounded-lg shadow-lg">
          <button
            onClick={toggleLock}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            {isLocked ? (
              <>
                <Lock className="w-4 h-4" />
                <span>Unlock Nodes</span>
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4" />
                <span>Lock Nodes</span>
              </>
            )}
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};