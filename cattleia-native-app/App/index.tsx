import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {store, persistor} from './redux/store';
import {useColorScheme} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {Pages} from './pages';
import {Load} from './Components/Loader';

export default () => {
  const colorScheme = useColorScheme();
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Load dark={colorScheme === 'dark'} />}
        persistor={persistor}>
        <Pages />
      </PersistGate>
    </Provider>
  );
};
