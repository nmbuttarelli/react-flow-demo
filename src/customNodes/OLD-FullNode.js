import React, { memo } from 'react';

import { Handle, Position } from 'react-flow-renderer';

const nodeStyles = { padding: '10px 15px', border: '1px solid #ddd' };

const targetHandleStyle = { background: '#555' };
const verticalSourceHandleStyle = { ...targetHandleStyle, top: 10 };
const verticalTargetHandleStyle = { ...targetHandleStyle, bottom: 10, top: 'auto', borderRadius: 0 };
const horizontalSourceHandleStyle = { ...targetHandleStyle, left: 50 };
const horizontalTargetHandleStyle = { ...targetHandleStyle, left: 120, borderRadius: 0 };

const FullNode = ({ id }) => {
  return (
    <div>
      <Handle type="target" id="targetleft" position={Position.Left} style = { verticalTargetHandleStyle } />
      <Handle type="source" id="sourceleft" position={Position.Left} style = { verticalSourceHandleStyle } />

      <Handle type="target" id="targetright" position={Position.Right} style = { verticalTargetHandleStyle } />
      <Handle type="source" id="sourceright" position={Position.Right} style = { verticalSourceHandleStyle } />

      <Handle type="target" id="targettop" position={Position.Top} style = { horizontalTargetHandleStyle } />
      <Handle type="source" id="sourcetop" position={Position.Top} style = { horizontalSourceHandleStyle } />

      <Handle type="target" id="targetbottom" position={Position.Bottom} style = { horizontalTargetHandleStyle } />
      <Handle type="source" id="sourcebottom" position={Position.Bottom} style = { horizontalSourceHandleStyle } />
    </div>
  );
};

export default memo(FullNode);