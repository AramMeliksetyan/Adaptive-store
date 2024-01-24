export interface IProductInitialState {
  singleProductData: IProduct | null;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  companyId: number;
  companyName: string;
  categoryId: number;
  categoryName: string;
  positionInView: number;
  variants: IVariant[];
}

export interface IVariant {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  mediaPath: string;
  isEnabled: boolean;
}

export interface IAddProduct {
  name: string;
  description: string;
  categoryId: number | string;
  price: number;
  companyId: number | string;
  positionInView: number;
}

export interface IUpdateProduct extends IAddProduct {
  id: number;
}

export interface IAddVariant {
  name: string;
  description: string;
  productId: number;
  price: number;
  quantity: number;
  mediaPath: string;
}

export interface IUpdateVariant extends IAddVariant {
  id: number;
}
