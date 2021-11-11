import React from 'react';
import {useBackHandler, useInputHandler} from '../../hooks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ToastAndroid, View} from 'react-native';
import {SubmitBtn, Plain} from '../../Components';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {saveUser} from '../../redux/user';
import {theme} from '../../utils';
import {APIError, IAuth} from '../../types';
import {Post} from '../../services';

type Props = NativeStackScreenProps<
  {Main: undefined; HomePage: undefined; Login: undefined},
  'Login'
>;

export const Login: React.FC<Props> = ({navigation}) => {
  useBackHandler(() => {
    navigation.navigate('HomePage');
  });

  const {values, handler, clearValues} = useInputHandler({
    userName: '',
    password: '',
  });

  const dispatch = useDispatch();

  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;

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
        label="User Name"
        lableFs="15px"
        type="Text"
        value={values.userName}
        handler={handler('userName')}
        length={10}
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
          help: {
            color: colors.primary,
            handler: () => {},
          },
        }}
      />
      <SubmitBtn
        colors={colors}
        label="Sign In"
        handler={async () => {
          const res = await Post<IAuth, APIError, {ok: boolean}>(
            '/auth/sign-in',
            values,
          );
          if (res.data.ok) {
            dispatch(saveUser(res.data.user));
            clearValues();
            navigation.navigate('Main');
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
