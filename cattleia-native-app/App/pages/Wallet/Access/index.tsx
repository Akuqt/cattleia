import React from 'react';
import {Header, Container, Wrapper} from '../Elements';
import {useSelector} from 'react-redux';
import {theme} from '../../../utils';
import {RootState} from '../../../redux/store';
import {PasswordInput, SubmitBtn} from '../../../Components/Inputs';
import {useInputHandler} from '../../../hooks';
import {Post} from '../../../services';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Alert} from 'react-native';

type ParamList = {
  MainWallet: {address: string; balance: string};
  Access: undefined;
};

type Props = NativeStackScreenProps<ParamList, 'Access'>;

export const Access: React.FC<Props> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const {values, handler} = useInputHandler({password: ''});
  const user = useSelector((state: RootState) => state.userReducer.user);
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
          handler={async () => {
            const res = await Post<{
              address: string;
              balance: string;
              ok: boolean;
            }>('/web3/access', values, user.token);
            if (res.data.ok)
              navigation.navigate('MainWallet', {
                address: res.data.address,
                balance: res.data.balance,
              });
            else Alert.alert('Invalid');
          }}
        />
      </Wrapper>
    </Container>
  );
};
