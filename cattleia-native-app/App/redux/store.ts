import themeReducer from './theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './user';
import shopReducer from './shop';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
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

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  themeReducer: persistReducer(persistConfig, themeReducer),
  userReducer: persistReducer(persistConfig, userReducer),
  shopReducer: persistReducer(persistConfig, shopReducer),
});

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
