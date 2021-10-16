import React from 'react';
import {Container, Filter, Grid, Header, Img, Logo} from './Elements';
import {Text, SafeAreaView, FlatList} from 'react-native';
import {ProductCard} from '../../../Components';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {theme} from '../../../utils';

export const Shop: React.FC<any> = ({navigation}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Container>
      <Header>
        <Logo>
          <Img source={{uri: 'asset:/images/logo.png'}} />
        </Logo>
        <Filter onPress={() => navigation.openDrawer()}>
          <Text style={{fontWeight: 'bold', color: colors.fontPrimary}}>
            FILTERS
          </Text>
        </Filter>
      </Header>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[
            {id: '1', name: 'tree', description: 'Some Tree', price: 10000},
            {id: '2', name: 'tree', description: 'Some Tree', price: 15000},
            {id: '3', name: 'tree', description: 'Some Tree', price: 2000},
            {id: '4', name: 'tree', description: 'Some Tree', price: 0},
            {id: '5', name: 'tree', description: 'Some Tree', price: 12000},
            {id: '6', name: 'tree', description: 'Some Tree', price: 15000},
            {id: '7', name: 'tree', description: 'Some Tree', price: 15000},
            {id: '8', name: 'tree', description: 'Some Tree', price: 15000},
            {id: '9', name: 'tree', description: 'Some Tree', price: 15000},
            {id: '10', name: 'tree', description: 'Some Tree', price: 15000},
            {id: '11', name: 'tree', description: 'Some Tree', price: 15000},
            {id: '12', name: 'tree', description: 'Some Tree', price: 15000},
            {id: '13', name: 'tree', description: 'Some Tree', price: 15000},
            {id: '14', name: 'tree', description: 'Some Tree', price: 15000},
            {id: '15', name: 'tree', description: 'Some Tree', price: 15000},
            {id: '16', name: 'tree', description: 'Some Tree', price: 15000},
          ]}
          renderItem={current => (
            <Grid style={{borderTopWidth: 1}}>
              <ProductCard
                name={current.item.name + current.item.id}
                description={current.item.description}
                price={current.item.price}
                handler={() => {
                  navigation.navigate('Product', {id: current.item.id});
                }}
              />
            </Grid>
          )}
        />
      </SafeAreaView>
    </Container>
  );
};
