import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {theme} from '../../../utils';
import {
  MainTxt,
  Option,
  MainBtns,
  Txt,
  Grapper,
  Section,
  Container,
  Balance,
  Logo,
} from '../Elements/Wallet';

import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/Ionicons';

export const MainWallet: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);

  const user = useSelector((state: RootState) => state.userReducer.user);

  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Container color={colors.bgColor}>
      <Section heigth="30%">
        <Logo source={{uri: 'asset:/images/logo.png'}} />
        <Txt color={colors.fontPrimary}>Account: {user.userName}</Txt>
        <Txt color={colors.fontPrimary}>Address: 0xd3f8...708f</Txt>
      </Section>
      <Section heigth="40%" border>
        <Balance>
          <IconM name="ethereum" color={colors.secondary} size={70} />
          <MainTxt color={colors.fontPrimary}>10.221001 ETH</MainTxt>
        </Balance>
        <MainBtns>
          <Option direction="column" width="30%" padding="0px" justify="center">
            <IconM
              name="arrow-collapse-down"
              color={colors.secondary}
              size={45}
            />
            <Txt color={colors.fontPrimary}>Buy</Txt>
          </Option>
          <Option direction="column" width="30%" padding="0px" justify="center">
            <IconM
              name="send"
              color={colors.secondary}
              size={45}
              style={{
                transform: [{rotate: '-45deg'}],
              }}
            />
            <Txt color={colors.fontPrimary}>Send</Txt>
          </Option>
          <Option direction="column" width="30%" padding="0px" justify="center">
            <IconM name="cached" color={colors.secondary} size={45} />
            <Txt color={colors.fontPrimary}>Exchange</Txt>
          </Option>
        </MainBtns>
      </Section>
      <Section heigth="30%" border>
        <Option
          direction="row"
          width="100%"
          padding="0px 20px"
          justify="space-between">
          <Grapper>
            <IconI
              style={{
                marginRight: 15,
              }}
              name="rose-outline"
              color={colors.secondary}
              size={30}
            />
            <MainTxt color={colors.fontPrimary}>21020.0012 CTT</MainTxt>
          </Grapper>
          <IconI
            name="chevron-forward-outline"
            color={colors.secondary}
            size={35}
          />
        </Option>
        <Option
          direction="row"
          width="100%"
          padding="0px 20px"
          justify="space-between">
          <Grapper>
            <IconI
              style={{
                marginRight: 15,
              }}
              name="leaf-outline"
              color={colors.secondary}
              size={30}
            />
            <MainTxt color={colors.fontPrimary}>My NFTs</MainTxt>
          </Grapper>
          <IconI
            name="chevron-forward-outline"
            color={colors.secondary}
            size={35}
          />
        </Option>
      </Section>
    </Container>
  );
};
