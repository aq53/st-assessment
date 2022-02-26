import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PRODUCT_TYPES } from '../common/enums/productTypes';
import { IProduct } from '../common/interfaces';
import data from '../datasource.json';

interface IProducts {
  chips: IProduct[];
  beverages: IProduct[];
  chocolates: IProduct[];
  activeDeals: Array<number>;
}
const initialState: IProducts = {
  chips: [],
  beverages: [],
  chocolates: [],
  activeDeals: []
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchAllChips: (state: IProducts) => {
      const newState = { ...state };
      newState.chips = data.products.filter(
        (product: IProduct) => product.type === PRODUCT_TYPES.CHIPS
      );
      return newState;
    },
    fetchBeverages: (
      state: IProducts,
      action: PayloadAction<{ chipsId: number }>
    ) => {
      const newState = { ...state };
      const dealIds = data.productDealsMapping
        .filter((item) => item.productId === action.payload.chipsId)
        .map((item) => item.dealId);
      const productIds = data.productDealsMapping
        .filter((item) => dealIds.includes(item.dealId))
        .map((item) => item.productId);
      const beverages = data.products.filter(
        (item) =>
          productIds.includes(item.id) && item.type === PRODUCT_TYPES.BEVERAGE
      );
      newState.activeDeals = dealIds;
      newState.beverages = beverages;
      return newState;
    },
    fetchChocolates: (
      state: IProducts,
      action: PayloadAction<{ chipsId: number; beverageId: number }>
    ) => {
      const newState = { ...state };
      const dealIds = data.productDealsMapping
        .filter((item) => item.productId === action.payload.beverageId)
        .map((item) => item.dealId);
      const activeDeals = newState.activeDeals.filter((item) =>
        dealIds.includes(item)
      );

      const productIds = data.productDealsMapping
        .filter((item) => activeDeals.includes(item.dealId))
        .map((item) => item.productId);
      const chocolates = data.products.filter(
        (item) =>
          productIds.includes(item.id) && item.type === PRODUCT_TYPES.CHOCOLATE
      );
      newState.activeDeals = activeDeals;
      newState.chocolates = chocolates;
      return newState;
    },
    fetchActiveDeal: (
      state: IProducts,
      action: PayloadAction<{ chocolateId: number }>
    ) => {
      const newState = { ...state };
      const dealIds = data.productDealsMapping
        .filter((item) => item.productId === action.payload.chocolateId)
        .map((item) => item.dealId);
      const activeDeals = newState.activeDeals.filter((item) =>
        dealIds.includes(item)
      );
      newState.activeDeals = activeDeals;
    }
  }
});

export const {
  fetchAllChips,
  fetchBeverages,
  fetchChocolates,
  fetchActiveDeal
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
