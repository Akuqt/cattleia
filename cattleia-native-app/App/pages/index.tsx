import React, {useEffect, useState} from 'react';
import {PaymentType, CreditCard, Crypto} from './Main/Shop/Payment';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import {Register, Verify} from './Register';
import {eventEmitter} from 'react-native-dark-mode';
import {RootState} from '../redux/store';
import {HomePage} from './HomePage';
import {Provider} from '../context';
import {setMode} from '../redux/theme';
import {Settins} from './Settings';
import {Product} from './Main/Shop/Product';
import {Wallet} from './Wallet';
import {Login} from './Login';
import {About} from './About';
import {theme} from '../utils';
import {Main} from './Main';
import {Cart} from './Main/Shop/Cart';

interface Props {
  dark?: boolean;
}

const Stack = createNativeStackNavigator();

const Wrapper: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(props.dark || false);
    eventEmitter.on('currentModeChanged', newMode => {
      setIsDarkMode(newMode === 'dark');
    });
    return () => {
      eventEmitter.removeAllListeners();
    };
  }, [props.dark]);

  useEffect(() => {
    dispatch(setMode(isDarkMode));
  }, [isDarkMode, dispatch]);

  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {backgroundColor: colors.bgColor},
      }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Crypto" component={Crypto} />
      <Stack.Screen name="Verify" component={Verify} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Settings" component={Settins} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="CreditCard" component={CreditCard} />
      <Stack.Screen name="PaymentType" component={PaymentType} />
    </Stack.Navigator>
  );
};

export const Pages: React.FC<Props> = ({dark}) => {
  return (
    <Provider dark={dark}>
      <Wrapper dark={dark} />
    </Provider>
  );
};
