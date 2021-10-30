import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {ProductCard} from '../../../Components';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {FlatList} from 'react-native';
import {theme} from '../../../utils';
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

type Props = CompositeScreenProps<
  NativeStackScreenProps<
    {
      Product: {
        id: string;
      };
      Shop: undefined;
      Cart: {id: string};
    },
    'Shop'
  >,
  DrawerScreenProps<{Filters: undefined}>
>;

export const Shop: React.FC<Props> = ({navigation}) => {
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
          <Img source={{uri: 'asset:/images/logo.png'}} />
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
            onPress={() => navigation.openDrawer()}>
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
          data={products}
          renderItem={current => (
            <Grid>
              <ProductCard
                theme={colors}
                name={current.item.name}
                description={current.item.description1}
                price={current.item.price}
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
