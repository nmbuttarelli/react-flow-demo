import React, { useState, memo } from 'react';

import { Handle, Position } from 'react-flow-renderer';

const FullNode = ({ data }) => {
  const [nameToggle, setNameToggle] = useState(true)
  const [label, setLabel] = useState(data.label)
  const closeInput = (event) => {
    setNameToggle(true)
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div onDoubleClick={() => { setNameToggle(false) }}>
      { nameToggle ? (
                  <div> {label} </div>
                ) : (
                  <input
                    className='react-flow__node-horizontal-label-input'
                    autoFocus
                    type='text'
                    value={label}
                    onFocus={(event) => {
                      event.target.setSelectionRange(0, event.target.value.length)
                    }}
                    onChange={(event) => {
                      console.log(event)
                      setLabel(event.target.value)
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === 'Escape') {
                        closeInput(event)
                      }
                    }}
                    onBlur={(event) => {
                      closeInput(event)
                    }}
                    />
      )}
      <Handle type="source" id="sourceleft" position={Position.Left} />
      <Handle type="source" id="sourceright" position={Position.Right} />
      <Handle type="source" id="sourcetop" position={Position.Top} />
      <Handle type="source" id="sourcebottom" position={Position.Bottom} />
    </div>
  );
};

export default memo(FullNode);