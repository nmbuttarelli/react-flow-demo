import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  updateEdge,
  addEdge,
  removeElements,
  Controls
} from 'react-flow-renderer';
import PanelMenu from "../components/ContextMenu/PanelMenu";
import NodeMenu from "../components/ContextMenu/NodeMenu";
import FullNode from '../customNodes/FullNode'
import HorizontalNode from '../customNodes/HorizontalNode';
import HorizontalInputNode from '../customNodes/HorizontalInputNode';
import HorizontalOutputNode from '../customNodes/HorizontalOutputNode';
import SaveRestoreControls from '../components/SaveRestore/SaveRestoreControls';
import './App.css';

const initialElements = [];

let id = 0;
const getId = () => `vsm_node_${id++}`;

const VSMPlayground = () => {
  // Shared States
  const [elements, setElements] = useState(initialElements);
  const [selectedNode, setSelectedNode] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Edge States
  const [selectedEdgeType, setSelectedEdgeType] = useState({ value: 'step', label: 'Step' })
  const [selectedArrowType, setSelectedArrowType] = useState({ value: 'arrowclosed', label: 'Arrow Closed' })
  const [animateArrow, setAnimeteArrowChecked] = React.useState(false);
  const [arrowLabel, setArrowLabel] = useState('');
  const [nodeName, setNodeName] = useState('');
  const [currentEdge, setCurrentEdge] = useState();
  const [edgeUpdatedLabel, setEdgeUpdatedLabel] = useState('');

  // Context states
  const [mouseEnterNodeContextMenu, setMouseEnterNodeContextMenu] = useState(false);
  const [showNodeContextMenu, setShowNodeContextMenu] = useState(false);
  const [showPanelContextMenu, setShowPanelContextMenu] = useState(false);
  const [contextMenuCurrentNode, setContextMenuCurrentNode] = useState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const nodeTypes = {
    full: FullNode,
    horizontal: HorizontalNode,
    'horizontal-input': HorizontalInputNode,
    'horizontal-output': HorizontalOutputNode
  };

  const onLoad = (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

    /* TODO[NMB]: Make this a Context Panel functionality */
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
  /* ----------- END ------------ */

  // Edge Conections events handlers
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

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  // Context events handlers
  const onEdgeContextMenu = (_, edge) => console.log('edge context menu', edge);

  const handleMouseEnterToContextMenu = useCallback(() => {
    setMouseEnterNodeContextMenu(true)
  }, [mouseEnterNodeContextMenu, showNodeContextMenu]);

  const handleMouseLeaveToContextMenu = useCallback(() => {
    if (mouseEnterNodeContextMenu) {
      return showNodeContextMenu ? setShowNodeContextMenu(false) : null
    } else {
      return null
    }
  }, [mouseEnterNodeContextMenu, showNodeContextMenu]);

  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    setSelectedNode(node)
    setShowNodeContextMenu(true)
    setAnchorPoint({ x: event.pageX-1, y: event.pageY-8})
    setContextMenuCurrentNode(node)
  }

  const onPaneContextMenu = (event) => {
    event.preventDefault();
    setAnchorPoint({ x: event.pageX-1, y: event.pageY-8})
    setShowPanelContextMenu(true)
  }

  useEffect(() => {
      if (document.querySelectorAll("[class=node-menu]").length > 0) {
        document.querySelectorAll("[class=node-menu]")[0].addEventListener("mouseenter", handleMouseEnterToContextMenu);
        document.querySelectorAll("[class=node-menu]")[0].addEventListener("mouseleave", handleMouseLeaveToContextMenu);
      }
      return () => {
        if (document.querySelectorAll("[class=node-menu]").length > 0) {
          document.querySelectorAll("[class=node-menu]")[0].removeEventListener("mouseenter", handleMouseEnterToContextMenu);
          document.querySelectorAll("[class=node-menu]")[0].removeEventListener("mouseleave", handleMouseLeaveToContextMenu);
        }
      };
  });

  // Edge handlers
  const onEdgeLabelInputBlur = (event) => updateEdgeLabelAndClearInput(event.target)

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === currentEdge.id) {
          el.label = edgeUpdatedLabel;
        }
        return el;
      })
    );
  }, [edgeUpdatedLabel, setElements]);

  const addEdgeLabelInputEvents = (input) => {
    input.addEventListener('keypress', onEdgeLabelInputKeyPress)
    input.addEventListener('blur', onEdgeLabelInputBlur)
  }

  const removeEdgeLabelInputEvents = (input) => {
    input.removeEventListener('keypress', onEdgeLabelInputKeyPress)
    input.removeEventListener('blur', onEdgeLabelInputBlur)
  }

  const onEdgeLabelInputKeyPress = (event) => {
    if(event.key === 'Enter') {
      updateEdgeLabelAndClearInput(event.target)
    }
  }

  const updateEdgeLabelAndClearInput = (input) => {
    setEdgeUpdatedLabel(input.value)
    input.value = ''
    input.style.setProperty('display','none')
    setCurrentEdge(null)
    removeEdgeLabelInputEvents(input)
  }

  const onEdgeDoubleClick = (event, edge) => {
    setCurrentEdge(edge)
    var input = document.getElementById("edgeLabelInput")
    input.style.setProperty('display','block')
    input.style.setProperty('top', event.pageY + "px")
    input.style.setProperty('left', event.pageX + "px")
    addEdgeLabelInputEvents(input)
    input.focus()
  }

  // Node Handlers
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
      data: { label: `${label} node`, nodeName: nodeName, setNodeName: setNodeName },
    };

    setElements((es) => es.concat(newNode))
    setShowPanelContextMenu(false)
  };

  return (
    <>
      <div className='head'>
        <h1>VSM Flow Playground</h1><br />
      </div>
      <div className="dndflow vsm-playgroung-wrapper">
        <input type="text" style={{display:'none', zIndex:'6', paddingLeft:'5px', position: 'absolute'}} id="edgeLabelInput" />
        <PanelMenu
          show={showPanelContextMenu}
          setShow={setShowPanelContextMenu}
          anchorPoint={anchorPoint}
          setElements={setElements}
          getId={getId}
          nodeName={nodeName}
          setNodeName={setNodeName}
          reactFlowWrapper={reactFlowWrapper}
          reactFlowInstance={reactFlowInstance}
        />
        <NodeMenu
          show={showNodeContextMenu}
          setShow={setShowNodeContextMenu}
          anchorPoint={anchorPoint}
          node={contextMenuCurrentNode}
          setElements={setElements}
          handleDelete={onElementsRemove}
        />
        <ReactFlowProvider>
          <div className="reactflow-wrapper vsm-playground" ref={reactFlowWrapper}>
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
              onEdgeDoubleClick={onEdgeDoubleClick}
              onPaneContextMenu={onPaneContextMenu}
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

export default VSMPlayground;