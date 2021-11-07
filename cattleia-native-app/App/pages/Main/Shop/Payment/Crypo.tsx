import React, {useState} from 'react';
import {Txt, Btn, Container, Header, Logo, Img, HeaderBtn} from '../Elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {formatAddress, moneyFormat, theme} from '../../../../utils';
import {useInputHandler} from '../../../../hooks';
import {PasswordInput} from '../../../../Components';
import {useClipboard} from '@react-native-community/clipboard';
import {ActivityIndicator, ToastAndroid} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Post} from '../../../../services';

type Props = NativeStackScreenProps<
  {Crypto: {ids: string[]; total: number}},
  'Crypto'
>;

interface Response {
  ok: boolean;
  status: string;
  hash: string;
  to: string;
}

export const Crypto: React.FC<Props> = ({
  navigation,
  route: {
    params: {ids, total},
  },
}) => {
  const colors = useSelector((state: RootState) => state.themeReducer.dark)
    ? theme.dark
    : theme.light;

  const {handler, values, clearValues} = useInputHandler({password: ''});

  const user = useSelector((state: RootState) => state.userReducer.user);

  const [, setClipboard] = useClipboard();

  const [txHash, setTxHash] = useState('Pending...');

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const txValue = (total * 0.000057) / 1000;

  return (
    <Container
      direction="column"
      justify="flex-start"
      align="center"
      pt="30px"
      ps="10px"
      full>
      <Header>
        <Logo mb="30px">
          <Img source={{uri: 'asset:/images/logo.png'}} />
        </Logo>
        <Container direction="row" justify="center" align="center" pt="0px">
          <HeaderBtn margin="40px 20px 0px 0px" disabled>
            <Txt color={colors.fontPrimary} fs="16px" bold>
              Balance: {user.balance} ETH
            </Txt>
          </HeaderBtn>
        </Container>
      </Header>
      <Container direction="column" justify="center" align="center" pt="0px">
        <Container
          direction="column"
          justify="center"
          align="flex-start"
          pt="0px"
          width="100%">
          <Txt fs="14px" color={colors.fontPrimary}>
            Contract Address
          </Txt>
          <Btn
            bg={colors.inputBg}
            margin="5px 0px 0px 0px"
            height="40px"
            width="330px"
            disabled>
            <Container
              direction="row"
              justify="space-between"
              align="center"
              pt="0px"
              ps="10px"
              width="100%">
              <Txt fs="16px" color={colors.fontPrimary}>
                {formatAddress('0x9CD1753c43Eb0b586508ADA73aEAa019a1F6BD2a', 6)}
              </Txt>
              <Btn
                bg={colors.inputBg}
                margin="0px"
                height="auto"
                width="auto"
                onPress={() => {
                  setClipboard('0x9CD1753c43Eb0b586508ADA73aEAa019a1F6BD2a');
                  ToastAndroid.show(
                    'Address copied to clipboard',
                    ToastAndroid.SHORT,
                  );
                }}>
                <Ionicons
                  name="clipboard-outline"
                  color={colors.fontPrimary}
                  size={25}
                />
              </Btn>
            </Container>
          </Btn>
        </Container>
      </Container>
      <Container direction="column" justify="center" align="center" pt="30px">
        <Container
          direction="column"
          justify="center"
          align="flex-start"
          pt="0px"
          width="100%">
          <Txt fs="14px" color={colors.fontPrimary}>
            Value
          </Txt>
          <Btn
            bg={colors.inputBg}
            margin="5px 0px 0px 0px"
            height="40px"
            width="330px"
            disabled>
            <Container
              direction="row"
              justify="flex-start"
              align="center"
              pt="0px"
              ps="10px"
              width="100%">
              <Txt fs="16px" color={colors.fontPrimary}>
                {txValue.toFixed(8)}
              </Txt>
            </Container>
          </Btn>
        </Container>
      </Container>

      <Container
        direction="column"
        justify="center"
        align="flex-start"
        pt="20px">
        <PasswordInput
          value={values.password}
          label="Password *"
          handler={handler('password')}
        />
      </Container>

      <Btn
        bg={!success ? colors.primary : 'green'}
        width="200px"
        height="40px"
        margin="40px 0px"
        disabled={values.password === '' || user.balance < txValue || success}
        onPress={async () => {
          setLoading(true);
          const res = await Post<Response>(
            '/web3/transfer-to',
            {
              password: values.password,
              to: '0xded39Ea91488eFfab338CbA3AFFdDd56637cf755',
              value: txValue.toFixed(8),
            },
            user.token,
          );
          if (res.data.ok) {
            setTxHash(res.data.hash);
            setLoading(false);
            setSuccess(true);
            clearValues();
            ToastAndroid.show(
              'Success -> Use the Tx Hash to see the Tx status! (EtherScan)',
              ToastAndroid.SHORT,
            );
          } else {
            setSuccess(false);
          }
        }}>
        {loading && (
          <ActivityIndicator
            color={colors.fontPrimary}
            size="small"
            style={{
              marginRight: 10,
            }}
          />
        )}
        <Txt color={colors.fontPrimary} fs="16px">
          Pay {moneyFormat(total)}
        </Txt>
      </Btn>

      <Container
        direction="row"
        justify="flex-start"
        align="center"
        pt="40px"
        ps="20px"
        width="100%">
        <Txt color={colors.fontPrimary} fs="16px">
          Tx Hash: {formatAddress(txHash, 4)}
        </Txt>
        <Btn
          bg={colors.bgColor}
          margin="0px 10px"
          width="auto"
          height="auto"
          onPress={() => {
            setClipboard(txHash);
            ToastAndroid.show(
              'Address copied to clipboard',
              ToastAndroid.SHORT,
            );
          }}>
          <Ionicons
            name="clipboard-outline"
            color={colors.fontPrimary}
            size={20}
          />
        </Btn>
      </Container>

      <Container
        direction="row"
        justify="flex-start"
        align="center"
        pt="20px"
        ps="20px"
        width="100%">
        <Txt color={colors.fontPrimary} fs="16px">
          {'1,000.00 COP -> 0.000057 ETH'}
        </Txt>
      </Container>
    </Container>
  );
};
