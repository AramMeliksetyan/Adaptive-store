import { IAuthInitialState } from "./auth";
import { ICommonInitialState } from "./common";
import { ICompanyInitialState } from "./company";
import { IProductInitialState } from "./product";

export interface IStoreInitialState {
  common: ICommonInitialState;
  auth: IAuthInitialState;
  company: ICompanyInitialState;
  product: IProductInitialState;
}
