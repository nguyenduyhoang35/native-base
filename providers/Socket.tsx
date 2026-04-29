import {API_URL} from 'env';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import io, {Socket} from 'socket.io-client';
import {userIdSelector} from 'store/slices/user';
import {getToken} from 'utils/auth';

export const SocketContext = createContext<{
  socket?: Socket;
  socketUpload?: Socket;
}>({});

export const useSocket = () => useContext(SocketContext).socket;
export const useSocketUpload = () => useContext(SocketContext).socketUpload;

export const SockerProvider = ({children}: PropsWithChildren) => {
  const userId = useSelector(userIdSelector, shallowEqual);
  const [socket, setSocket] = useState<Socket>();
  const [socketUpload, setSocketUpload] = useState<Socket>();

  const refSocket = useRef(socket);
  const refSocketUpload = useRef(socketUpload);

  const connectSocket = useCallback(async () => {
    const token = await getToken();
    if (!token) return;
    refSocket.current = io(`${API_URL}/chat`, {query: {token}});
    refSocket.current.on('connect', () => {
      if (__DEV__) console.log('connected');
    });
    refSocket.current.on('connect_error', e => {
      if (__DEV__) console.log('connect_error', e);
    });
    refSocket.current.on('disconnect', (...args) => {
      if (__DEV__) console.log('disconnect', args);
    });
    setSocket(refSocket.current);
  }, []);

  /// ------ UPLOAD ------ //

  const connectSocketUpload = useCallback(async () => {
    const token = await getToken();
    if (!token) return;
    refSocketUpload.current = io(`${API_URL}/uploads`, {query: {token}});
    refSocketUpload.current.on('connect upload', () => {
      if (__DEV__) console.log('connected upload');
    });
    refSocketUpload.current.on('connect_error', e => {
      if (__DEV__) console.log('connect_error upload', e);
    });
    refSocketUpload.current.on('disconnect', (...args) => {
      if (__DEV__) console.log('disconnect upload', args);
    });
    setSocketUpload(refSocketUpload.current);
  }, []);

  useEffect(() => {
    connectSocket();
    connectSocketUpload();
    return () => {
      refSocket.current?.disconnect();
      refSocketUpload.current?.disconnect();
    };
  }, [connectSocket, connectSocketUpload, userId]);

  return (
    <SocketContext.Provider value={{socket, socketUpload}}>
      {children}
    </SocketContext.Provider>
  );
};
