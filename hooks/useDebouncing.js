import { useState, useEffect } from 'react';

// ✅ Sahi Tareeqa (Custom Hook)
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Timer shuru kiya
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function jo purane timer ko foonk kar uda dega
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Jab bhi value ya delay badlega, yeh chalega

  return debouncedValue;
}