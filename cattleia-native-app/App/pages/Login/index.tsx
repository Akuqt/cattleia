import React from 'react';
import {View} from 'react-native';
import {PasswordInput, PlainInput, SubmitBtn} from '../../Components/Inputs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Main: undefined;
  Login: {};
};

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export const Login: React.FC<Props> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <PlainInput label="User Name" />
      <PasswordInput help handler={() => {}} />
      <SubmitBtn label="Sign In" handler={() => navigation.navigate('Main')} />
    </View>
  );
};
