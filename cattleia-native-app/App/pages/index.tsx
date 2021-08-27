import React, {useEffect} from 'react';
import theme from '../utils/theme';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {RootState} from '../redux/store';
import {HomePage} from './HomePage';
import {Register} from './Register';
import {setMode} from '../redux/theme';
import {Settins} from './Settings';
import {Product} from './Main/Shop/Product';
import {Login} from './Login';
import {About} from './About';
import {Main} from './Main';
import {Wallet} from './Wallet';

const Stack = createNativeStackNavigator();

export const Pages = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMode(colorScheme === 'dark'));
  }, []);
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {backgroundColor: colors.bgColor},
        }}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Settings" component={Settins} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Wallet" component={Wallet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
