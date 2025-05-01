import { useEffect, useRef } from "react";

export const usePullToRefresh = (onRefresh) => {
  const startY = useRef(null);

  useEffect(() => {
    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!startY.current) return;
      const currentY = e.touches[0].clientY;
      const distance = currentY - startY.current;

      if (distance > 80) {
        startY.current = null;
        onRefresh();
      }
    };

    const handleTouchEnd = () => {
      startY.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onRefresh]);
};
