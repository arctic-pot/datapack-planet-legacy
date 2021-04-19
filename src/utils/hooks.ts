import { useState } from 'react';

type VoidFn = () => void;

export function useBoolean(defaultValue = false): [boolean, VoidFn, (newVal: boolean) => void] {
  const [val, setVal] = useState(defaultValue);
  const toggle = () => {
    if (val) {
      setVal(false);
    } else {
      setVal(true);
    }
  };
  const set = (newVal: boolean) => {
    setVal(newVal);
  };

  return [val, toggle, set];
}
