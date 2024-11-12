import { useEffect, useRef, useState } from "react";

const useDetectOverFlow = () => {
  const [isOverFlowed, setIsOverFlowed] = useState(false);

  const containerRef = useRef(null);

  const checkOverFlow = () => {
    const container = containerRef.current;
    const content = containerRef.current.querySelector(".contentRef");

    if (container && content) {
      const list = content.children;

      let listItemsOverFlow = false;

      for (const item of list) {
        const itemRect = item.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        if (
          itemRect.right > containerRect.right ||
          itemRect.left < containerRect.left
        ) {
          listItemsOverFlow = true;
          break;
        }
      }

      setIsOverFlowed(listItemsOverFlow);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      checkOverFlow();
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return [isOverFlowed, containerRef];
};

export default useDetectOverFlow;