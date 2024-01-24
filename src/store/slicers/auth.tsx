import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ELocalStorage } from "store/config/constants";
import thunkOptions from "store/config/thunkOptions";
import { IStoreInitialState } from "store/interfaces";
import {
  IAuthInitialState,
  IAuthenticateUserRequest,
  IAuthenticateUserResponse,
  IRefreshTokenRequest,
} from "store/interfaces/auth";
import { api } from "store/services/apiService";

const initialState: IAuthInitialState = {
  isAuthenticated: !!localStorage.getItem(ELocalStorage.token),
};

const name = "AUTH";

const url = import.meta.env.VITE_BASE_URL;

export const login = createAsyncThunk<
  IAuthenticateUserResponse,
  IAuthenticateUserRequest
>(
  `${name}/login`,
  async (data: IAuthenticateUserRequest) => {
    return await api.post(`${url}/Auth/AuthenticateUser`, data);
  },
  thunkOptions
);

export const refreshToken = createAsyncThunk<
  IAuthenticateUserResponse,
  IRefreshTokenRequest
>(
  `${name}/refreshToken`,
  async (data: IRefreshTokenRequest) => {
    return await api.post(`${url}/Auth/RefreshToken`, data);
  },
  thunkOptions
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem(ELocalStorage.token);
      localStorage.removeItem(ELocalStorage.refreshToken);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true;
      localStorage.setItem(ELocalStorage.token, payload.accessToken);
      localStorage.setItem(ELocalStorage.refreshToken, payload.refreshToken);
    });
    builder.addCase(refreshToken.fulfilled, (_, { payload }) => {
      localStorage.setItem(ELocalStorage.token, payload.accessToken);
      localStorage.setItem(ELocalStorage.refreshToken, payload.refreshToken);
    });
  },
});

export const { signOut } = authSlice.actions;

export const selectAuthenticatedState = (state: IStoreInitialState) =>
  state.auth.isAuthenticated;

export default authSlice.reducer;
