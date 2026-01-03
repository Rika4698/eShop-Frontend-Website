/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import compareProductReducer from "../redux/features/productCompare/compareSlice";
import productReducer from "../redux/features/products/productSlice";
import couponReducer from "../redux/features/coupon/couponSlice";

// Create noop storage for SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};


// Check if we're on client side
const storageEngine = typeof window !== 'undefined' ? storage : createNoopStorage();

const persistConfig = {
  key: "auth",
  storage: storageEngine,
};

const productsPersistConfig = {
  key: "products",
  storage: storageEngine,
};

const couponPersistConfig = {
  key: "coupons",
  storage: storageEngine,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const persistedProductReducer = persistReducer(
  productsPersistConfig,
  productReducer
);

const persistedCouponReducer = persistReducer(
  couponPersistConfig,
  couponReducer
);

// Function to make the store
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedReducer,
    products: persistedProductReducer,
    compareProducts: compareProductReducer,
    coupon: persistedCouponReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);