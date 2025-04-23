import { useEffect } from 'react';

export const usePullToRefresh = (onRefresh) => {
  useEffect(() => {
    let startY = 0;
    let touchStart = false;

    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].pageY;
        touchStart = true;
      }
    };

    const handleTouchMove = (e) => {
      if (!touchStart) return;

      const currentY = e.touches[0].pageY;
      if (currentY - startY > 100) {
        touchStart = false;
        onRefresh();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onRefresh]);
};