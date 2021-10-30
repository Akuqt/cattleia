import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {setCartProduct} from '../../../../redux';
import {RootState} from '../../../../redux/store';
import {theme} from '../../../../utils';

import {Container, Header, Logo, Img, Btn, Txt, HeaderBtn} from '../Elements';

type Props = NativeStackScreenProps<
  {
    Product: {id: string};
    Shop: undefined;
    Cart: {id: string};
  },
  'Product'
>;

export const Product: React.FC<Props> = ({
  route: {
    params: {id},
  },
  navigation,
}) => {
  const colors = useSelector((state: RootState) => state.themeReducer.dark)
    ? theme.dark
    : theme.light;

  const cart = useSelector((state: RootState) => state.shopReducer.shop).cart;

  const product = useSelector(
    (state: RootState) => state.shopReducer.shop,
  ).products.find(p => p.id === id);

  const dispatch = useDispatch();
  return (
    <Container
      pt="10px"
      direction="column"
      justify="flex-start"
      align="flex-start"
      full>
      <Header border>
        <Logo mb="15px">
          <Img source={{uri: 'asset:/images/logo.png'}} />
        </Logo>

        <HeaderBtn
          margin="30px"
          onPress={() => {
            navigation.navigate('Cart', {id});
          }}>
          <Txt color={colors.fontPrimary} fs="16px" bold>
            {cart.count}{' '}
            <Ionicons name="cart-outline" color={colors.secondary} size={25} />
          </Txt>
        </HeaderBtn>
      </Header>
      <Container
        pt="30px"
        ps="20px"
        direction="column"
        full
        justify="flex-start"
        align="center">
        <Img
          round
          source={{
            uri: product?.img,
          }}
          style={{width: 300, height: 300}}
        />
        <Container
          direction="row"
          pt="10px"
          justify="space-between"
          align="center"
          width="100%">
          <Txt fs="16px" color={colors.fontPrimary} bold>
            {product?.name}
          </Txt>
          <Container
            direction="row"
            pt="0px"
            justify="flex-start"
            align="center">
            <Btn
              round
              height="22px"
              bg={colors.primary}
              width="55px"
              margin="5px">
              <Txt fs="14px" color="#000" bold>
                Buy
              </Txt>
            </Btn>
            <Btn
              height="22px"
              round
              disabled={product?.onCart}
              bg={colors.inputBg}
              width="100px"
              margin="5px"
              onPress={() => {
                dispatch(setCartProduct({id}));
              }}>
              <Txt fs="14px" color={product?.onCart ? '#505050' : '#000'} bold>
                Add to List
              </Txt>
            </Btn>
          </Container>
        </Container>
        <Container
          pt="2px"
          direction="row"
          justify="flex-start"
          align="center"
          width="100%">
          <Txt fs="16px" color={colors.fontPrimary} bold>
            {product?.price === 0 ? 'free' : `$${product?.price}`}
          </Txt>
        </Container>

        <Container
          pt="10px"
          direction="row"
          justify="flex-start"
          align="center"
          width="100%">
          <Txt fs="16px" color={colors.fontPrimary}>
            {product?.description2}
          </Txt>
        </Container>
      </Container>
    </Container>
  );
};
