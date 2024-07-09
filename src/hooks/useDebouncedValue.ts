import { useEffect, useState } from "react";

export const useDebouncedValue = (value: string, delay: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    if (value === debouncedValue) {
      return;
    }

    setIsDebouncing(true);

    const timeout = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(timeout);
      setIsDebouncing(false);
    };
  }, [value, delay, debouncedValue]);

  return {
    debouncedValue,
    isDebouncing,
  };
};
