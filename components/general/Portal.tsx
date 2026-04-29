import React, {
  FC,
  ReactNode,
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {random} from 'utils';

type TPortal = {id: string; children: ReactNode};

const PortalContext = createContext<(v: TPortal) => () => void>(
  () => () => null,
);

const usePortal = () => useContext(PortalContext);

type Props = {
  children: ReactNode;
};

const Portal: FC<Props> = ({children}) => {
  const setChild = usePortal();
  const idRef = useRef(random(16));
  const listener = useRef<() => void>(() => null);
  useEffect(() => {
    listener.current = setChild({id: idRef.current, children});
  }, [children, setChild]);

  useEffect(() => {
    return () => listener.current();
  }, []);

  return null;
};

export const PortalProvider: FC<Props> = ({children}) => {
  const [childs, setChilds] = useState<TPortal[]>([]);
  const setChildCallback = useCallback((child: TPortal) => {
    setChilds(pre => {
      if (pre.some(e => e.id === child.id)) {
        return pre.map(e => (e.id === child.id ? child : e));
      }
      return [...pre, child];
    });
    return () => setChilds(pre => pre.filter(e => e.id !== child.id));
  }, []);

  return (
    <PortalContext.Provider value={setChildCallback}>
      {children}
      {childs.map(e => e.children)}
    </PortalContext.Provider>
  );
};

export default memo(Portal) as typeof Portal;
