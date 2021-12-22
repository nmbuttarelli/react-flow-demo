import React, { useState } from 'react';

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';

import initialElements from './initial-elements';
import CustomNode from './CustomNode';


const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
};

const OverviewFlow = () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <div style={{ height: 1000 }}>
      <ReactFlow
        elements={elements}
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
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default OverviewFlow;


import React, { useState } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';
import CustomNode from './CustomNode';

const initialElements = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: <div>Node 3</div> }, position: { x: 200, y: 200 } },
 // { id: 'e1-2', source: '1', target: '2', animated: true },
];

export default () => {
  //const onConnect = (params) => setElements((els) => addEdge(params, els));
  /*const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => {
    setElements((els) => addEdge(params, els));
    console.log(params);
  };
  const onConnectStart = (params) => {console.log(params);};
  const onConnectStop = (params) => {console.log(params);};
  const onConnectEnd = (params) => {
    setElements((elements) => addEdge(params, elements));
    console.log(params);
  };*/


  return (
    <div style={{ height: 300 }}>
      <ReactFlow
        //nodeTypes={{ default: CustomNode }}
        elements={initialElements}
        //connectionMode='loose'
        /*onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectStop={onConnectStop}
        onConnectEnd={onConnectEnd} *//>
    </div>
  )
};
//

import React, { useState } from 'react';
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';
/*
const initialElements = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output', // output node
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  // animated edge
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
];*/

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { label: 'Another Node' },
    position: { x: 100, y: 125 },
  },
  {
    id: 'e4-5',
    source: '1',
    target: '2',
    arrowHeadType: 'arrowclosed',
    label: 'edge with arrow head',
  },
];

export default () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <div style={{ height: 300 }}>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        deleteKeyCode={46} /* 'delete'-key */
        connectionMode='loose'
      />
    </div>
  );
};