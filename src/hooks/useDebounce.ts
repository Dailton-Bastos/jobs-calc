import React from 'react';

interface Props {
  val: string;
  delay: number;
}

export const useDebounce = ({ val, delay }: Props) => {
  const [debounceVal, setDebounceVal] = React.useState(val);

  React.useEffect(() => {
    const handler = setInterval(() => setDebounceVal(val), delay);

    return () => clearInterval(handler);
  }, [val, delay]);

  return { debounceVal };
};
