import React from 'react';
import {removeCartProduct, RootState} from '../../../../redux';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {moneyFormat, theme} from 'utils';
import {useBackHandler} from 'hooks';
import {ProductCard} from 'components/native';
import {logo, logo2} from 'assets';
import {FlatList} from 'react-native';
import {
  Txt,
  Img,
  Btn,
  Logo,
  Grid,
  Header,
  Footer,
  SafeArea,
  HeaderBtn,
  Container,
} from '../Elements';

type Props = NativeStackScreenProps<
  {
    Cart: {id: string};
    Product: {id: string};
    Shop: undefined;
    PaymentType: {id: string};
  },
  'Cart'
>;

export const Cart: React.FC<Props> = ({
  navigation,
  route: {
    params: {id},
  },
}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;

  const cart = useSelector((state: RootState) => state.shopReducer.shop).cart;

  const dispatch = useDispatch();

  useBackHandler(() => {
    if (id !== '-1') {
      navigation.navigate('Product', {id});
    } else {
      navigation.navigate('Shop');
    }
  });

  return (
    <Container
      direction="column"
      align="center"
      justify="center"
      pt="10px"
      full>
      <Header border>
        <Logo mb="15px">
          <Img source={darkTheme ? logo2 : logo} />
        </Logo>

        <Container
          direction="column"
          justify="center"
          align="flex-start"
          pt="0px">
          <HeaderBtn margin="20px 20px 0px 0px" disabled>
            <Txt color={colors.fontPrimary} fs="16px" bold>
              {cart.count === 1 ? `${cart.count} Item` : `${cart.count} Items`}
            </Txt>
          </HeaderBtn>
          <HeaderBtn margin="20px 20px 0px 0px" disabled>
            <Txt color={colors.fontPrimary} fs="15px" bold>
              Total: {cart.total ? moneyFormat(cart.total) : '0.00 COP'}
            </Txt>
          </HeaderBtn>
        </Container>
      </Header>
      <SafeArea
        style={{
          flex: 1,
        }}>
        {cart.products.length !== 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={cart.products}
            renderItem={current => (
              <Grid>
                <ProductCard
                  disabled
                  centerInfo
                  theme={colors}
                  name={current.item.name}
                  description={current.item.description2}
                  price={current.item.price}
                  image={current.item.img}
                  onPress={() => {
                    dispatch(removeCartProduct({id: current.item.id}));
                  }}
                  onPressImg={() => {
                    navigation.navigate('Product', {id: current.item.id});
                  }}
                />
              </Grid>
            )}
          />
        ) : (
          <Container
            pt="40px"
            direction="column"
            align="center"
            justify="center">
            <Txt color={colors.fontPrimary} fs="16px" bold>
              Your cart is currently empty :(
            </Txt>
          </Container>
        )}
      </SafeArea>
      <Footer border>
        <Btn
          disabled={cart.count === 0}
          height="30px"
          margin="10px 0px"
          onPress={() => {
            navigation.navigate('PaymentType', {id: '-1'});
          }}
          bg={colors.primary}
          width="80px">
          <Txt color={colors.fontPrimaryInput} fs="15px" bold>
            Pay
          </Txt>
        </Btn>

        <Btn
          height="30px"
          margin="10px 0px"
          onPress={() => {
            navigation.navigate('Shop');
          }}
          bg={colors.gray}
          width="180px">
          <Txt color={colors.fontPrimaryInput} fs="15px" bold>
            Continue Shopping
          </Txt>
        </Btn>
      </Footer>
    </Container>
  );
};
