import { FaTrash } from "react-icons/fa";
import './ContextMenu.css';

const PanelMenu = ({show, setShow, anchorPoint, elements, setElements, getId, nodeName, setNodeName, reactFlowWrapper, reactFlowInstance }) => {

  const clearAllElements = () => { setElements([]) }
  const addNode = (event, nodeType) => {
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
    const label = 'Node type: ' + nodeType;
    const position = reactFlowInstance.project({
      x: anchorPoint.x - reactFlowBounds.left,
      y: anchorPoint.y - reactFlowBounds.top,
    });

    const newNode = {
      id: getId(),
      type: nodeType,
      position,
      data: { label: label, nodeName: nodeName, setNodeName: setNodeName },
    };

    setElements((es) => es.concat(newNode));

    setShow(false)
  }

  const onDragStart = (event, nodeType, label = '') => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData("label", label);
    event.dataTransfer.effectAllowed = 'move';
  };

  if (show) {
    return (
      <ul className="panel-menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
        <li>
          <div
            className="react-flow__node-full"
            onClick={(event) => addNode(event, 'full')}
            onDragStart={(event) => onDragStart(event, 'full')}
            draggable>
            Full
          </div>
        </li>
        <li>
          <div
            className="react-flow__node-input"
            onClick={(event) => addNode(event, 'input')}
            onDragStart={(event) => onDragStart(event, 'input')}
            draggable>
            Input
          </div>
        </li>
        <li>
          <div
            className="react-flow__node-output"
            onClick={(event) => addNode(event, 'output')}
            onDragStart={(event) => onDragStart(event, 'output')}
            draggable>
            Output
          </div>
        </li>
        <li>
          <div
            className="react-flow__node-default"
            onClick={(event) => addNode(event, 'default', 'vertical')}
            onDragStart={(event) => onDragStart(event, 'default', 'vertical')}
            draggable>
            Vertical
          </div>
        </li>
        <li>
          <div
            className="react-flow__node-horizontal"
            onClick={(event) => addNode(event, 'horizontal')}
            onDragStart={(event) => onDragStart(event, 'horizontal')}
            draggable>
            Horizontal
          </div>
        </li>
        <li>
          <div
            className="react-flow__node-horizontal-input"
            onClick={(event) => addNode(event, 'horizontal-input')}
            onDragStart={(event) => onDragStart(event, 'horizontal-input')}
            draggable>
            Horizontal Input
          </div>
        </li>
        <li>
          <div
            className="react-flow__node-horizontal-output"
            onClick={(event) => addNode(event, 'horizontal-output')}
            onDragStart={(event) => onDragStart(event, 'horizontal-output')}
            draggable>
            Horizontal Output
          </div>
        </li>
        <li onClick={clearAllElements} >
          <div className="react-flow__node-horizontal-clear-panel" onClick={(event) => addNode(event, 'horizontal-output')} draggable>
            Clear Panel &nbsp; <FaTrash className='delete-icon' />
          </div>
        </li>
      </ul>
    );
  }
  return <></>;
};

export default PanelMenu;