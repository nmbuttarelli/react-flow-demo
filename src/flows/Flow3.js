import React, { useState } from 'react';

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';

import initialElements from './initial-elements-flow3';
import FullNode from '../customNodes/FullNode'

const nodeTypes = {
  full: FullNode,
}

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const OverviewFlow = () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <>
      <div className='head'>
        <h1>Flow with full-connected node</h1><br />
        <h3>Same than Flow 2 but with Custom Multidirectional Node!</h3>
        <h3>Flow Controls Provided by React Flow added at the corner</h3>
      </div>
      <div style={{ height: 600, 'margin-left': 200 }}>
        <ReactFlow
          elements={elements}
          nodeTypes={nodeTypes}
          connectionMode='loose'
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          onLoad={onLoad}
          snapToGrid={true}
          snapGrid={[15, 15]}
        >
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.style?.background) return n.style.background;
              if (n.type === 'input') return '#0041d0';
              if (n.type === 'output') return '#ff0072';
              if (n.type === 'default') return '#1a192b';

              return '#eee';
            }}
            nodeColor={(n) => {
              if (n.style?.background) return n.style.background;

              return '#fff';
            }}
            nodeBorderRadius={2}
          />
          <Controls />
          <Background color="#1aa" gap={16} />
        </ReactFlow>
      </div>
    </>
  );
};

export default OverviewFlow;
