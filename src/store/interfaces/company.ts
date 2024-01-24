export interface ICompanyInitialState {
  singleCompanyData: ICompany | null;
  companiesList: ICompany[];
}

export interface ICompany {
  id: number;
  name: string;
  description: string;
  positionInView: number;
  isEnabled: boolean;
  mediaPath: string;
}

export interface IAddCompany {
  name: string;
  positionInView: number;
  description: string;
  isEnabled: boolean;
  mediaPath: string;
}

export interface IUpdateCompany extends IAddCompany {
  id: number;
}
