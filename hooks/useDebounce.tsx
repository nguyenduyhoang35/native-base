import {useCallback, useRef} from 'react';

export const useDebounce = (
  onPress?: (...args: any[]) => any,
  onDoublePress?: (...args: any[]) => any,
  debounce: number = 200,
) => {
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const _callback = useCallback(
    (...args: any[]) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = undefined;
        return onDoublePress?.(...args);
      }
      timeout.current = setTimeout(() => {
        timeout.current = undefined;
        onPress?.(...args);
      }, debounce);
    },
    [debounce, onDoublePress, onPress],
  );

  return _callback;
};
