import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product, Shop} from '../types';

const products: Product[] = [
  {
    name: 'Tree 1',
    description1: 'Some Tree 1',
    description2: 'Long descriptiona about tree 1 bla bla',
    id: '1',
    price: 10000,
    onCart: false,
    img: 'https://images.pexels.com/photos/1367219/pexels-photo-1367219.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Tree 2',
    description1: 'Some Tree 2',
    description2: 'Long descriptiona about tree 2 bla bla',
    id: '2',
    price: 30000,
    onCart: false,
    img: 'https://images.pexels.com/photos/670741/pexels-photo-670741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Tree 3',
    description1: 'Some Tree 3',
    description2: 'Long descriptiona about tree 3 bla bla',
    id: '3',
    price: 4000,
    onCart: false,
    img: 'https://images.pexels.com/photos/6843678/pexels-photo-6843678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Tree 4',
    description1: 'Some Tree 4',
    description2: 'Long descriptiona about tree 4 bla bla',
    id: '4',
    price: 0,
    onCart: false,
    img: 'https://images.pexels.com/photos/7784602/pexels-photo-7784602.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Tree 5',
    description1: 'Some Tree 5',
    description2: 'Long descriptiona about tree 5 bla bla',
    id: '5',
    price: 3000,
    onCart: false,
    img: 'https://images.pexels.com/photos/6357190/pexels-photo-6357190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Tree 6',
    description1: 'Some Tree 6',
    description2: 'Long descriptiona about tree 6 bla bla',
    id: '6',
    price: 5000,
    onCart: false,
    img: 'https://images.pexels.com/photos/4019666/pexels-photo-4019666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Tree 7',
    description1: 'Some Tree 7',
    description2: 'Long descriptiona about tree 7 bla bla',
    id: '7',
    price: 1000,
    onCart: false,
    img: 'https://images.pexels.com/photos/212185/pexels-photo-212185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Tree 8',
    description1: 'Some Tree 8',
    description2: 'Long descriptiona about tree 8 bla bla',
    id: '8',
    price: 0,
    onCart: false,
    img: 'https://images.pexels.com/photos/1031962/pexels-photo-1031962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    name: 'Tree 9',
    description1: 'Some Tree 9',
    description2: 'Long descriptiona about tree 9 bla bla',
    id: '9',
    price: 8000,
    onCart: false,
    img: 'https://images.pexels.com/photos/4019667/pexels-photo-4019667.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  },
];

interface Init {
  shop: Shop;
}

const initialState: Init = {
  shop: {
    products,
    cart: {
      total: 0,
      count: 0,
      products: [],
    },
  },
};

export const shopSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.shop.products = action.payload;
    },
    removeProducts: (state, action: PayloadAction<{id: string}>) => {
      state.shop.products = state.shop.products.filter(
        c => c.id !== action.payload.id,
      );
    },
    setCartProduct: (state, action: PayloadAction<{id: string}>) => {
      const find = state.shop.products.find(c => c.id === action.payload.id);
      if (find?.id === action.payload.id && !find.onCart) {
        find.onCart = true;
        state.shop.cart.count++;
        state.shop.cart.total += find.price;
        state.shop.cart.products.push(find);
      }
    },
    removeCartProduct: (state, action: PayloadAction<{id: string}>) => {
      const find = state.shop.products.find(c => c.id === action.payload.id);
      if (find?.id === action.payload.id && find.onCart) {
        const index = state.shop.products.indexOf(find);
        state.shop.cart.count--;
        state.shop.cart.total -= find.price;
        state.shop.products[index].onCart = false;
        state.shop.cart.products = state.shop.cart.products.filter(
          c => c.id !== action.payload.id,
        );
      }
    },
  },
});

export const {setProducts, removeCartProduct, removeProducts, setCartProduct} =
  shopSlice.actions;

export default shopSlice.reducer;
