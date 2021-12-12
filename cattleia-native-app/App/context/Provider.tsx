import React from 'react';
import {Provider as RProvider} from 'react-redux';
import {store, persistor} from '../redux/store';
import {SocketProvider} from '../context';
import {PersistGate} from 'redux-persist/integration/react';
import {Load} from '../Components/Loader';

interface Props {
  dark?: boolean;
}

export const Provider: React.FC<Props> = ({children, dark}) => {
  return (
    <RProvider store={store}>
      <PersistGate loading={<Load dark={dark} />} persistor={persistor}>
        <SocketProvider>{children}</SocketProvider>
      </PersistGate>
    </RProvider>
  );
};
