import { useState, useMemo, useEffect } from 'react';
import { throttle } from 'lodash';

export function useThrottledValue(initial = '', delayMs = 300) {
  const [input, setInput] = useState(initial);
  const [throttled, setThrottled] = useState(initial);

  const throttledSetter = useMemo(
    () =>
      throttle(
        (value) => {
          setThrottled(value);
        },
        delayMs,
        { leading: false, trailing: true },
      ),
    [delayMs],
  );

  useEffect(() => () => throttledSetter.cancel(), [throttledSetter]);

  const setInputValue = (value) => {
    setInput(value);
    throttledSetter(value);
  };

  return [input, throttled, setInputValue];
}
