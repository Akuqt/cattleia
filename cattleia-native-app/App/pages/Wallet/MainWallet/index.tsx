import React, {useState, useEffect} from 'react';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/Ionicons';
import {
  ActivityIndicator,
  Linking,
  Modal,
  ToastAndroid,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {formatAddress, theme} from '../../../utils';
import {useBackHandler} from '../../../hooks';
import {useClipboard} from '@react-native-community/clipboard';
import {useDispatch, useSelector} from 'react-redux';
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
  InfoWrapper,
  AccWrapper,
} from '../Elements/Wallet';
import {Receive} from '../Receive';
import {Get} from '../../../services';
import {saveUser} from '../../../redux';

type ParamList = {
  MainWallet: undefined;
  Profile: undefined;
  NFT: undefined;
};

type Props = NativeStackScreenProps<ParamList, 'MainWallet'>;

export const MainWallet: React.FC<Props> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);

  const user = useSelector((state: RootState) => state.userReducer.user);

  const colors = darkTheme ? theme.dark : theme.light;

  const originalAddress = user.account.address;

  const [, setClipboard] = useClipboard();

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [updating, setUpdating] = useState(false);

  useBackHandler(() => {
    navigation.navigate('Profile');
  });

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await Get(`/web3/balance/${'0x' + user.account.address}`);
      dispatch(
        saveUser({
          ...user,
          account: {...user.account, balance: res.data.balance},
        }),
      );
    })();
  }, []);

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
      <Modal
        animationType="slide"
        visible={show2}
        onRequestClose={() => {
          setShow2(false);
        }}>
        <Receive />
      </Modal>
      <Section heigth="30%">
        <Logo
          source={{
            uri: darkTheme
              ? 'asset:/images/logo2.png'
              : 'asset:/images/logo.png',
          }}
        />

        <AccWrapper>
          <Txt color={colors.fontPrimary}>Account: {user.userName}</Txt>
          <Btn
            bg={colors.bgColor}
            margin="0px 0px 0px 10px"
            width="auto"
            height="auto"
            disabled={updating}
            onPress={async () => {
              setUpdating(true);
              const res_ = await Get(
                `/web3/balance/${'0x' + user.account.address}`,
              );
              dispatch(
                saveUser({
                  ...user,
                  account: {...user.account, balance: res_.data.balance},
                }),
              );
              setUpdating(false);
            }}>
            {!updating ? (
              <IconI
                name="reload-outline"
                color={colors.fontPrimary}
                size={20}
              />
            ) : (
              <ActivityIndicator color={colors.fontPrimary} size="small" />
            )}
          </Btn>
        </AccWrapper>
        <InfoWrapper>
          <Txt color={colors.fontPrimary}>
            Address: {formatAddress('0x' + originalAddress, 4)}
          </Txt>
          <Btn
            bg={colors.bgColor}
            margin="0px 0px 0px 10px"
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
        </InfoWrapper>
      </Section>
      <Section heigth="40%" border>
        <Balance>
          <IconM name="ethereum" color={colors.secondary} size={70} />
          <MainTxt color={colors.fontPrimary}>
            {(user.account.balance.eth * 1).toFixed(4)} ETH
          </MainTxt>
        </Balance>
        <MainBtns>
          <Option
            direction="column"
            width="30%"
            padding="0px"
            justify="center"
            onPress={() => {
              Linking.openURL(
                'https://buy.moonpay.com/?apiKey=pk_live_qiJRayRj9iKRUWCfaWX5Vo6Sn0rnNsj&defaultCurrencyCode=ETH',
              );
            }}>
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
          <Option
            direction="column"
            width="30%"
            padding="0px"
            justify="center"
            onPress={() => setShow2(true)}>
            <IconI name="qr-code-outline" color={colors.secondary} size={45} />
            <Txt color={colors.fontPrimary}>Receive</Txt>
          </Option>
        </MainBtns>
      </Section>
      <Section heigth="30%" border>
        <Option
          direction="row"
          width="100%"
          padding="0px 20px"
          justify="space-between"
          disabled>
          <Grapper>
            <IconI
              style={{
                marginRight: 15,
              }}
              name="rose-outline"
              color={colors.secondary}
              size={30}
            />
            <MainTxt color={colors.fontPrimary}>
              {(user.account.balance.ctt * 1).toFixed(0)} CTT
            </MainTxt>
          </Grapper>
          {/* <IconI
            name="chevron-forward-outline"
            color={colors.secondary}
            size={35}
          /> */}
        </Option>
        <Option
          direction="row"
          width="100%"
          padding="0px 20px"
          justify="space-between"
          onPress={() => {
            navigation.navigate('NFT');
          }}>
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
