import React, { memo } from 'react';

import { Handle, Position } from 'react-flow-renderer';


const HorizontalInputNode = ({ data }) => {
  return (
    <>
      <div>{data['label']}</div>
      <Handle type="source" id="sourceright" position={Position.Right} />
    </>
  );
};

export default memo(HorizontalInputNode);