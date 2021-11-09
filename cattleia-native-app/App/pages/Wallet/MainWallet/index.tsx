import React, {useState} from 'react';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/Ionicons';
import {Modal, ToastAndroid, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {formatAddress, theme} from '../../../utils';
import {useBackHandler} from '../../../hooks';
import {useClipboard} from '@react-native-community/clipboard';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Send} from '../Send';
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
  Btn,
} from '../Elements/Wallet';

type ParamList = {
  MainWallet: undefined;
  Profile: undefined;
};

type Props = NativeStackScreenProps<ParamList, 'MainWallet'>;

export const MainWallet: React.FC<Props> = ({route, navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);

  const user = useSelector((state: RootState) => state.userReducer.user);

  const colors = darkTheme ? theme.dark : theme.light;

  const originalAddress = user.account.address;

  const [, setClipboard] = useClipboard();

  const [show, setShow] = useState(false);

  useBackHandler(() => {
    navigation.navigate('Profile');
  });

  return (
    <Container color={colors.bgColor}>
      <Modal
        animationType="slide"
        visible={show}
        onRequestClose={() => {
          setShow(false);
        }}>
        <Send />
      </Modal>
      <Section heigth="30%">
        <Logo
          source={{
            uri: darkTheme
              ? 'asset:/images/logo2.png'
              : 'asset:/images/logo.png',
          }}
        />
        <Txt color={colors.fontPrimary}>Account: {user.userName}</Txt>
        <View
          style={{
            width: '100%',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Txt color={colors.fontPrimary} style={{height: '100%', margin: 0}}>
            Address: {formatAddress('0x' + originalAddress, 4)}
          </Txt>
          <Btn
            bg={colors.bgColor}
            margin="0px 0px 10px 10px"
            width="auto"
            height="auto"
            onPress={() => {
              setClipboard('0x' + originalAddress);
              ToastAndroid.show(
                'Address copied to clipboard',
                ToastAndroid.SHORT,
              );
            }}>
            <IconI
              name="clipboard-outline"
              color={colors.fontPrimary}
              size={20}
            />
          </Btn>
        </View>
      </Section>
      <Section heigth="40%" border>
        <Balance>
          <IconM name="ethereum" color={colors.secondary} size={70} />
          <MainTxt color={colors.fontPrimary}>
            {(user.account.balance * 1).toFixed(4)} ETH
          </MainTxt>
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
          <Option
            direction="column"
            width="30%"
            padding="0px"
            justify="center"
            onPress={() => setShow(true)}>
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
            <MainTxt color={colors.fontPrimary}>0 CTT</MainTxt>
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
