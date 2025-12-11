
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IProduct } from "@/types/modal";

type TProductComparison = {
  comparisonProducts: IProduct[];
};

const initialState: TProductComparison = {
  comparisonProducts: [],
};

const productComparisonSlice = createSlice({
  name: "compareProducts",
  initialState,
  reducers: {
    addCompareProducts: (state, action) => {
      const { products } = action.payload;
      state.comparisonProducts = products;
    },
    removeFromComparison: (state, action) => {
      const productId = action.payload;
      state.comparisonProducts = state.comparisonProducts.filter(
        (product) => product.id !== productId
      );
    },
    clearCompareProducts: (state) => {
      state.comparisonProducts = [];
    },
  },
});

export const {
  addCompareProducts,
  removeFromComparison,
  clearCompareProducts,
} = productComparisonSlice.actions;

export default productComparisonSlice.reducer;


export const selectCompareProducts = (state: RootState) =>
  state.compareProducts.comparisonProducts;