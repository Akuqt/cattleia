import React from 'react';
import {Header, Container, Wrapper} from '../Elements';
import {useSelector} from 'react-redux';
import {theme} from '../../../utils';
import {RootState} from '../../../redux/store';
import {SubmitBtn, PasswordInput} from '../../../Components/Inputs';
import {useInputHandler} from '../../../hooks';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

type ParamList = {
  MainWallet: undefined;
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
          handler={() => navigation.navigate('MainWallet')}
        />
      </Wrapper>
    </Container>
  );
};
