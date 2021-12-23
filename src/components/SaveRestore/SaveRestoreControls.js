import React, { memo, useCallback, Dispatch, FC } from 'react';
import { useZoomPanHelper, OnLoadParams, Elements, FlowExportObject } from 'react-flow-renderer';
import localforage from 'localforage';
import './SaveRestore.css';

localforage.config({
  name: 'react-flow',
  storeName: 'flows',
});

const flowKey = 'all-in-one-flow';

const getNodeId = () => `randomnode_${+new Date()}`;

const Controls = ({ rfInstance, setElements }) => {
  const { transform } = useZoomPanHelper();

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localforage.setItem(flowKey, flow);
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = await localforage.getItem(flowKey);

      if (flow) {
        const [x = 0, y = 0] = flow.position;
        setElements(flow.elements || []);
        transform({ x, y, zoom: flow.zoom || 0 });
      }
    };

    restoreFlow();
  }, [setElements, transform]);

  return (
    <div className="save__controls">
      <button onClick={onSave}>save</button>
      <button onClick={onRestore}>restore</button>
    </div>
  );
};

export default memo(Controls);