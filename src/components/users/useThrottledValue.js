import { useEffect, useState } from 'react';

const useThrottledValue = (value, delay) => {
  const [throttled, setThrottled] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => {
      setThrottled(value);
    }, delay);

    return () => clearTimeout(handle);
  }, [value, delay]);

  return throttled;
};

export default useThrottledValue;


