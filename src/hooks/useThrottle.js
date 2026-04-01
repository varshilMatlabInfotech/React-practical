import { useState, useEffect, useRef } from 'react';

const useThrottle = (value, delay) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef(0);

  useEffect(() => {
    const elapsed = Date.now() - lastExecuted.current;

    const timeoutId = setTimeout(() => {
      if (Date.now() - lastExecuted.current >= delay) {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }
    }, Math.max(delay - elapsed, 0));

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return throttledValue;
};

export default useThrottle;