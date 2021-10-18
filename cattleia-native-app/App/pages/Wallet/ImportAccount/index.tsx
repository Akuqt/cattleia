import React from 'react';
import {Header, Container, Wrapper} from '../Elements';
import {useSelector, useDispatch} from 'react-redux';
import {SubmitBtn, PasswordInput} from '../../../Components';
import {useInputHandler} from '../../../hooks';
import {RootState} from '../../../redux/store';
import {saveUser} from '../../../redux/user';
import {theme} from '../../../utils';
import {Post} from '../../../services';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Alert} from 'react-native';

type ParamList = {
  Access: undefined;
  ImportAccount: undefined;
};

type Props = NativeStackScreenProps<ParamList, 'ImportAccount'>;

export const ImportAccount: React.FC<Props> = ({navigation}) => {
  const {values, handler} = useInputHandler({
    password: '',
    password2: '',
    privateKey: '',
  });
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const user = useSelector((state: RootState) => state.userReducer.user);
  const dispatch = useDispatch();
  return (
    <Container>
      <Header colors={colors}>Import</Header>
      <Header colors={colors}>Account</Header>

      <Wrapper mt="30px 0px">
        <PasswordInput handler={handler('password')} value={values.password} />
        <PasswordInput
          label="Confirm Password"
          handler={handler('password2')}
          value={values.password2}
        />
        <PasswordInput
          label="Private Key"
          handler={handler('privateKey')}
          value={values.privateKey}
        />
      </Wrapper>
      <Wrapper mt="-10px 0px 0px 0px">
        <SubmitBtn
          alignLabel="center"
          colors={colors}
          width="330px"
          label="Import Account"
          lm
          handler={async () => {
            const res = await Post<{ok: boolean}>(
              '/web3/import-account',
              values,
              user.token,
            );
            if (res.data.ok) {
              dispatch(saveUser({...user, hasAccount: true}));
              navigation.navigate('Access');
            } else Alert.alert('Invalid');
          }}
        />
      </Wrapper>
    </Container>
  );
};
