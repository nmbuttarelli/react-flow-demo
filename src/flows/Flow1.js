import React from 'react';
import ReactFlow from 'react-flow-renderer';

const elements = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: <>Initial Step<br />Only sends</> },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div style={{ color: 'blue' }}>Second Step</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output', // output node
    data: { label: <>Last Node<br />Only receives</> },
    position: { x: 250, y: 250 },
  },
  {
    id: '4',
    type: 'default', // output node
    data: { label: <>Isolated Node</> },
    position: { x: 450, y: 250 },
  },
  // animated edge
  { id: 'e1-2', source: '1', target: '2', animated: true, arrowHeadType: 'arrowclosed' },
  { id: 'e1-3', source: '1', target: '3', arrowHeadType: 'arrowclosed' },
  { id: 'e2-3', source: '2', target: '3', arrowHeadType: 'arrow' },
];

const Flow1 = () => (
  <>
    <div className='head'>
      <h1>Simple Flow - No functions</h1><br />
      <h3>Simple and fixed Flow!</h3>
    </div>
    <div style={{ height: 500, 'margin-left': 200 }}>
      <ReactFlow elements={elements} />
    </div>
  </>
);

export default Flow1;