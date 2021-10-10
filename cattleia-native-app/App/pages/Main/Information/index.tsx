import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Slide1, Slide2, Slide3} from './Slides';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {theme} from '../../../utils';

const Stack = createNativeStackNavigator();

export const Information = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Stack.Navigator
      initialRouteName="Info1"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: colors.bgColor,
        },
      }}>
      <Stack.Screen name="Info1" component={Slide1} />
      <Stack.Screen name="Info2" component={Slide2} />
      <Stack.Screen name="Info3" component={Slide3} />
    </Stack.Navigator>
  );
};
