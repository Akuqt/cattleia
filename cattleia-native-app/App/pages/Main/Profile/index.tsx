import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootState} from '../../../redux/store';
import {UserCard} from '../../../Components';
import {theme} from '../../../utils';
import {View} from 'react-native';
import {Tabs} from './Tabs';
import {saveUser} from '../../../redux';

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
  const dispatch = useDispatch();

  const onUpdate = useCallback((name: string) => {
    dispatch(saveUser({...user, name}));
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <UserCard
        theme={colors}
        name={user.name}
        rank={user.rank}
        onUpdate={onUpdate}
      />
      <Tabs />
    </View>
  );
};
