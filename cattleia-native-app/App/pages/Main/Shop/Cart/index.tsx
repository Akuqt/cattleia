import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ProductCard, SubmitBtn} from '../../../../Components';
import {BackHandler, FlatList} from 'react-native';
import {removeCartProduct} from '../../../../redux';
import {RootState} from '../../../../redux/store';
import {theme} from '../../../../utils';
import {
  Grid,
  SafeArea,
  Container,
  Txt,
  Logo,
  Img,
  Header,
  Footer,
  HeaderBtn,
} from '../Elements';

type Props = NativeStackScreenProps<
  {Cart: {id: string}; Product: {id: string}; Shop: undefined},
  'Cart'
>;

export const Cart: React.FC<Props> = ({
  navigation,
  route: {
    params: {id},
  },
}) => {
  const colors = useSelector((state: RootState) => state.themeReducer.dark)
    ? theme.dark
    : theme.light;

  const cart = useSelector((state: RootState) => state.shopReducer.shop).cart;

  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      if (id !== '-1') {
        navigation.navigate('Product', {id});
      } else {
        navigation.navigate('Shop');
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Container
      direction="column"
      align="center"
      justify="center"
      pt="10px"
      full>
      <Header border>
        <Logo mb="15px">
          <Img source={{uri: 'asset:/images/logo.png'}} />
        </Logo>

        <Container
          direction="column"
          justify="center"
          align="flex-start"
          pt="0px">
          <HeaderBtn margin="20px 20px 0px 0px" disabled>
            <Txt color={colors.fontPrimary} fs="16px" bold>
              {cart.count} Items
            </Txt>
          </HeaderBtn>
          <HeaderBtn margin="20px 20px 0px 0px" disabled>
            <Txt color={colors.fontPrimary} fs="15px" bold>
              Total: {cart.total ? cart.total : 0} COP
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
                  theme={colors}
                  name={current.item.name}
                  description={current.item.description2}
                  price={current.item.price}
                  onPress={() => {
                    // navigation.navigate('Product', {id: current.item.id});
                    dispatch(removeCartProduct({id: current.item.id}));
                  }}
                />
              </Grid>
            )}
          />
        ) : (
          <Container
            pt="10px"
            direction="column"
            align="center"
            justify="center">
            <Txt color={colors.fontPrimary} fs="15px">
              No products
            </Txt>
          </Container>
        )}
      </SafeArea>
      <Footer border>
        <SubmitBtn
          handler={() => {}}
          colors={colors}
          label="Pay"
          width="100px"
        />

        <SubmitBtn
          handler={() => {
            navigation.navigate('Shop');
          }}
          colors={colors}
          label="Continue Shopping"
          width="200px"
        />
      </Footer>
    </Container>
  );
};
