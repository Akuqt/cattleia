import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ToastAndroid, View} from 'react-native';
import {formatUser, theme} from '../../utils';
import {Plain, SubmitBtn} from '../../Components';
import {APIError, IAuth} from '../../types';
import {useInputHandler} from '../../hooks';
import {RootState} from '../../redux/store';
import {saveUser} from '../../redux';
import {Post} from '../../services';

type ParamList = {
  Main: undefined;
  Register: undefined;
  Verify: undefined;
};

type Props = NativeStackScreenProps<ParamList, 'Register'>;

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
      <Plain
        width="330px"
        height="40px"
        bg={colors.inputBg}
        fontColor={colors.fontPrimaryInput}
        labelFontColor={colors.fontPrimary}
        fs="16px"
        margin="15px 0px"
        label="Email"
        type="Email"
        value={values.email}
        lableFs="15px"
        length={36}
        handler={handler('email')}
      />
      <Plain
        width="330px"
        height="40px"
        bg={colors.inputBg}
        fontColor={colors.fontPrimaryInput}
        labelFontColor={colors.fontPrimary}
        fs="16px"
        margin="15px 0px"
        label="Name"
        lableFs="15px"
        type="Text"
        length={36}
        value={values.name}
        handler={handler('name')}
      />
      <Plain
        width="330px"
        height="40px"
        bg={colors.inputBg}
        fontColor={colors.fontPrimaryInput}
        labelFontColor={colors.fontPrimary}
        fs="16px"
        margin="15px 0px"
        label="User Name"
        lableFs="15px"
        type="Text"
        length={10}
        value={values.userName}
        handler={handler('userName')}
        format={formatUser}
      />
      <Plain
        width="330px"
        height="40px"
        bg={colors.inputBg}
        fontColor={colors.fontPrimaryInput}
        labelFontColor={colors.fontPrimary}
        fs="16px"
        margin="15px 0px"
        label="Password"
        type="Password"
        lableFs="15px"
        length={20}
        value={values.password}
        handler={handler('password')}
        password={{
          policy: {
            color1: colors.fontPrimary,
            color2: colors.primary,
            terms: () => {},
            notice: () => {},
          },
        }}
      />

      <SubmitBtn
        colors={colors}
        label="Sign Up"
        handler={async () => {
          if (
            values.email.match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            )
          ) {
            const res = await Post<IAuth, APIError, {ok: boolean}>(
              '/auth/sign-up',
              values,
            );
            if (res.data.ok) {
              dispatch(saveUser(res.data.user));
              navigation.navigate('Verify');
            } else {
              ToastAndroid.show(
                `Error: ${res.data.error.message} [${res.data.error.code}]`,
                ToastAndroid.SHORT,
              );
            }
          } else {
            ToastAndroid.show('Invalid email, try again!', ToastAndroid.SHORT);
          }
        }}
      />
    </View>
  );
};

export * from './Verify';
