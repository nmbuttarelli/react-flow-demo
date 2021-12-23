import React, { memo } from 'react';

import { Handle, Position } from 'react-flow-renderer';


const HorizontalOutputNode = ({ data }) => {
  return (
    <>
      <Handle type="source" id="sourceright" position={Position.Left} />
      <div>{data['label']}</div>
    </>
  );
};

export default memo(HorizontalOutputNode);