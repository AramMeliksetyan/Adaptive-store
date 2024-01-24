import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPaginated } from "shared/ui/DataTable/constants";
import thunkOptions from "store/config/thunkOptions";
import { IStoreInitialState } from "store/interfaces";
import {
  IAddProduct,
  IAddVariant,
  IProduct,
  IProductInitialState,
  IUpdateProduct,
  IUpdateVariant,
} from "store/interfaces/product";
import { api } from "store/services/apiService";

const initialState: IProductInitialState = {
  singleProductData: null,
};

const name = "PRODUCT";

const url = import.meta.env.VITE_BASE_URL;

export const getProducts = createAsyncThunk<IPaginated<IProduct>, string>(
  `${name}/getCompanies`,
  async (params) => {
    return await api.get(`${url}/Product/GetProductsByTabPaged?${params}`);
  },
  thunkOptions
);

export const getProductById = createAsyncThunk<IProduct, string>(
  `${name}/getProductById`,
  async (id) => {
    return await api.get(`${url}/Product/GetProductById?productId=${id}`);
  },
  thunkOptions
);

export const addProduct = createAsyncThunk<any, IAddProduct>(
  `${name}/addProduct`,
  async (data) => {
    return await api.post(`${url}/Product/AddProduct`, data);
  },
  thunkOptions
);

export const updateProduct = createAsyncThunk<any, IUpdateProduct>(
  `${name}/updateProduct`,
  async (data) => {
    return await api.post(`${url}/Product/UpdateProduct`, data);
  },
  thunkOptions
);

export const addVariant = createAsyncThunk<any, IAddVariant>(
  `${name}/addVariant`,
  async (data) => {
    return await api.post(`${url}/Product/AddVariant`, data);
  },
  thunkOptions
);

export const updateVariant = createAsyncThunk<any, IUpdateVariant>(
  `${name}/updateVariant`,
  async (data) => {
    return await api.post(`${url}/Product/UpdateVariant`, data);
  },
  thunkOptions
);

const productSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      state.singleProductData = payload;
    });
  },
});

export const selectSingleProductData = (state: IStoreInitialState) =>
  state.product.singleProductData;

export default productSlice.reducer;
