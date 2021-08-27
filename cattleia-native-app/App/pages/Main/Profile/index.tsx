import React from 'react';
import {View, Text, Button} from 'react-native';
import {theme} from '../../../utils';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

export const Profile: React.FC<any> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: colors.fontPrimary}}>Profile!</Text>
      <Button title="Wallet" onPress={() => navigation.navigate('Wallet')} />
    </View>
  );
};
