import { isPlainObject, ThunkAction } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ERequestStatus } from "store/enums/index.enum";
import { ELocalStorage } from "store/config/constants";
import { AppDispatch } from "store/index";
import { refreshToken, signOut } from "store/slicers/auth";
// import { signOut } from "store/slicers/auth";
// import { RefreshToken } from "store/slicers/auth";

export const useAsyncDispatch = () => {
  const dispatchRedux = useDispatch<AppDispatch>();

  const dispatch = useCallback(
    async (action: any) => {
      if (isPlainObject(action)) {
        dispatchRedux(action as ThunkAction<unknown, unknown, unknown, any>);
      } else {
        const initialActionThunk = await dispatchRedux(action);
        const { meta, error } = initialActionThunk;
        if (meta.requestStatus !== ERequestStatus.FULFILLED) {
          if (error.status === 401) {
            // TODO when ready

            const data = {
              refreshToken:
                localStorage.getItem(ELocalStorage.refreshToken) || "",
            };
            const refreshTokenThunk = await dispatchRedux(refreshToken(data));
            if (
              refreshTokenThunk.meta.requestStatus === ERequestStatus.FULFILLED
            ) {
              const retryAction = await dispatchRedux(action);
              return retryAction;
            } else {
              dispatchRedux(signOut());
            }
          }
          return initialActionThunk;
        } else {
          return initialActionThunk;
        }
      }
    },
    [dispatchRedux]
  );

  return dispatch;
};
