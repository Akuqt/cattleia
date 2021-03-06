import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Pages, Splash} from './pages';
import {useDarkMode} from 'react-native-dynamic';
import {StatusBar} from 'react-native';
import {theme} from 'utils';

const Stack = createNativeStackNavigator();

export default () => {
  const dark = useDarkMode();
  const colors = dark ? theme.dark : theme.light;
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={colors.bgColor}
        barStyle={!dark ? 'dark-content' : 'light-content'}
      />
      <Stack.Navigator
        initialRouteName="HomePage"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {backgroundColor: colors.bgColor},
        }}>
        <Stack.Screen name="Splash">
          {p => <Splash {...p} dark={dark} />}
        </Stack.Screen>
        <Stack.Screen name="Pages">{_ => <Pages dark={dark} />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
