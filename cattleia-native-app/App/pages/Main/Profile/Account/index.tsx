import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Hero, Option, OptionsContainer, Txt, Container} from './Elements';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {icons, theme as colors} from '../../../../utils';
import {RootState, clearUser} from '../../../../redux';
import {RankCard} from '../../../../Components';

type Props = NativeStackScreenProps<
  {
    Account: undefined;
    Wallet: undefined;
    Login: undefined;
  },
  'Account'
>;

export const Account: React.FC<Props> = ({navigation}) => {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const theme = useSelector((state: RootState) => state.themeReducer.dark)
    ? colors.dark
    : colors.light;

  const dispatch = useDispatch();

  return (
    <Container>
      <RankCard rank={user.rank} />
      <Hero bg="#c4c4c466">
        <Txt fs="16px" color={theme.fontPrimary} bold>
          HOW TO EARN POINTS?
        </Txt>
        <Ionicons
          name={icons.information.outline}
          size={24}
          color={theme.fontPrimary}
        />
      </Hero>
      <Hero bg="transparent" orientation="column">
        <Txt color={theme.primary} fs="18px" bold mb="10px">
          Levels
        </Txt>
        <Txt color={theme.fontPrimary} fs="16px">
          Unlock exclusive benefits at each level. Earn points by shopping,
          sharing your opinion and much more.
        </Txt>
      </Hero>
      <Hero bg="#c4c4c466" heigth="50px" />
      <Hero bg="transparent" orientation="column">
        <OptionsContainer onPress={() => navigation.navigate('Wallet')}>
          <Option>
            <Ionicons name={icons.wallet.outline} size={25} />
          </Option>
          <Option ml="10px">
            <Txt color={theme.fontPrimary} fs="14px" bold>
              Wallet
            </Txt>
          </Option>
        </OptionsContainer>
        <OptionsContainer
          onPress={() => {
            dispatch(clearUser());
            navigation.navigate('Login');
          }}>
          <Option>
            <Ionicons name={icons.logOut.outline} size={25} />
          </Option>
          <Option ml="10px">
            <Txt color={theme.fontPrimary} fs="14px" bold>
              Log Out
            </Txt>
          </Option>
        </OptionsContainer>
      </Hero>
    </Container>
  );
};
