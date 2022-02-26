import { PRODUCT_TYPES } from '../enums/productTypes';
import { IProduct } from './products.interface';

export interface ICustomList {
  data: IProduct[];
  title: string;
  productType: PRODUCT_TYPES;
  onSelectCombo: (key: PRODUCT_TYPES, product: IProduct) => void;
}
