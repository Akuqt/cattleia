import React from 'react';
import {Alert, View} from 'react-native';
import {PasswordInput, PlainInput, SubmitBtn} from '../../Components/Inputs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useInputHandler} from '../../hooks';
import {Post} from '../../services';
import {IAuth} from '../../types';
import {useDispatch} from 'react-redux';
import {saveUser} from '../../redux/user';
import {RootState} from '../../redux/store';
import {theme} from '../../utils';
import {useSelector} from 'react-redux';

type Props = NativeStackScreenProps<{Main: undefined}, 'Main'>;

export const Login: React.FC<Props> = ({navigation}) => {
  const {values, handler} = useInputHandler({userName: '', password: ''});
  const dispatch = useDispatch();
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <PlainInput
        label="User Name"
        handler={handler('userName')}
        value={values.userName}
      />
      <PasswordInput
        help
        helpHandler={() => {}}
        handler={handler('password')}
        value={values.password}
      />
      <SubmitBtn
        colors={colors}
        label="Sign In"
        handler={async () => {
          const res = await Post<IAuth>('/auth/sign-in', values);
          if (res.data.ok) dispatch(saveUser(res.data.user));
          else Alert.alert('Invalid');
          navigation.navigate('Main');
        }}
      />
    </View>
  );
};
