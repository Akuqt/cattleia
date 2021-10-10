import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ImportAccount} from './ImportAccount';
import {CreateAccount} from './CreateAccount';
import {useSelector} from 'react-redux';
import {MainWallet} from './MainWallet';
import {RootState} from '../../redux/store';
import {NoWallet} from './NoWallet';
import {Access} from './Access';
import {theme} from '../../utils';

const Stack = createNativeStackNavigator();

export const Wallet: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const user = useSelector((state: RootState) => state.userReducer.user);
  return (
    <Stack.Navigator
      initialRouteName={user.hasAccount ? 'Access' : 'NoWallet'}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: colors.bgColor,
        },
      }}>
      <Stack.Screen name="Access" component={Access} />
      <Stack.Screen name="MainWallet" component={MainWallet} />
      <Stack.Screen name="NoWallet" component={NoWallet} />
      <Stack.Screen name="ImportAccount" component={ImportAccount} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
};
