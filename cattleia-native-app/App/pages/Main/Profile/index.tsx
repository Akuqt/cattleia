import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {UserCard} from '../../../Components';
import {theme} from '../../../utils';
import {View} from 'react-native';
import {Tabs} from './Tabs';

type Props = NativeStackScreenProps<
  {
    Profile: undefined;
    Wallet: undefined;
  },
  'Profile'
>;

export const Profile: React.FC<Props> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const user = useSelector((state: RootState) => state.userReducer.user);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <UserCard theme={colors} name={user.name} rank="Gold" />
      <Tabs />
    </View>
  );
};
