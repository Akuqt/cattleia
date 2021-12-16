import themeReducer from './theme';
import userReducer from './user';
import shopReducer from './shop';
import historyReducer from './history';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  configureStore,
  combineReducers,
  Reducer,
  CombinedState,
  AnyAction,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import {PersistPartial} from 'redux-persist/es/persistReducer';

import {IAuth, InitHistory, ITheme, InitShop} from 'types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  themeReducer: persistReducer(persistConfig, themeReducer),
  userReducer: persistReducer(persistConfig, userReducer),
  shopReducer: persistReducer(persistConfig, shopReducer),
  historyReducer: persistReducer(persistConfig, historyReducer),
}) as Reducer<
  CombinedState<{
    themeReducer: ITheme & PersistPartial;
    userReducer: IAuth & PersistPartial;
    shopReducer: InitShop & PersistPartial;
    historyReducer: InitHistory & PersistPartial;
  }>,
  AnyAction
>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
