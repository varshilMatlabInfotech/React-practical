import { useEffect, useCallback } from 'react';

const useInfiniteScroll = (callback, hasMore, loading) => {
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      if (hasMore && !loading) {
        callback();
      }
    }
  }, [callback, hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
};

export default useInfiniteScroll; 