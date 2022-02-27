import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../common/interfaces';
import data from '../datasource.json';

const initialState: IProduct[] = [];
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchAllProducts: () => data.products,
    fetchFilteredProducts: (
      state: IProduct[],
      action: PayloadAction<IProduct[]>
    ) => {
      const productIds = action.payload.map((item) => item.id);

      const dealCollections: Array<Array<number>> = productIds.reduce(
        (prevVal: any, curVal: any) => {
          const deals: Array<number> = data.productDealsMapping
            .filter((item) => curVal === item.productId)
            .map((item) => item.dealId);
          prevVal.push(deals);
          return prevVal;
        },
        []
      );

      const commonDeals = dealCollections.reduce(
        (prevVal: Array<number>, curVal: Array<number>) =>
          curVal.filter((item: number) => prevVal.indexOf(item) !== -1)
      );

      const resultedProdIds = data.productDealsMapping
        .filter((item) => commonDeals.indexOf(item.dealId) !== -1)
        .map((item) => item.productId);

      return data.products.filter(
        (item) => resultedProdIds.indexOf(item.id) !== -1
      );
    }
  }
});

export const { fetchAllProducts, fetchFilteredProducts } =
  productsSlice.actions;

export const productsReducer = productsSlice.reducer;
