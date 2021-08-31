import React from 'react';
import {Header, Container, Wrapper} from '../Elements';
import {useSelector} from 'react-redux';
import {theme} from '../../../utils';
import {RootState} from '../../../redux/store';
import {SubmitBtn} from '../../../Components/Inputs';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

type ParamList = {
  ImportAccount: undefined;
  CreateAccount: undefined;
  NoWallet: undefined;
};

type Props = NativeStackScreenProps<ParamList, 'NoWallet'>;

export const NoWallet: React.FC<Props> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Container>
      <Header colors={colors}>Account's</Header>
      <Header colors={colors}>Wallet</Header>
      <Wrapper mt="30px 0px">
        <SubmitBtn
          alignLabel="start"
          colors={colors}
          width="170px"
          label="Import One"
          lm
          sec
          handler={() => navigation.navigate('ImportAccount')}
        />
        <SubmitBtn
          alignLabel="end"
          colors={colors}
          width="170px"
          label="Create One"
          lm
          handler={() => navigation.navigate('CreateAccount')}
        />
      </Wrapper>
    </Container>
  );
};
