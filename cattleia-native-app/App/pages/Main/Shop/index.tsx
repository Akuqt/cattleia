import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContentView} from '../../../Components/DrawerContentView';
import {Body, Header} from './DrawerContent';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {theme} from '../../../utils';
import {Shop} from './Shop';

const DrawerN = createDrawerNavigator();

export const ShopView: React.FC<any> = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <DrawerN.Navigator
      initialRouteName="Shop"
      drawerContent={props => (
        <DrawerContentView {...props} header={Header} body={Body} />
      )}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.bgColor,
          width: '50%',
        },
      }}>
      <DrawerN.Screen
        name="Shop"
        component={Shop}
        options={{
          sceneContainerStyle: {
            backgroundColor: colors.bgColor,
          },
        }}
      />
    </DrawerN.Navigator>
  );
};
