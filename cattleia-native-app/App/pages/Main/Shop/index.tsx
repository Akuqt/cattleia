import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContentView} from '../../../Components';
import {DrawerActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Product} from '../../../types';
import {Filter} from './Filter';
import {theme} from '../../../utils';
import {Shop} from './Shop';

const DrawerN = createDrawerNavigator();

type Props = NativeStackScreenProps<
  {
    Product: {
      id: string;
    };
    Shop: undefined;
    Cart: {id: string};
  },
  'Shop'
>;

export const ShopView: React.FC<Props> = props => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;

  const [filter, setFilter] = useState<{
    type: '1' | '2' | '0';
    filter: keyof Product;
  }>({
    type: '0',
    filter: 'name',
  });

  return (
    <DrawerN.Navigator
      initialRouteName="Shop"
      drawerContent={p => (
        <DrawerContentView
          {...p}
          body={() => (
            <Filter
              handler={value => {
                setFilter(value as any);
                props.navigation.dispatch(DrawerActions.closeDrawer());
              }}
            />
          )}
        />
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
        options={{
          sceneContainerStyle: {
            backgroundColor: colors.bgColor,
          },
        }}>
        {_ => <Shop {...props} {...filter} />}
      </DrawerN.Screen>
    </DrawerN.Navigator>
  );
};
