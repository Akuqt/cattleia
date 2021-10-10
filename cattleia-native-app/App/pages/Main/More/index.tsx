import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Options} from './Options';
import {theme} from '../../../utils';

const Stack = createNativeStackNavigator();

export const More: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Stack.Navigator
      initialRouteName="Options"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: colors.bgColor,
        },
      }}>
      <Stack.Screen name="Options" component={Options} />
    </Stack.Navigator>
  );
};
