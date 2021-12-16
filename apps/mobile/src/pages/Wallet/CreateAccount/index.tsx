import React from 'react';
import {Header, Container, Wrapper} from '../Elements';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {saveUser, RootState} from '../../../redux';
import {SubmitBtn, Plain} from 'components/native';
import {useInputHandler} from 'hooks';
import {ToastAndroid} from 'react-native';
import {theme} from 'utils';
import {Post} from 'services';

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
      <Header color={colors.primary}>Create</Header>
      <Header color={colors.primary}>Account</Header>
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

        <Plain
          width="330px"
          height="40px"
          bg={colors.inputBg}
          fontColor={colors.fontPrimaryInput}
          labelFontColor={colors.fontPrimary}
          fs="16px"
          margin="15px 0px"
          label="Confirm Password"
          type="Password"
          lableFs="15px"
          value={values.password2}
          handler={handler('password2')}
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
            const res = await Post<
              {
                balance: number;
                address: string;
              },
              {
                error: {
                  message: string;
                  code: number;
                };
              },
              {ok: boolean}
            >('/web3/create-account', values, user.token);
            if (res.data.ok) {
              dispatch(
                saveUser({
                  ...user,
                  account: {
                    address: res.data.address,
                    balance: {ctt: 0, eth: 0, nft: {tokens: [], total: 0}},
                    hasAccount: res.data.ok,
                  },
                }),
              );
              navigation.navigate('Access');
            } else {
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
