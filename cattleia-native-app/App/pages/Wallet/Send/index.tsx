import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-community/clipboard';
import {formatAddress, numberFormat, theme} from '../../../utils';
import {Header, Container, Wrapper} from '../Elements';
import {SubmitBtn, Plain, QrReader} from '../../../Components';
import {useInputHandler} from '../../../hooks';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Post} from '../../../services';
import {
  useWindowDimensions,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

const format = (e: string, balance: number) => {
  let u = numberFormat(e);
  if (u !== '' && parseFloat(u) > balance) {
    u = balance + '';
  }
  if (u.length > 4 && parseFloat(u) < 0.001) {
    u = '0.001';
  }
  return u;
};

export const Send: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [showQR, setShowQR] = useState(false);
  const {values, handler, clearValues} = useInputHandler({
    to: '',
    password: '',
    value: '',
  });

  const [fromQR, setFromQR] = useState<string>('');

  const [loading, setLoading] = useState(false);

  const {width} = useWindowDimensions();

  return (
    <Container
      style={{
        backgroundColor: colors.bgColor,
      }}>
      <Header color={colors.primary}>
        Send{' '}
        {loading && (
          <ActivityIndicator
            color={colors.fontPrimary}
            size="small"
            style={{
              marginRight: 10,
            }}
          />
        )}
        {!loading && (
          <TouchableOpacity
            onPress={() => {
              clearValues();
              setFromQR('');
              setShowQR(c => !c);
            }}>
            <Ionicons
              name="qr-code-outline"
              size={25}
              color={colors.fontPrimary}
            />
          </TouchableOpacity>
        )}
      </Header>

      <QrReader
        width={width}
        bg={colors.bgColor}
        onRead={e => {
          try {
            const k = JSON.parse(e.data);
            console.log(k);

            if (k.to && k.value) {
              setFromQR(k.to);
              handler('value')(
                null as any,
                format(k.value, user.account.balance.eth),
              );
            } else {
              ToastAndroid.show('Invalid Information!', ToastAndroid.SHORT);
            }
          } catch (error) {
            ToastAndroid.show('Invalid Information!', ToastAndroid.SHORT);
          }
        }}
        setShow={setShowQR}
        show={showQR}
      />

      <Wrapper mt="20px 0px">
        <Plain
          width="330px"
          height="40px"
          bg={colors.inputBg}
          fontColor={colors.fontPrimaryInput}
          labelFontColor={colors.fontPrimary}
          fs="16px"
          margin="15px 0px"
          label="To *"
          type="Text"
          lableFs="15px"
          length={42}
          value={values.to}
          clipboard
          disabled
          differValue
          txt={fromQR}
          format={e => formatAddress(e, 6)}
          handler={handler('to')}
        />
        <Plain
          width="330px"
          height="40px"
          bg={colors.inputBg}
          fontColor={colors.fontPrimaryInput}
          labelFontColor={colors.fontPrimary}
          fs="16px"
          margin="15px 0px"
          label="Value *"
          placeholder={`0.001 - ${user.account.balance.eth}`}
          type="Number"
          lableFs="15px"
          value={values.value}
          length={30}
          handler={handler('value')}
          format={e => format(e, user.account.balance.eth)}
        />

        <Plain
          width="330px"
          height="40px"
          bg={colors.inputBg}
          fontColor={colors.fontPrimaryInput}
          labelFontColor={colors.fontPrimary}
          fs="16px"
          margin="15px 0px"
          label="Password *"
          type="Password"
          lableFs="15px"
          length={42}
          value={values.password}
          handler={handler('password')}
        />
      </Wrapper>
      <Wrapper mt="0px">
        <SubmitBtn
          alignLabel="center"
          colors={colors}
          width="330px"
          label="Send"
          lm
          disabled={loading}
          handler={async () => {
            setLoading(true);
            const res = await Post<
              {
                ok: boolean;
                status: boolean;
                hash: string;
                to: string;
              },
              {
                error: {message: string; code: number};
              },
              {
                ok: boolean;
              }
            >('/web3/transfer-to', values, user.token);
            if (res.data.ok) {
              Clipboard.setString(res.data.hash);
              ToastAndroid.show(
                'Success -> Use the Tx Hash copied in your clipboard to see the Tx status! (EtherScan)',
                ToastAndroid.LONG,
              );
            } else {
              ToastAndroid.show(
                `Error: ${res.data.error.message} [${res.data.error.code}]`,
                ToastAndroid.SHORT,
              );
            }
            setLoading(false);
            clearValues();
            setFromQR('');
          }}
        />
      </Wrapper>
    </Container>
  );
};
