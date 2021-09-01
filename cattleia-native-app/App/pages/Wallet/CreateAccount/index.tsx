import React from 'react';
import {Header, Container, Wrapper} from '../Elements';
import {useSelector, useDispatch} from 'react-redux';
import {theme} from '../../../utils';
import {RootState} from '../../../redux/store';
import {PasswordInput, SubmitBtn} from '../../../Components/Inputs';
import {useInputHandler} from '../../../hooks';
import {Post} from '../../../services';
import {saveUser} from '../../../redux/user';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Alert} from 'react-native';

type ParamList = {
  Access: undefined;
  CreateAccount: undefined;
};

type Props = NativeStackScreenProps<ParamList, 'CreateAccount'>;

export const CreateAccount: React.FC<Props> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const user = useSelector((state: RootState) => state.userReducer.user);
  const {values, handler} = useInputHandler({password: '', password2: ''});
  const dispatch = useDispatch();
  return (
    <Container>
      <Header colors={colors}>Create</Header>
      <Header colors={colors}>Account</Header>
      <Wrapper mt="30px 0px">
        <PasswordInput handler={handler('password')} value={values.password} />
        <PasswordInput
          label="Confirm Password"
          handler={handler('password2')}
          value={values.password2}
        />
      </Wrapper>
      <Wrapper mt="-10px 0px 0px 0px">
        <SubmitBtn
          alignLabel="center"
          colors={colors}
          width="330px"
          label="Create Account"
          lm
          handler={async () => {
            const res = await Post<{ok: boolean}>(
              '/web3/create-account',
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
