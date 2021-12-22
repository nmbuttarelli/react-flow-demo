import React, { memo } from 'react';

import { Handle, Position } from 'react-flow-renderer';

const nodeStyles = { padding: '10px 15px', border: '1px solid #ddd' };

const FullNode = ({ data }) => {
  return (
    <>
      {data['label']}
      <Handle type="source" id="sourceleft" position={Position.Left} />
      <Handle type="source" id="sourceright" position={Position.Right} />
      <Handle type="source" id="sourcetop" position={Position.Top} />
      <Handle type="source" id="sourcebottom" position={Position.Bottom} />
    </>
  );
};

export default memo(FullNode);