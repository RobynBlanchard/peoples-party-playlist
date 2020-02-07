import {useEffect, useState} from 'react'

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        if (value !== 0) {

          setDebouncedValue(value);
        }
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );
    console.log('debouncedValue', debouncedValue)
  return debouncedValue;
}

export default useDebounce;
