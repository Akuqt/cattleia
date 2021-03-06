import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {theme, getProductFilter} from 'utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootState, setProducts} from '../../../redux';
import {DrawerActions} from '@react-navigation/native';
import {ProductCard} from 'components/native';
import {logo, logo2} from 'assets';
import {FlatList} from 'react-native';
import {Product} from 'types';
import {Get} from 'services';
import {
  Img,
  Txt,
  Logo,
  Grid,
  Header,
  SafeArea,
  Container,
  HeaderBtn,
} from './Elements';

type Nav = NativeStackScreenProps<
  {
    Product: {
      id: string;
    };
    Shop: undefined;
    Cart: {id: string};
  },
  'Shop'
>;

interface Props {
  filter: keyof Product;
  type: '1' | '2' | '0';
}

export const Shop: React.FC<Props & Nav> = ({navigation, filter, type}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const products = useSelector(
    (state: RootState) => state.shopReducer.shop,
  ).products;
  const cart = useSelector((state: RootState) => state.shopReducer.shop).cart;
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await Get<{products: Product[]}, {}, {ok: boolean}>(
        '/product/all',
      );
      if (res.data.ok) {
        dispatch(setProducts(res.data.products));
      }
    })();
  }, [dispatch]);

  return (
    <Container
      pt="20px"
      direction="column"
      full
      justify="flex-start"
      align="flex-start">
      <Header border>
        <Logo mb="4px">
          <Img source={darkTheme ? logo2 : logo} />
        </Logo>
        <Container direction="row" justify="center" align="center" pt="0px">
          <HeaderBtn
            margin="40px 20px 0px 0px"
            onPress={() => {
              navigation.navigate('Cart', {id: '-1'});
            }}>
            <Txt color={colors.fontPrimary} fs="16px" bold>
              {cart.count}{' '}
              <Ionicons
                name="cart-outline"
                color={colors.secondary}
                size={25}
              />
            </Txt>
          </HeaderBtn>
          <HeaderBtn
            margin="40px 30px 0px 0px"
            onPress={() => {
              navigation.dispatch(DrawerActions.openDrawer());
            }}>
            <Txt bold color={colors.fontPrimary} fs="15px">
              FILTERS
            </Txt>
          </HeaderBtn>
        </Container>
      </Header>
      <SafeArea
        style={{
          flex: 1,
        }}>
        {products.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={getProductFilter(filter, products, type)}
            renderItem={current => (
              <Grid>
                <ProductCard
                  theme={colors}
                  name={current.item.name}
                  description={current.item.description1}
                  price={current.item.price}
                  image={current.item.img}
                  onPress={() => {
                    navigation.navigate('Product', {id: current.item.id});
                  }}
                  shop
                />
              </Grid>
            )}
          />
        ) : (
          <Container
            direction="row"
            justify="center"
            align="center"
            pt="30px"
            width="100%">
            <Txt fs="15px" color={colors.fontPrimary} bold>
              Our shop is currently empty :(
            </Txt>
          </Container>
        )}
      </SafeArea>
    </Container>
  );
};
