import React, {useState} from 'react';
import {numberFormat, theme} from '../../../utils';
import {Header, Container, Wrapper} from '../Elements';
import {SubmitBtn, Plain} from '../../../Components';
import {useInputHandler} from '../../../hooks';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {QrGenerator} from '../../../Components/QrGenerator';

const format = (e: string) => {
  let u = numberFormat(e);
  if (u.length > 4 && parseFloat(u) < 0.001) {
    u = '0.001';
  }
  return u;
};

export const Receive: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [showQR, setShowQR] = useState(false);
  const {values, handler} = useInputHandler({
    value: '',
  });

  return (
    <Container
      style={{
        backgroundColor: colors.bgColor,
      }}>
      <Header color={colors.primary}>Receive</Header>

      <QrGenerator
        show={showQR}
        setShow={setShowQR}
        data={{
          to: '0x' + user.account.address,
          value: values.value,
        }}
        color={colors.fontPrimary}
        bg={colors.bgColor}
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
          label="Value *"
          placeholder={'0.001'}
          type="Number"
          lableFs="15px"
          value={values.value}
          length={30}
          handler={handler('value')}
          format={format}
        />
      </Wrapper>
      <Wrapper mt="0px">
        <SubmitBtn
          alignLabel="center"
          colors={colors}
          width="330px"
          label="Generate"
          lm
          handler={async () => {
            setShowQR(true);
          }}
        />
      </Wrapper>
    </Container>
  );
};
