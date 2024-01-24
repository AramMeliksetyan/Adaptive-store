import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import thunkOptions from "store/config/thunkOptions";
import { IStoreInitialState } from "store/interfaces";
import { ICategory, ICommonInitialState, ITabs } from "store/interfaces/common";
import { api } from "store/services/apiService";

const initialState: ICommonInitialState = {
  isTableLoading: true,
  tabs: [],
  categories: [],
  tabCategories: [],
};

const name = "COMMON";

const url = import.meta.env.VITE_BASE_URL;

export const getTabs = createAsyncThunk<ITabs[]>(
  `${name}/getTabs`,
  async () => {
    return await api.get(`${url}/Category/GetTabs`);
  },
  thunkOptions
);

export const getCategories = createAsyncThunk<ICategory[]>(
  `${name}/getCategories`,
  async () => {
    return await api.get(`${url}/Category/GetCategories`);
  },
  thunkOptions
);

export const getCategoriesByTab = createAsyncThunk<ICategory[], string>(
  `${name}/getCategoriesByTab`,
  async (params) => {
    return await api.get(`${url}/Category/GetCategoriesByTab?${params}`);
  },
  thunkOptions
);

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setTableLoading: (state, { payload }) => {
      state.isTableLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTabs.fulfilled, (state, { payload }) => {
      state.tabs = payload;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
    });
    builder.addCase(getCategoriesByTab.fulfilled, (state, { payload }) => {
      state.categories = payload;
    });
  },
});

export const { setTableLoading } = commonSlice.actions;

export const selectTableLoadingState = (state: IStoreInitialState) =>
  state.common.isTableLoading;
export const selectTabsData = (state: IStoreInitialState) => state.common.tabs;
export const selectCategories = (state: IStoreInitialState) =>
  state.common.categories;
export const selectCategoriesByTab = (state: IStoreInitialState) =>
  state.common.tabCategories;

export default commonSlice.reducer;
