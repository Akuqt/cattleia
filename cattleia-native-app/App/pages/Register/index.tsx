import React from 'react';
import {View} from 'react-native';
import {
  EmailInput,
  PasswordInput,
  PlainInput,
  SubmitBtn,
} from '../../Components/Inputs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Main: undefined;
  Register: {};
};

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export const Register: React.FC<Props> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <EmailInput />
      <PlainInput label={'Name'} />
      <PlainInput label={'User Name'} />
      <PasswordInput policy />
      <SubmitBtn
        label="Sign Up"
        handler={() => {
          navigation.navigate('Main');
        }}
      />
    </View>
  );
};
