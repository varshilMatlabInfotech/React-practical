import { useEffect, useState } from "react";

export default function useThrottle(value, delay = 300) {
  const [throttled, setThrottled] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setThrottled(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return throttled;
}
