import { IProduct } from './products.interface';

export interface ICustomList {
  isProductSelected: (id: number) => boolean;
  data: IProduct[];
  title: string;
  onSelectCombo: (product: IProduct) => void;
}
