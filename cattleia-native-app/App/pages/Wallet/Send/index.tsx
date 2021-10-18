import React from 'react';
import {PlainInput, SubmitBtn, PasswordInput} from '../../../Components';
import {Header, Container, Wrapper} from '../Elements';
import {useInputHandler} from '../../../hooks';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {theme} from '../../../utils';
import {Alert} from 'react-native';
import {Post} from '../../../services';

export const Send: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const user = useSelector((state: RootState) => state.userReducer.user);
  const {values, handler} = useInputHandler({to: '', value: '', password: ''});
  return (
    <Container
      style={{
        backgroundColor: colors.bgColor,
      }}>
      <Header colors={colors}>Send</Header>
      <Wrapper mt="20px 0px">
        <PlainInput label="To" handler={handler('to')} value={values.to} />
        <PlainInput
          label="Value"
          handler={handler('value')}
          value={values.value}
        />
        <PasswordInput
          label="Password"
          handler={handler('password')}
          value={values.password}
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
