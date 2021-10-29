import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useInputHandler} from '../../hooks';
import {Alert, View} from 'react-native';
import {RootState} from '../../redux/store';
import {saveUser} from '../../redux';
import {theme} from '../../utils';
import {IAuth} from '../../types';
import {Post} from '../../services';
import {
  EmailInput,
  PasswordInput,
  PlainInput,
  SubmitBtn,
} from '../../Components';

type ParamList = {
  Main: undefined;
  Register: undefined;
  Verify: undefined;
};

type Props = NativeStackScreenProps<ParamList, 'Main'>;

export const Register: React.FC<Props> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const {values, handler} = useInputHandler({
    email: '',
    name: '',
    userName: '',
    password: '',
  });
  const dispatch = useDispatch();

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
        colors={colors}
        label="Sign Up"
        handler={async () => {
          const res = await Post<IAuth>('/auth/sign-up', values);
          if (res.data.ok) {
            dispatch(saveUser(res.data.user));
            navigation.navigate('Verify');
          } else {
            Alert.alert('Something went wrong!');
          }
        }}
      />
    </View>
  );
};

export * from './Verify';
