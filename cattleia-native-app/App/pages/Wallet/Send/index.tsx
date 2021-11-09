import React, {useEffect, useState} from 'react';
import {formatAddress, numberFormat, theme} from '../../../utils';
import {ActivityIndicator, ToastAndroid} from 'react-native';
import {Header, Container, Wrapper} from '../Elements';
import {SubmitBtn, Plain} from '../../../Components';
import {useInputHandler} from '../../../hooks';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Post} from '../../../services';

export const Send: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const user = useSelector((state: RootState) => state.userReducer.user);
  const {values, handler} = useInputHandler({
    to: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState('');

  useEffect(() => {
    let u = numberFormat(value);
    if (u !== '' && parseFloat(u) > user.account.balance) {
      u = user.account.balance + '';
    }
    if (u.length > 4 && parseFloat(u) < 0.001) {
      u = '0.001';
    }
    setValue(u);
  }, [value]);

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
      </Header>
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
          format={e => {
            const k = e.startsWith('0x') ? e : '0x' + e;
            if (k.length > 42) return formatAddress(k.substring(0, 43), 6);
            else return formatAddress(k, 6);
          }}
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
          placeholder={`0.001 - ${user.account.balance}`}
          type="Number"
          lableFs="15px"
          value={value}
          length={14}
          handler={e => {
            setValue(e.nativeEvent.text);
          }}
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
      <Wrapper mt="0px 0px 0px 0px">
        <SubmitBtn
          alignLabel="center"
          colors={colors}
          width="330px"
          label="Send"
          lm
          disabled={loading}
          handler={async () => {
            setLoading(true);
            const res = await Post<{
              ok: boolean;
              status: boolean;
              hash: string;
              to: string;
              error: {message: string; code: number};
            }>(
              '/web3/transfer-to',
              {...values, value: value !== '' ? value : '0.001'},
              user.token,
            );
            if (res.data.ok) {
              ToastAndroid.show(
                'Success -> Use the Tx Hash to see the Tx status! (EtherScan)',
                ToastAndroid.SHORT,
              );
            } else {
              ToastAndroid.show(
                `Error: ${res.data.error.message} [${res.data.error.code}]`,
                ToastAndroid.SHORT,
              );
            }
            setLoading(false);
          }}
        />
      </Wrapper>
    </Container>
  );
};
