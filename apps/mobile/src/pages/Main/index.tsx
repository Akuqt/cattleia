import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useBackHandler} from 'hooks';
import {getIcon, theme} from 'utils';
import {useSelector} from 'react-redux';
import {Information} from './Information';
import {RootState} from '../../redux';
import {ShopView} from './Shop';
import {Profile} from './Profile';
import {More} from './More';
import {Home} from './Home';

const Tab = createBottomTabNavigator();

export const Main: React.FC<any> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;

  useBackHandler(() => {
    navigation.navigate('Main');
  });

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: colors.tabBarBg,
        },
        tabBarHideOnKeyboard: true,
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
      initialRouteName="Home"
      backBehavior="order"
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
