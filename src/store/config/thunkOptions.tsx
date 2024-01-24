import { AxiosError, AxiosResponse } from "axios";

const thunkOptions: any = {
  serializeError: (
    error: Record<string, { status: AxiosError; data: AxiosResponse }>
  ) => {
    return {
      status: error.response?.status,
      data: error.response?.data,
    };
  },
};

export default thunkOptions;
