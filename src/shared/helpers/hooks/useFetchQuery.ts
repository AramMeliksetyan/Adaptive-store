import { useCallback, useState } from "react";

import { AsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "node_modules/@reduxjs/toolkit/dist/createAsyncThunk";
import { useSelector } from "react-redux";
import { defaultFilterValues } from "resources/constants";
import { ERequestStatus } from "store/enums/index.enum";
import { selectTableLoadingState, setTableLoading } from "store/slicers/common";
import { useAsyncDispatch } from "./useAsyncDispatch";
import useQueryParams from "./useQueryParams";

export interface DynamicObject {
  [key: string]: any;
}

const useFetchQuery = <T extends unknown>({
  fetchFunction,
}: {
  fetchFunction: AsyncThunk<T, string, AsyncThunkConfig>;
}) => {
  const dispatch = useAsyncDispatch();
  const [data, setData] = useState<T>();
  const [get, set] = useQueryParams();

  const [error, setError] = useState(null);
  const isTableLoading = useSelector(selectTableLoadingState);

  const fetchData = useCallback(
    async (otherParams?: DynamicObject) => {
      dispatch(setTableLoading(true));

      let requestParams: any = new URLSearchParams({
        ...(defaultFilterValues as DynamicObject),
        ...get,
        ...(otherParams as DynamicObject),
      });
      const { meta, payload } = await dispatch(
        fetchFunction(requestParams.toString())
      );
      set(requestParams);
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        setError(meta);
        dispatch(setTableLoading(false));
        return;
      }
      setData(payload);
      setTimeout(() => {
        dispatch(setTableLoading(false));
      }, 400);
    },
    [dispatch]
  );

  return { data, error, isTableLoading, fetchData };
};

export default useFetchQuery;
