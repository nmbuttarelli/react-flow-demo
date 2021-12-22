import React, { useState, DragEvent } from 'react';
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

const onDragStart = (event: DragEvent, nodeType: string, label:string = '') => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.setData("label", label);
  event.dataTransfer.effectAllowed = 'move';
};

const ElementsSidebar = ({handleEdgeTypeChange, handleArrowTypeChange, selectedEdgeType, selectedArrowType}) => {
  return (
    <aside>
      <div className="description">Add nodes by Drag Drop</div>
      <div className="react-flow__node-input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="react-flow__node-output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
      <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'default', 'vertical')} draggable>
        Vertical Node
      </div>
      <div className="react-flow__node-horizontal" onDragStart={(event) => onDragStart(event, 'horizontal')} draggable>
        Horizontal Node
      </div>
      <div className="react-flow__node-full" onDragStart={(event) => onDragStart(event, 'full')} draggable>
        Full Node
      </div>

      <div className="description">Select Edge Type.</div>
      <Select options={edgeTypes} onChange={handleEdgeTypeChange} value={selectedEdgeType} />

      <div className="description">Select Arrow Type.</div>
      <Select options={arrowTypes} onChange={handleArrowTypeChange} value={selectedArrowType}/>

      <div className="description">Other funcs you can use:
        <ul style={{listStyle: 'square inside'}}>
          <li>Move existing edges to other nodes</li>
          <li>Delete Node or Edge: select & backspace</li>
        </ul>
      </div>
    </aside>
  );
};

export default ElementsSidebar;