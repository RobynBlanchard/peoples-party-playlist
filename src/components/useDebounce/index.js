import {useEffect, useState} from 'react'

const useDebounce = (votes, value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      console.log('hook');
      console.log('debouncedValue', debouncedValue)
      console.log('value', value)

      // if votes === 3
      // return early and clear timeout
      // if ((value - votes) === 3) {
      //   console.log('here')
      //   setDebouncedValue(value);
      //   return;
      // }

      // if ((votes - value) === 2) {
      //   console.log('her 2e')
      //   setDebouncedValue(value);
      //   return;
      // }

      const handler = setTimeout(() => {
        console.log('set debounced value')
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return debouncedValue;
}

export default useDebounce;
