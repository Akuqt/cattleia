import React, {useEffect} from 'react';
import {PaymentType, CreditCard, Crypto} from './Main/Shop/Payment';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar, useColorScheme} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {Register, Verify} from './Register';
import {RootState} from '../redux/store';
import {HomePage} from './HomePage';
import {setMode} from '../redux/theme';
import {Settins} from './Settings';
import {Product} from './Main/Shop/Product';
import {Wallet} from './Wallet';
import {Login} from './Login';
import {About} from './About';
import {theme} from '../utils';
import {Main} from './Main';
import {Cart} from './Main/Shop/Cart';

const Stack = createNativeStackNavigator();

export const Pages = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  useEffect(() => {
    dispatch(setMode(colorScheme === 'dark'));
  }, []);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={colors.bgColor}
        barStyle={!darkTheme ? 'dark-content' : 'light-content'}
      />
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {backgroundColor: colors.bgColor},
        }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="Settings" component={Settins} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="PaymentType" component={PaymentType} />
        <Stack.Screen name="CreditCard" component={CreditCard} />
        <Stack.Screen name="Crypto" component={Crypto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
