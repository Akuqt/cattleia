import React, {useEffect, useState} from 'react';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, Txt, Img, Logo, Header, Option} from '../Elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useBackHandler} from '../../../../hooks';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {theme} from '../../../../utils';

type Props = NativeStackScreenProps<
  {
    Cart: {id: string};
    Product: {id: string};
    PaymentType: {id: string};
    CreditCard: {ids: string[]; total: number};
    Crypto: {ids: string[]; total: number};
  },
  'PaymentType'
>;

export const PaymentType: React.FC<Props> = ({
  navigation,
  route: {
    params: {id},
  },
}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);

  const colors = darkTheme ? theme.dark : theme.light;

  const shop = useSelector((state: RootState) => state.shopReducer.shop);

  const [ids, setIds] = useState<string[]>([]);

  const [total, setTotal] = useState(0);

  useBackHandler(() => {
    if (id === '-1') {
      navigation.navigate('Cart', {id: '-1'});
    } else {
      navigation.navigate('Product', {id});
    }
  });

  useEffect(() => {
    if (id !== '-1') {
      setTotal(shop.products.find(c => c.id === id)?.price || 0);
      setIds([id]);
    } else {
      setTotal(shop.cart.total);
      const _ids = shop.cart.products.map(p => p.id);
      setIds(_ids);
    }
  }, [id]);

  return (
    <Container
      full
      direction="column"
      justify="flex-start"
      align="flex-start"
      pt="10px">
      <Header>
        <Logo mb="2px">
          <Img
            source={{
              uri: darkTheme
                ? 'asset:/images/logo2.png'
                : 'asset:/images/logo.png',
            }}
          />
        </Logo>
      </Header>
      <Container
        direction="row"
        justify="flex-start"
        align="center"
        pt="10px"
        ps="20px"
        width="100%">
        <Txt color={colors.primary} fs="18px" bold>
          Choose your payment method
        </Txt>
      </Container>
      <Option
        height="80px"
        bt
        margin="20px 0px 0px 0px"
        padding="0px 20px"
        onPress={() => {
          navigation.navigate('CreditCard', {ids, total});
        }}>
        <Container direction="row" justify="flex-start" align="center" pt="0px">
          <Ionicons
            name="card-outline"
            color={colors.secondary}
            size={35}
            style={{marginRight: 10}}
          />
          <Txt color={colors.fontPrimary} fs="16px" bold>
            CREDIT CARD
          </Txt>
        </Container>
        <Container direction="row" justify="center" align="center" pt="0px">
          <Ionicons
            name="chevron-forward-outline"
            color={colors.secondary}
            size={30}
          />
        </Container>
      </Option>
      <Option
        padding="0px 20px"
        height="80px"
        bb
        bt
        margin="0px"
        onPress={() => {
          navigation.navigate('Crypto', {ids, total});
        }}>
        <Container direction="row" justify="flex-start" align="center" pt="0px">
          <IconM
            name="ethereum"
            color={colors.secondary}
            size={35}
            style={{marginRight: 10}}
          />
          <Txt color={colors.fontPrimary} fs="16px" bold>
            CRYPTO
          </Txt>
        </Container>
        <Container direction="row" justify="center" align="center" pt="0px">
          <Ionicons
            name="chevron-forward-outline"
            color={colors.secondary}
            size={30}
          />
        </Container>
      </Option>
      <Option
        height="50px"
        margin="65% 0px 30px 0px"
        padding="0px 20px"
        bb
        bt
        disabled>
        <Container
          direction="row"
          justify="center"
          align="center"
          pt="0px"
          width="100%">
          <Txt color={colors.fontPrimary} fs="14px" bold>
            Total: {total} COP
          </Txt>
        </Container>
      </Option>
    </Container>
  );
};
