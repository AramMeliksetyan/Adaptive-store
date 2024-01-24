import { Action, configureStore } from "@reduxjs/toolkit";
import { IStoreInitialState } from "./interfaces";
import combinedReducers from "./slicers";

const rootReducer = (state: IStoreInitialState | undefined, action: Action) => {
  if (action.type === "auth/signOut") {
    state = undefined;
  }
  return combinedReducers(state, action as never);
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export { store };
