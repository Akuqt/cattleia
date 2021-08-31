import React from 'react';
import {Header, Container, Wrapper} from '../Elements';
import {useSelector} from 'react-redux';
import {theme} from '../../../utils';
import {RootState} from '../../../redux/store';
import {PasswordInput, SubmitBtn} from '../../../Components/Inputs';
import {useInputHandler} from '../../../hooks';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

type ParamList = {
  MainWallet: undefined;
  CreateAccount: undefined;
};

type Props = NativeStackScreenProps<ParamList, 'CreateAccount'>;

export const CreateAccount: React.FC<Props> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const {values, handler} = useInputHandler({password: '', password2: ''});
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
          handler={() => navigation.navigate('MainWallet')}
        />
      </Wrapper>
    </Container>
  );
};
