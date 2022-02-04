import { useState, useEffect } from 'react';
import { removeElements } from 'react-flow-renderer'
import { FaTrash } from "react-icons/fa";
import { BsCircle, BsBoundingBoxCircles } from "react-icons/bs";
import './ContextMenu.css';

const NodeMenu = ({show, setShow, anchorPoint, setElements, node}) => {
  const initFillColor = '#ffffff';
  const initBorderColor = '#0abd22';

  const [fillColor, setFillColor] = useState(initFillColor);
  const [borderColor, setBorderColor] = useState(initBorderColor);
  const [nodeFormType, setNodeFormType] = useState('');

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === node.id) {
          el.style = { ...el.style, backgroundColor: fillColor };
        }
        return el;
      })
    );
  }, [fillColor, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === node.id) {
          el.style = { ...el.style, borderColor: borderColor, boxShadowColor: borderColor };
        }
        return el;
      })
    );
  }, [borderColor, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === node.id) {
          if (nodeFormType == 'circle') {
            el.style = { ...el.style, borderRadius: "50px", width: "100px", minHeight: "100px", paddingTop: "40px" };
          } else if (nodeFormType == 'rectangle') {
            el.style = { ...el.style, borderRadius: "3px", width: "150px", minHeight: "39px", paddingTop: "10px"};
          }
        }
        return el;
      })
    );
  }, [setElements, nodeFormType]);

  const onBorderColorChange = (event) => {
    setBorderColor(event.target.value)
  }

  const onFillColorChange = (event) => {
    setFillColor(event.target.value)
  }

  const onChangeToCircle = () => {
    setNodeFormType('circle')
  }

  const onChangeToRectangle = () => {
    setNodeFormType('rectangle')
  }

  const handleElementRemove = (event) => {
    onElementsRemove([node])
    setShow(false)
  }

  if (show) {
    return (
      <ul className="node-menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
        <li className='first'>
          <BsCircle className='shape-icon' onClick={onChangeToCircle} />
          <BsBoundingBoxCircles className='shape-icon' onClick={onChangeToRectangle} />
        </li>
        <li>
          Border &nbsp;
          <input
            className="nodrag round-color-picker"
            type="color"
            value={borderColor}
            onChange={onBorderColorChange}>
          </input>
        </li>
        <li>
          Background &nbsp;
          <input
            className="nodrag round-color-picker"
            type="color"
            value={fillColor}
            onChange={onFillColorChange}>
          </input>
        </li>
        <li><FaTrash className='delete-icon' onClick={handleElementRemove} /></li>
      </ul>
    );
  }
  return <></>;
};

export default NodeMenu;