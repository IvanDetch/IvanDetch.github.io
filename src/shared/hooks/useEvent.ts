import { useMemo, useRef } from 'react';

export type Callback = (...args: any[]) => any;

/** useEvent — стабильная ссылка на колбэк без deps в эффектах */
export const useEvent = <T extends Callback = Callback>(callback: T): T => {
  const copy = useRef<T>();
  copy.current = callback;
  return useMemo<T>(() => ((...args: any[]) => copy.current!(...args)) as T, []);
};
