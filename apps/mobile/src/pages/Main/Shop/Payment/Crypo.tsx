import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  addHistory,
  removeCartProduct,
  RootState,
  saveUser,
} from '../../../../redux';
import {Txt, Btn, Container, Header, Logo, Img, HeaderBtn} from '../Elements';
import {ActivityIndicator, Switch, ToastAndroid} from 'react-native';
import {formatAddress, moneyFormat, theme} from 'utils';
import {useBackHandler, useInputHandler} from 'hooks';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useClipboard} from '@react-native-community/clipboard';
import {logo, logo2} from 'assets';
import {Get, Post} from 'services';
import {Plain} from 'components/native';

type Props = NativeStackScreenProps<
  {
    Crypto: {ids: string[]; total: number};
    Shop: undefined;
    PaymentType: {id: string};
  },
  'Crypto'
>;

interface Response {
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
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);

  const colors = darkTheme ? theme.dark : theme.light;

  const {handler, values, clearValues} = useInputHandler({password: ''});

  const user = useSelector((state: RootState) => state.userReducer.user);

  const [, setClipboard] = useClipboard();

  const [txHash, setTxHash] = useState('0');

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [ctt, setCtt] = useState(false);

  const txValue = (total * 0.000056) / 1000;
  const txValue2 = total;

  const balance = (user.account.balance.eth * 1).toFixed(4);

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
          <Img source={darkTheme ? logo2 : logo} />
        </Logo>
        <Container direction="row" justify="center" align="center" pt="0px">
          <HeaderBtn margin="40px 20px 0px 0px" disabled>
            <Txt color={colors.fontPrimary} fs="16px" bold>
              ETH: {balance}
            </Txt>
            <Txt color={colors.fontPrimary} fs="16px" bold>
              CTT: {(user.account.balance.ctt * 1).toFixed(0)}
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
            Cattleia's Address
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
                {formatAddress('0x7B063AaEbD3Aa4698ECDFfA3f20A804A1965eEf1', 6)}
              </Txt>
              <Btn
                bg={colors.inputBg}
                margin="0px"
                height="auto"
                width="auto"
                onPress={() => {
                  setClipboard('0x7B063AaEbD3Aa4698ECDFfA3f20A804A1965eEf1');
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
              justify="space-between"
              align="center"
              pt="0px"
              ps="10px"
              width="100%">
              <Txt fs="16px" color={colors.fontPrimaryInput}>
                {ctt ? txValue2 : txValue.toFixed(8)}
              </Txt>
              <Container
                direction="row"
                justify="center"
                align="center"
                pt="0px">
                <Switch
                  trackColor={{false: colors.secondary, true: colors.primary}}
                  thumbColor={ctt ? colors.secondary : colors.primary}
                  onValueChange={() => setCtt(c => !c)}
                  value={ctt}
                />
                <Txt fs="16px" color={colors.fontPrimaryInput}>
                  {ctt ? 'CTT' : 'ETH'}
                </Txt>
              </Container>
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
          values.password === '' ||
          user.account.balance.eth < txValue ||
          success
        }
        onPress={async () => {
          setLoading(true);
          const res = await Post<
            Response,
            {
              error: {
                message: string;
                code: number;
              };
            },
            {ok: boolean}
          >(
            `/web3/${ctt ? 'transfer-tokens' : 'transfer-to'}`,
            {
              password: values.password,
              to: '0x7B063AaEbD3Aa4698ECDFfA3f20A804A1965eEf1',
              value: ctt
                ? txValue2.toString() + '000000000000000000'
                : txValue.toFixed(16),
            },
            user.token,
          );
          if (res.data.ok) {
            setTxHash(res.data.hash);
            setLoading(false);
            setSuccess(true);
            clearValues();

            const history = {
              date: new Date().toLocaleString(),
              method: 'Crypto',
              total,
            };

            dispatch(addHistory(history));

            await Post('/history/add', history, user.token);

            ToastAndroid.show(
              'Success -> Use the Tx Hash to see the Tx status! (EtherScan)',
              ToastAndroid.SHORT,
            );
            ids.forEach(id => {
              dispatch(removeCartProduct({id}));
            });

            const points = (total * 2) / 1000;

            const _res_ = await Post<
              {rank: typeof user.rank},
              {error: any},
              {ok: boolean}
            >('/rank/update', {points}, user.token);

            const res__ = await Get(
              `/web3/balance/${'0x' + user.account.address}`,
            );
            dispatch(
              saveUser({
                ...user,
                rank: _res_.data.rank,
                account: {...user.account, balance: res__.data.balance},
              }),
            );
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
        direction="column"
        justify="center"
        align="flex-start"
        pt="20px"
        ps="20px"
        width="100%">
        <Txt color={colors.fontPrimary} fs="16px">
          {'1,000.00 COP -> 0.000056 ETH'}
        </Txt>
        <Txt color={colors.fontPrimary} fs="16px">
          {'1,000.00 COP -> 1000 CTT'}
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
