import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Txt, Btn, Container, Header, Logo, Img, HeaderBtn} from '../Elements';
import {formatAddress, moneyFormat, theme} from '../../../../utils';
import {ActivityIndicator, ToastAndroid} from 'react-native';
import {useBackHandler, useInputHandler} from '../../../../hooks';
import {removeCartProduct, RootState} from '../../../../redux';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useClipboard} from '@react-native-community/clipboard';
import {Plain} from '../../../../Components';
import {Post} from '../../../../services';

type Props = NativeStackScreenProps<
  {
    Crypto: {ids: string[]; total: number};
    Shop: undefined;
    PaymentType: {id: string};
  },
  'Crypto'
>;

interface Response {
  ok: boolean;
  status: string;
  hash: string;
  to: string;
  error: {
    message: string;
    code: number;
  };
}

export const Crypto: React.FC<Props> = ({
  navigation,
  route: {
    params: {ids, total},
  },
}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);

  const colors = darkTheme ? theme.dark : theme.light;

  const {handler, values, clearValues} = useInputHandler({password: ''});

  const user = useSelector((state: RootState) => state.userReducer.user);

  const [, setClipboard] = useClipboard();

  const [txHash, setTxHash] = useState('Pending...');

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const txValue = (total * 0.000057) / 1000;

  const balance = (user.account.balance * 1).toFixed(4);

  const dispatch = useDispatch();

  useBackHandler(() => {
    navigation.navigate('PaymentType', {
      id: ids.length === 1 ? ids[0] : '-1',
    });
  });

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
          <Img
            source={{
              uri: darkTheme
                ? 'asset:/images/logo2.png'
                : 'asset:/images/logo.png',
            }}
          />
        </Logo>
        <Container direction="row" justify="center" align="center" pt="0px">
          <HeaderBtn margin="40px 20px 0px 0px" disabled>
            <Txt color={colors.fontPrimary} fs="16px" bold>
              Balance: {balance} ETH
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
              <Txt fs="16px" color={colors.fontPrimaryInput}>
                {formatAddress('0x1d7274608c7C8324B33dA0Ff926fe10dAaF896ff', 6)}
              </Txt>
              <Btn
                bg={colors.inputBg}
                margin="0px"
                height="auto"
                width="auto"
                onPress={() => {
                  setClipboard('0x1d7274608c7C8324B33dA0Ff926fe10dAaF896ff');
                  ToastAndroid.show(
                    'Address copied to clipboard',
                    ToastAndroid.SHORT,
                  );
                }}>
                <Ionicons
                  name="clipboard-outline"
                  color={colors.fontPrimaryInput}
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
              <Txt fs="16px" color={colors.fontPrimaryInput}>
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
        <Plain
          value={values.password}
          label="Password *"
          handler={handler('password')}
          width="330px"
          height="40px"
          type="Password"
          bg={colors.inputBg}
          fs="16px"
          fontColor={colors.fontPrimaryInput}
          labelFontColor={colors.fontPrimary}
          margin="15px 0px"
        />
      </Container>

      <Btn
        bg={!success ? colors.primary : 'green'}
        width="200px"
        height="40px"
        margin="40px 0px"
        disabled={
          values.password === '' || user.account.balance < txValue || success
        }
        onPress={async () => {
          setLoading(true);
          const res = await Post<Response>(
            '/web3/transfer-to',
            {
              password: values.password,
              to: '0x1d7274608c7C8324B33dA0Ff926fe10dAaF896ff',
              value: txValue.toFixed(16),
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
            ids.forEach(id => {
              dispatch(removeCartProduct({id}));
            });
          } else {
            setSuccess(false);
            ToastAndroid.show(
              `Error: ${res.data.error.message} [${res.data.error.code}]`,
              ToastAndroid.SHORT,
            );
          }
        }}>
        {loading && (
          <ActivityIndicator
            color={colors.fontPrimaryInput}
            size="small"
            style={{
              marginRight: 10,
            }}
          />
        )}
        <Txt color={colors.fontPrimaryInput} fs="16px">
          Pay {moneyFormat(total)}
        </Txt>
      </Btn>

      <Container
        direction="row"
        justify="flex-start"
        align="center"
        pt="20px"
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

      {success && (
        <Container
          direction="row"
          justify="flex-start"
          align="center"
          pt="20px"
          ps="20px"
          width="100%">
          <Btn
            bg={colors.bgColor}
            margin="0px"
            width="100%"
            height="30px"
            onPress={() => {
              navigation.navigate('Shop');
            }}>
            <Container
              direction="row"
              justify="space-between"
              align="center"
              pt="0px"
              ps="0px"
              width="100%">
              <Txt color={colors.fontPrimary} fs="16px" bold>
                Continue Shopping
              </Txt>
              <Ionicons
                name="chevron-forward"
                color={colors.fontPrimary}
                size={20}
              />
            </Container>
          </Btn>
        </Container>
      )}
    </Container>
  );
};
