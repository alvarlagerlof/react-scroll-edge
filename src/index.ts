import { useLayoutEffect, useState, RefObject } from "react";

interface ReturnType {
  start: boolean;
  end: boolean;
}

function useScrollEdge(
  element: RefObject<HTMLElement>,
  orientation: "horizontal" | "vertical",
  offset: number = 0
): ReturnType {
  const [start, setStart] = useState<boolean>(true);
  const [end, setEnd] = useState<boolean>(false);

  useLayoutEffect(() => {
    const { current } = element;

    function calculateEdges(): void {
      const {
        scrollLeft,
        scrollTop,
        scrollWidth,
        scrollHeight,
        clientWidth,
        clientHeight,
      } = current;

      const fromStart = orientation == "horizontal" ? scrollLeft : scrollTop;

      const fromEnd =
        orientation == "horizontal"
          ? scrollWidth - scrollLeft - clientWidth
          : scrollHeight - scrollTop - clientHeight;

      setStart(fromStart < offset);
      setEnd(fromEnd < offset);
    }

    if (element.current !== null) {
      element.current.addEventListener("scroll", calculateEdges, {
        passive: true,
      });
      window.addEventListener("resize", calculateEdges, { passive: true });
    }

    return () => {
      if (element.current !== null) {
        element.current.removeEventListener("scroll", calculateEdges);
        window.removeEventListener("resize", calculateEdges);
      }
    };
  }, []);

  return { start, end };
}

export default useScrollEdge;
