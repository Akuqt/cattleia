import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Hero, Option, OptionsContainer, Txt, Container} from './Elements';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {icons, theme as colors} from '../../../../utils';
import {RootState, clearUser} from '../../../../redux';
import {RankCard, Accordion} from '../../../../Components';
import {ScrollView} from 'react-native';

type Props = NativeStackScreenProps<
  {
    Account: undefined;
    Wallet: undefined;
    HomePage: undefined;
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
    <ScrollView>
      <Container>
        <RankCard rank={user.rank} />
        <Hero bg="#c4c4c466" mt="10px">
          <Txt fs="14px" color={theme.fontPrimary} bold>
            HOW TO EARN POINTS?
          </Txt>
          <Ionicons
            name={icons.information.outline}
            size={24}
            color={theme.fontPrimary}
          />
        </Hero>
        <Hero bg="transparent" orientation="column" mt="10px">
          <Txt color={theme.primary} fs="14px" bold mb="10px">
            Levels
          </Txt>
          <Txt color={theme.fontPrimary} fs="12px">
            Unlock exclusive benefits at each level. Earn points by shopping,
            sharing your opinion and much more.
          </Txt>
        </Hero>
        <Accordion
          theme={theme}
          margin="10px 0px 0px 0px"
          borderTop
          title="Bronze"
          img={{
            uri: 'asset:/images/bronze.png',
            width: 22,
            height: 25,
          }}>
          <Txt
            color={theme.fontPrimary}
            fs="12px"
            mb="10px"
            style={{textAlign: 'justify'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            quia cumque consectetur dolore magni cum, in rerum quae dolorem
            tempore eos, laborum eligendi dicta ipsam, voluptate sit aliquam
            perferendis iusto?
          </Txt>
        </Accordion>
        <Accordion
          theme={theme}
          margin="0px"
          borderTop
          title="Silver"
          img={{
            uri: 'asset:/images/silver.png',
            width: 22,
            height: 25,
          }}>
          <Txt
            color={theme.fontPrimary}
            fs="12px"
            mb="10px"
            style={{textAlign: 'justify'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            quia cumque consectetur dolore magni cum, in rerum quae dolorem
            tempore eos, laborum eligendi dicta ipsam, voluptate sit aliquam
            perferendis iusto?
          </Txt>
        </Accordion>
        <Accordion
          theme={theme}
          margin="0px"
          borderTop
          borderBottom
          title="Gold"
          img={{
            uri: 'asset:/images/gold.png',
            width: 22,
            height: 25,
          }}>
          <Txt
            color={theme.fontPrimary}
            fs="12px"
            mb="10px"
            style={{textAlign: 'justify'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            quia cumque consectetur dolore magni cum, in rerum quae dolorem
            tempore eos, laborum eligendi dicta ipsam, voluptate sit aliquam
            perferendis iusto?
          </Txt>
        </Accordion>
        <Hero bg="transparent" orientation="column" mt="2px">
          <OptionsContainer onPress={() => navigation.navigate('Wallet')}>
            <Option>
              <Ionicons
                name={icons.wallet.outline}
                color={theme.secondary}
                size={24}
              />
            </Option>
            <Option ml="10px">
              <Txt color={theme.fontPrimary} fs="12px" bold>
                Wallet
              </Txt>
            </Option>
          </OptionsContainer>
          <OptionsContainer
            onPress={() => {
              dispatch(clearUser());
              navigation.navigate('HomePage');
            }}>
            <Option>
              <Ionicons
                name={icons.logOut.outline}
                size={24}
                color={theme.secondary}
              />
            </Option>
            <Option ml="10px">
              <Txt color={theme.fontPrimary} fs="12px" bold>
                Log Out
              </Txt>
            </Option>
          </OptionsContainer>
        </Hero>
      </Container>
    </ScrollView>
  );
};
