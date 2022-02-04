import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Edge,
  addEdge,
  removeElements,
  updateEdge,
  Controls
} from 'react-flow-renderer';
import './App.css';
import ElementsSidebar from '../components/ElementsSidebar';
import FullNode from '../customNodes/FullNode'
import HorizontalNode from '../customNodes/HorizontalNode';
import HorizontalInputNode from '../customNodes/HorizontalInputNode';
import HorizontalOutputNode from '../customNodes/HorizontalOutputNode';
import SaveRestoreControls from '../components/SaveRestore/SaveRestoreControls';
import NodeMenu from "../components/ContextMenu/NodeMenu";

const initialElements = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [selectedEdgeType, setSelectedEdgeType] = useState({ value: 'step', label: 'Step' })
  const [selectedArrowType, setSelectedArrowType] = useState({ value: 'arrowclosed', label: 'Arrow Closed' })
  const [animateArrow, setAnimeteArrowChecked] = React.useState(false);
  const [arrowLabel, setArrowLabel] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeName, setNodeName] = useState('');
  const [nodeBg, setNodeBg] = useState('#eee');

  const handleArrowLabelChange = (e) => {
    setArrowLabel(e.target.value)
  }

  const handleAnimateArrowCheckboxChange = () => {
    setAnimeteArrowChecked(!animateArrow);
  }

  const handleEdgeTypeChange = (selectedOption) => {
    setSelectedEdgeType(selectedOption);
  }

  const handleArrowTypeChange = (selectedOption) => {
    setSelectedArrowType(selectedOption);
  }

  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));

  const onConnect = (params) => setElements((els) => {
    const edge = {
      ...params,
      type: selectedEdgeType.value,
      arrowHeadType: selectedArrowType.value,
      animated: animateArrow,
      label: arrowLabel
    };

    return addEdge(edge, els);
  });

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const nodeTypes = {
    full: FullNode,
    horizontal: HorizontalNode,
    'horizontal-input': HorizontalInputNode,
    'horizontal-output': HorizontalOutputNode
  };

  const [showNodeContextMenu, setShowNodeContextMenu] = useState(false);
  const [isContextSubmenuOpen, setIsContextSubmenuOpen] = useState(false);
  const [contextMenuCurrentNode, setContextMenuCurrentNode] = useState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const handleClickOutsideContextMenu = useCallback(() => {
    const keepContextMenuOnScreen = showNodeContextMenu && isContextSubmenuOpen
    (keepContextMenuOnScreen ? setShowNodeContextMenu(false) : null)
  }, [showNodeContextMenu]);

  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    console.log('node context menu', node)
    setShowNodeContextMenu(true)
    setAnchorPoint({ x: event.pageX, y: event.pageY })
    setContextMenuCurrentNode(node)
  }
  useEffect(() => {
    //document.addEventListener("click", handleClickOutsideContextMenu);
    return () => {
      //document.removeEventListener("click", handleClickOutsideContextMenu);
    };
  });


  const onEdgeContextMenu = (_, edge) => console.log('edge context menu', edge);

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const label = (event.dataTransfer.getData('label') !== '') ? event.dataTransfer.getData('label') : type;
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${label} node`, nodeName: nodeName, setNodeName: setNodeName},
    };

    setElements((es) => es.concat(newNode));
  };

  /*useEffect(() => {
    setElements((els) => els.map((el) => {
      if (el.id === selectedNode.id) {
        el.data = { ...el.data, label: nodeName };
      }
      return el;
    })); // eslint-disable-next-line
  }, [nodeName, setElements]);*/

  /*useEffect(() => {
    setElements((els) => els.map((el) => {
      if (el.id === selectedNode.id) {
        el.style = { ...el.style, backgroundColor: nodeBg };
      }
      return el;
    })); // eslint-disable-next-line
  }, [nodeBg, setElements]);*/

  return (
    <>
      <div className='head'>
        <h1>Empty Editable Flow</h1><br />
        <h3>More Node Types and with functional panels</h3>
      </div>
      <div className="dndflow">
        <NodeMenu
          show={showNodeContextMenu}
          anchorPoint={anchorPoint}
          node={contextMenuCurrentNode}
          setElements={setElements}
        />
        <ReactFlowProvider>
          <ElementsSidebar
            handleEdgeTypeChange={handleEdgeTypeChange}
            handleArrowTypeChange={handleArrowTypeChange}
            selectedEdgeType={selectedEdgeType}
            selectedArrowType={selectedArrowType}
            handleAnimateArrowCheckboxChange={handleAnimateArrowCheckboxChange}
            animateArrow={animateArrow}
            handleArrowLabelChange={handleArrowLabelChange}
            nodeName={nodeName} setNodeName={setNodeName}
            nodeBg={nodeBg} setNodeBg={setNodeBg}
          />
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
              onSelectionChange={(selectedElements) => {
                const node = selectedElements ? selectedElements[0] : null
                if (node && node.data && node.data.label)
                  setNodeName(node.data.label)
                setSelectedNode(node)
              }}
              onNodeContextMenu={onNodeContextMenu}
              onEdgeContextMenu={onEdgeContextMenu}
            >
              <Controls style={{ right: '10px', bottom: 'auto', left: 'auto' }} />
              <SaveRestoreControls rfInstance={reactFlowInstance} setElements={setElements} />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default DnDFlow;