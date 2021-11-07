import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme, getProductFilter} from '../../../utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerActions} from '@react-navigation/native';
import {ProductCard} from '../../../Components';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {FlatList} from 'react-native';
import {
  Container,
  HeaderBtn,
  Grid,
  Header,
  Img,
  Logo,
  Txt,
  SafeArea,
} from './Elements';
import {Product} from '../../../types';

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

  return (
    <Container
      pt="20px"
      direction="column"
      full
      justify="flex-start"
      align="flex-start">
      <Header border>
        <Logo mb="4px">
          <Img
            source={{
              uri: darkTheme
                ? 'asset:/images/logo2.png'
                : 'asset:/images/logo.png',
            }}
          />
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
      </SafeArea>
    </Container>
  );
};
