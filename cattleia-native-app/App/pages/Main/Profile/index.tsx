import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootState} from '../../../redux/store';
import {saveUser} from '../../../redux';
import {UserCard} from '../../../Components';
import {theme} from '../../../utils';
import {View} from 'react-native';
import {Tabs} from './Tabs';
import {Post} from '../../../services';

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

  const onUpdate = useCallback(async (name: string) => {
    await Post('/auth/change-name', {name}, user.token);
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
        avatar={`https://avatars.dicebear.com/api/identicon/${user.id}.svg`}
        onUpdate={onUpdate}
      />
      <Tabs />
    </View>
  );
};
