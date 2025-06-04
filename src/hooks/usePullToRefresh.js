import { useEffect, useCallback, useState } from 'react';

const usePullToRefresh = (onRefresh) => {
  const [startY, setStartY] = useState(0);
  const [pulling, setPulling] = useState(false);

  const handleTouchStart = useCallback((e) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (window.scrollY === 0) {
        const currentY = e.touches[0].clientY;
        const pull = currentY - startY;

        if (pull > 0) {
          setPulling(true);
          e.preventDefault();
        }
      }
    },
    [startY]
  );

  const handleTouchEnd = useCallback(() => {
    if (pulling) {
      onRefresh();
      setPulling(false);
    }
    setStartY(0);
  }, [pulling, onRefresh]);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return pulling;
};

export default usePullToRefresh; 