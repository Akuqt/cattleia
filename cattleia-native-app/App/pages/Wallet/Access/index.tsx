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
  Access: undefined;
};

type Props = NativeStackScreenProps<ParamList, 'Access'>;

export const Access: React.FC<Props> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const {values, handler} = useInputHandler({password: ''});
  return (
    <Container>
      <Header colors={colors}>Go to your</Header>
      <Header colors={colors}>Wallet</Header>
      <Wrapper mt="30px 0px">
        <PasswordInput handler={handler('password')} value={values.password} />
      </Wrapper>
      <Wrapper mt="-10px 0px 0px 0px">
        <SubmitBtn
          alignLabel="center"
          colors={colors}
          width="330px"
          label="Get Access"
          lm
          handler={() => navigation.navigate('MainWallet')}
        />
      </Wrapper>
    </Container>
  );
};
