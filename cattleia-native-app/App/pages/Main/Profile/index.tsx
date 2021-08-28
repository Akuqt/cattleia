import React from 'react';
import {View, Text, Button} from 'react-native';
import {theme} from '../../../utils';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../redux/store';
import {clearUser} from '../../../redux/user';

export const Profile: React.FC<any> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const user = useSelector((state: RootState) => state.userReducer.user);
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: colors.fontPrimary, marginBottom: 10}}>
        Profile!
      </Text>
      <Text style={{color: colors.fontPrimary, marginBottom: 10}}>
        User: {user.userName}
      </Text>
      <Text style={{color: colors.fontPrimary, marginBottom: 10}}>
        Name: {user.name}
      </Text>
      <Text style={{color: colors.fontPrimary, marginBottom: 10}}>
        Email: {user.email}
      </Text>
      <Text style={{color: colors.fontPrimary, marginBottom: 10}}>
        Id: {user.id}
      </Text>
      <Text style={{color: colors.fontPrimary, marginBottom: 10}}>
        Role: {user.role}
      </Text>
      <Button title="Wallet" onPress={() => navigation.navigate('Wallet')} />
      <Button
        title="Log out"
        onPress={() => {
          dispatch(clearUser());
          navigation.navigate('HomePage');
        }}
      />
    </View>
  );
};
