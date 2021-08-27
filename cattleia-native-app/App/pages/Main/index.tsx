import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from '../../utils';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {More} from './More';
import {Profile} from './Profile';
import {Home} from './Home';
import {Information} from './Information';
import {ShopView} from './Shop';
import {getIcon} from '../../utils';
import {RootState} from '../../redux/store';

const Tab = createBottomTabNavigator();

export const Main: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: colors.tabBarBg,
        },
        tabBarIcon: ({focused, color, size}) => {
          return (
            <Ionicons
              name={getIcon(route.name, focused)}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
      })}
      initialRouteName="Information"
      backBehavior="initialRoute"
      sceneContainerStyle={{
        backgroundColor: colors.bgColor,
      }}>
      <Tab.Screen
        name="ShopView"
        component={ShopView}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
      <Tab.Screen
        name="Information"
        component={Information}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
    </Tab.Navigator>
  );
};
