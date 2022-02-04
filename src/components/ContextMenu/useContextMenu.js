import { useState, useCallback, useEffect } from "react";

const useContextMenu = () => {
  const [show, setShow] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);
  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setShow(true);
      setAnchorPoint({ x: event.pageX, y: event.pageY });
    },
    [setShow, setAnchorPoint]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  return { show, anchorPoint, handleContextMenu };
};

export default useContextMenu;