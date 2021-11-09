import React, {useEffect, useState} from 'react';
import {Header, Container, Wrapper} from '../Elements';
import {numberFormat, theme} from '../../../utils';
import {SubmitBtn, Plain} from '../../../Components';
import {useInputHandler} from '../../../hooks';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Alert} from 'react-native';
import {Post} from '../../../services';

export const Send: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const user = useSelector((state: RootState) => state.userReducer.user);
  const {values, handler} = useInputHandler({to: '', password: ''});

  const [value, setValue] = useState('');

  useEffect(() => {
    let u = numberFormat(value);
    if (u !== '' && parseFloat(u) > user.balance) {
      u = user.balance + '';
    }
    setValue(u);
  }, [value]);

  return (
    <Container
      style={{
        backgroundColor: colors.bgColor,
      }}>
      <Header color={colors.primary}>Send</Header>
      <Wrapper mt="20px 0px">
        <Plain
          width="330px"
          height="40px"
          bg={colors.inputBg}
          fontColor={colors.fontPrimaryInput}
          labelFontColor={colors.fontPrimary}
          fs="16px"
          margin="15px 0px"
          label="To"
          type="Text"
          lableFs="15px"
          value={values.to}
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
          label="Value"
          placeholder={`0 - ${user.balance}`}
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
          label="Password"
          type="Password"
          lableFs="15px"
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
          handler={async () => {
            const res = await Post<{
              ok: boolean;
              status: boolean;
              hash: string;
              to: string;
            }>('/web3/transfer-to', values, user.token);
            if (res.data.ok) {
              Alert.alert(`Status: ${res.data.status}`);
            } else Alert.alert('Invalid');
          }}
        />
      </Wrapper>
    </Container>
  );
};
