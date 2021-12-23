import React from 'react';
import Select from 'react-select'

const arrowTypes = [
  { value: '', label: 'None' },
  { value: 'arrow', label: 'Arrow' },
  { value: 'arrowclosed', label: 'Arrow Closed' },
]

const edgeTypes = [
  { value: 'default', label: 'Bezier' },
  { value: 'straight', label: 'Straight' },
  { value: 'step', label: 'Step' },
  { value: 'smoothstep', label: 'Smooth Step' }
]

const onDragStart = (event, nodeType, label = '') => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.setData("label", label);
  event.dataTransfer.effectAllowed = 'move';
};

const ElementsSidebar = ({
  handleEdgeTypeChange,
  handleArrowTypeChange,
  selectedEdgeType,
  selectedArrowType,
  handleAnimateArrowCheckboxChange,
  animateArrow,
  handleArrowLabelChange,
  nodeName, setNodeName,
  nodeBg, setNodeBg
}) => {
  return (
    <aside>
      <div className="description"> <b>NODE OPTIONS</b> </div>
      <div className="description">Add nodes by Drag Drop</div>
      <div className="react-flow__node-full" onDragStart={(event) => onDragStart(event, 'full')} draggable>
        Full
      </div>
      <div className="react-flow__node-input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input
      </div>
      <div className="react-flow__node-output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output
      </div>
      <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'default', 'vertical')} draggable>
        Vertical
      </div>
      <div className="react-flow__node-horizontal" onDragStart={(event) => onDragStart(event, 'horizontal')} draggable>
        Horizontal
      </div>
      <div className="react-flow__node-horizontal-input" onDragStart={(event) => onDragStart(event, 'horizontal-input')} draggable>
        Horizontal Input
      </div>
      <div className="react-flow__node-horizontal-output" onDragStart={(event) => onDragStart(event, 'horizontal-output')} draggable>
        Horizontal Output
      </div>

      <div className="description">Node Label:</div>
      <input value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />
      <div className="description">Node Background:</div>
      <input value={nodeBg} onChange={(evt) => setNodeBg(evt.target.value)} />
      <br /><br />
      <div className="description"> <b>EDGE OPTIONS</b> </div>
      <div className="description">Select Edge Type.</div>
      <Select options={edgeTypes} onChange={handleEdgeTypeChange} value={selectedEdgeType} />
      <div className="description">Select Arrow Type.</div>
      <Select options={arrowTypes} onChange={handleArrowTypeChange} value={selectedArrowType} />
      <div className="description"><input checked={animateArrow} type="checkbox" onChange={handleAnimateArrowCheckboxChange} /> <label htmlFor="Animate Arrow">Animate Arrow</label></div>
      <div className="description">
        <label htmlFor="Animate Arrow">Set Arrow Label as:</label>
        <input type="textbox" onChange={handleArrowLabelChange} />
      </div>
      <br />
      <div className="description"><b>ADDITIONAL FUNCS:</b></div>
      <ul style={{ listStyle: 'square inside' }}>
        <li>Move existing edges to other nodes</li>
        <li>Delete Node or Edge: select & backspace</li>
        <li>Save and restore a Flow State</li>
      </ul>
      <br />
      <br />
      <br />
      <br />
    </aside>
  );
};

export default ElementsSidebar;