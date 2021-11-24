import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product, Shop} from '../types';

const products: Product[] = [];

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
