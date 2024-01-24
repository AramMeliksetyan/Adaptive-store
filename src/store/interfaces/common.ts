import { IProduct } from "./product";

export interface ICommonInitialState {
  isTableLoading: boolean;
  tabs: ITabs[];
  categories: ICategory[];
  tabCategories: ICategory[];
}

export interface ITabs {
  id: number;
  order: number;
  name: string;
  isEnabled: boolean;
  url: string;
}

export interface ICategory {
  id: number;
  name: string;
  positionInView: number;
  products: IProduct[];
}
