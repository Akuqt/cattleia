import React from 'react';
import {View, Text, Button} from 'react-native';
import {theme} from '../../../utils';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

export const Profile: React.FC<any> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const user = useSelector((state: RootState) => state.userReducer.user);
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
    </View>
  );
};
