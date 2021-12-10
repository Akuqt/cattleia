import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {store, persistor} from './redux/store';
import {SocketProvider} from './context';
import {useDarkMode} from 'react-native-dark-mode';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {Pages} from './pages';
import {Load} from './Components/Loader';

export default () => {
  const dark = useDarkMode();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Load dark={dark} />} persistor={persistor}>
        <SocketProvider>
          <Pages />
        </SocketProvider>
      </PersistGate>
    </Provider>
  );
};
