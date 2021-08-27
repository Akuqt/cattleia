import React from 'react';
import {Alert, View} from 'react-native';
import {
  EmailInput,
  PasswordInput,
  PlainInput,
  SubmitBtn,
} from '../../Components/Inputs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useInputHandler} from '../../hooks';
import {Post} from '../../services';
import {IAuth} from '../../types';

type RootStackParamList = {
  Main: undefined;
  Register: {};
};

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export const Register: React.FC<Props> = ({navigation}) => {
  const {values, handler} = useInputHandler({
    email: '',
    name: '',
    userName: '',
    password: '',
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <EmailInput
        label="Email"
        value={values.email}
        handler={handler('email')}
      />
      <PlainInput
        label={'Name'}
        value={values.name}
        handler={handler('name')}
      />
      <PlainInput
        label={'User Name'}
        value={values.userName}
        handler={handler('userName')}
      />
      <PasswordInput
        policy
        value={values.password}
        handler={handler('password')}
      />
      <SubmitBtn
        label="Sign Up"
        handler={async () => {
          const res = await Post<IAuth>('/auth/sign-up', values);
          Alert.alert(JSON.stringify(res.data.ok));
          //navigation.navigate('Main');
        }}
      />
    </View>
  );
};
