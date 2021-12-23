import React, { useState } from 'react';
import ReactFlow, { removeElements, addEdge } from 'react-flow-renderer';

import FullNode from '../customNodes/FullNode'

const nodeTypes = {
  full: FullNode,
}

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'A Node' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { label: 'Another Node' },
    position: { x: 250, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Last node' },
    position: { x: 400, y: 225 },
  },
];

const Flow2 = () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <>
      <div className='head'>
        <h1> Flow 2 </h1><br/>
        <h3>Now can add edges! Select nodes and edges and delete them with backspace!</h3>
      </div>
      <div style={{ height: 500, 'margin-left': 200 }}>
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          deleteKeyCode={46} /* 'delete'-key */
        />
      </div>
    </>
  );
};

export default Flow2;