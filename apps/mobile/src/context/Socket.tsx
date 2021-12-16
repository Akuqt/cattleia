import React, {createContext, useCallback, useEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';
import {constants} from 'utils';

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC = ({children}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connect = useCallback(() => {
    const socket_ = io(constants.baseUri, {path: constants.path});
    socket_.on('connect', () => {
      setSocket(socket_);
    });

    socket_.on('connect_error', _e => {
      //TODO: Notify error
      setSocket(null);
    });
  }, []);

  useEffect(() => {
    connect();
  }, [connect]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
