import React, { useState, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  ArrowHeadType,
  Edge,
  addEdge,
  removeElements,
  updateEdge,
  Controls,
} from 'react-flow-renderer';

import ElementsSidebar from './ElementsSidebar';
import FullNode from '../customNodes/FullNode'
import HorizontalNode from '../customNodes/HorizontalNode';

import './dnd.css';

const initialElements = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [selectedEdgeType, setSelectedEdgeType] = useState({ value: 'step', label: 'Step'})
  const [selectedArrowType, setSelectedArrowType] = useState({ value: 'arrowclosed', label: 'Arrow Closed'})

  const handleEdgeTypeChange = (selectedOption) => {
    setSelectedEdgeType(selectedOption);
    console.log(`Option selected:`, selectedOption);
  }

  const handleArrowTypeChange = (selectedOption) => {
    setSelectedArrowType(selectedOption);
    console.log(`Option selected:`, selectedOption);
  }

  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));

  const onConnect = (params) => setElements((els) => {
    const edge = {
      ...params,
      type: selectedEdgeType.value,
      arrowHeadType: selectedArrowType.value
    };
    return addEdge(edge, els);
  });


  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const nodeTypes = {
    full: FullNode,
    horizontal: HorizontalNode
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const label = (event.dataTransfer.getData('label') != '') ? event.dataTransfer.getData('label') : type;
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${label} node` },
    };

    setElements((es) => es.concat(newNode));
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <ElementsSidebar handleEdgeTypeChange={handleEdgeTypeChange} handleArrowTypeChange={handleArrowTypeChange} selectedEdgeType={selectedEdgeType} selectedArrowType={selectedArrowType} />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            nodeTypes={nodeTypes}
            connectionMode='loose'
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onEdgeUpdate={onEdgeUpdate}
          >
            <Controls style={{ right: '50px', bottom: 'auto', left: 'auto' }} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;