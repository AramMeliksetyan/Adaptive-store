import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPaginated } from "shared/ui/DataTable/constants";
import thunkOptions from "store/config/thunkOptions";
import { IStoreInitialState } from "store/interfaces";
import {
  ICompany,
  ICompanyInitialState,
  IAddCompany,
  IUpdateCompany,
} from "store/interfaces/company";
import { api } from "store/services/apiService";

const initialState: ICompanyInitialState = {
  singleCompanyData: null,
  companiesList: [],
};

const name = "COMPANY";

const url = import.meta.env.VITE_BASE_URL;

export const getCompanies = createAsyncThunk<IPaginated<ICompany>, string>(
  `${name}/getCompanies`,
  async (params) => {
    return await api.get(`${url}/Company/GetCompaniesPaged?${params}`);
  },
  thunkOptions
);

export const getCompaniesList = createAsyncThunk<ICompany[]>(
  `${name}/getCompanies`,
  async () => {
    return await api.get(`${url}/Company/GetCompanies`);
  },
  thunkOptions
);

export const getCompanyById = createAsyncThunk<ICompany, string>(
  `${name}/getCompanyById`,
  async (id) => {
    return await api.get(`${url}/Company/GetCompanyById?companyId=${id}`);
  },
  thunkOptions
);

export const addCompany = createAsyncThunk<any, IAddCompany>(
  `${name}/addCompany`,
  async (data) => {
    return await api.post(`${url}/Company/AddCompany`, data);
  },
  thunkOptions
);

export const updateCompany = createAsyncThunk<any, IUpdateCompany>(
  `${name}/updateCompany`,
  async (data) => {
    return await api.post(`${url}/Company/UpdateCompany`, data);
  },
  thunkOptions
);

const companySlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanyById.fulfilled, (state, { payload }) => {
      state.singleCompanyData = payload;
    });
    builder.addCase(getCompaniesList.fulfilled, (state, { payload }) => {
      state.companiesList = payload;
    });
  },
});

export const selectSingleCompanyData = (state: IStoreInitialState) =>
  state.company.singleCompanyData;

export const selectCompaniesList = (state: IStoreInitialState) =>
  state.company.companiesList;

export default companySlice.reducer;
