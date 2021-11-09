import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ToastAndroid, View} from 'react-native';
import {Plain, SubmitBtn} from '../../Components';
import {useInputHandler} from '../../hooks';
import {RootState} from '../../redux/store';
import {saveUser} from '../../redux';
import {theme} from '../../utils';
import {IAuth} from '../../types';
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
        value={values.userName}
        handler={handler('userName')}
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
          const res = await Post<IAuth>('/auth/sign-up', values);
          if (res.data.ok) {
            dispatch(saveUser(res.data.user));
            navigation.navigate('Verify');
          } else {
            ToastAndroid.show(
              `Error: ${res.data.error.message} [${res.data.error.code}]`,
              ToastAndroid.SHORT,
            );
          }
        }}
      />
    </View>
  );
};

export * from './Verify';
