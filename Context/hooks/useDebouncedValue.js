import { useEffect, useState } from 'react';

const useDebouncedValue = (value, delay, callback) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
      if (callback) {
        callback(value);
      }
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebouncedValue;