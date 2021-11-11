import React from 'react';
import {Header, Container, Wrapper} from '../Elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Plain, SubmitBtn} from '../../../Components';
import {useInputHandler} from '../../../hooks';
import {ToastAndroid} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {theme} from '../../../utils';
import {Post} from '../../../services';

type ParamList = {
  MainWallet: undefined;
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
      <Header color={colors.primary}>Go to your</Header>
      <Header color={colors.primary}>Wallet</Header>
      <Wrapper mt="30px 0px">
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
        />
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
              ok: boolean;
              error: {
                message: string;
                code: number;
              };
            }>('/web3/access', values, user.token);
            if (res.data.ok) navigation.navigate('MainWallet');
            else {
              ToastAndroid.show(
                `Error: ${res.data.error.message} [${res.data.error.code}]`,
                ToastAndroid.SHORT,
              );
            }
          }}
        />
      </Wrapper>
    </Container>
  );
};
