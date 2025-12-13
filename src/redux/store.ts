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



const persistConfig = {
  key: "auth",
  storage,
};

const productsPersistConfig = {
  key: "products",
  storage,
};

const couponPersistConfig = {
  key: "coupons",
  storage,
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