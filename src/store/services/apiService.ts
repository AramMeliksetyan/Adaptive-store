import axios from "axios";
import toast from "react-hot-toast";
import { ELocalStorage } from "../config/constants";

export const api = axios.create({
  responseType: "json",
});

api.interceptors.request.use(
  async (config: any) => {
    config.headers = {
      "Content-Type": "application/json",
      ...config.headers,

      Authorization: localStorage.getItem(ELocalStorage.token),
    };
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (err) => {
    if (err.response.status === 401) {
      // localStorage.removeItem(LStorage.AUTH);
      // window.location.href = "/login";
    }

    const errorMessage: string = err?.response?.data?.message;

    return new Promise(async (_, reject) => {
      if (err?.response?.data?.message) {
        toast.error(errorMessage);
        reject(err);
      } else {
        toast.error("SMT Went Wrong");
        reject(err);
      }
    });
  }
);
