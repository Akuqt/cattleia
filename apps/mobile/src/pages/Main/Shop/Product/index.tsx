import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, Header, Logo, Img, Btn, Txt, HeaderBtn} from '../Elements';
import {ActivityIndicator, ToastAndroid} from 'react-native';
import {RootState, setCartProduct} from '../../../../redux';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {logo, logo2} from 'assets';
import {theme} from 'utils';

type Props = NativeStackScreenProps<
  {
    Product: {id: string};
    Shop: undefined;
    PaymentType: {id: string};
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
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const [loading, setLoading] = useState(false);

  const cart = useSelector((state: RootState) => state.shopReducer.shop).cart;
  const product = useSelector(
    (state: RootState) => state.shopReducer.shop,
  ).products.find(p => p.id === id);
  //TODO
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
          <Img source={darkTheme ? logo2 : logo} />
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
            {loading && (
              <ActivityIndicator
                color={colors.fontPrimary}
                size="small"
                style={{
                  marginRight: 10,
                }}
              />
            )}

            <Btn
              onPress={() => {
                if (product?.price === 0) {
                  setLoading(true);
                  ToastAndroid.show(
                    'Product added to your collection!',
                    ToastAndroid.SHORT,
                  );
                  navigation.navigate('Shop');
                } else {
                  navigation.navigate('PaymentType', {id});
                }
              }}
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
              disabled={product?.onCart || product?.price === 0}
              bg={colors.inputBg}
              width="100px"
              margin="5px"
              onPress={() => {
                dispatch(setCartProduct({id}));
              }}>
              <Txt
                fs="14px"
                color={
                  product?.onCart || product?.price === 0 ? '#505050' : '#000'
                }
                bold>
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
