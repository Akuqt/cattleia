import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Account} from './Account';
import {History} from './History';
import {theme} from '../../../utils';

const Tab = createMaterialTopTabNavigator();

export const Tabs: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorContainerStyle: {
          backgroundColor: colors.bgColor,
        },
        tabBarActiveTintColor: colors.tabBarIndicatorActive,
        tabBarInactiveTintColor: colors.tabBarIndicatorInactive,
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
          width: 80,
          height: 2,
          position: 'absolute',
          left: '15.25%',
        },
        tabBarPressColor: '#e5e5e55f',
        tabBarContentContainerStyle: {
          backgroundColor: colors.tabBarBg,
          marginBottom: 2,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: colors.bgColor,
      }}>
      <Tab.Screen name="Account" component={Account} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
};
