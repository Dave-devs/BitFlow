import { configureStore } from '@reduxjs/toolkit';
import { transactionReducer } from '@/src/slices/transactionSlice';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For React Native
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// Use AsyncStorage for React Native
const persistConfig = {
  key: 'balance',
  storage: AsyncStorage
};

const rootReducer = combineReducers({
  transactions: transactionReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);

// Typing for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

