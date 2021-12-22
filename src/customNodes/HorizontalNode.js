import React, { memo } from 'react';

import { Handle, Position } from 'react-flow-renderer';


const HorizontalNode = ({ data }) => {
  return (
    <>
      <Handle type="source" id="sourceleft" position={Position.Left} />
      <div>{data['label']}</div>
      <Handle type="source" id="sourceright" position={Position.Right} />
    </>
  );
};

export default memo(HorizontalNode);