import axios, { AxiosError, AxiosResponse } from "axios";
import ENV_CONFIG from "./env.config";
import { useAuthStore } from "@/features/authentication/stores/auth.store";
import {
  IAxiosResponseFail,
  IAxiosResponseSuccess,
} from "@/types/response.type";

export const axiosBase = axios.create({
  baseURL: ENV_CONFIG.URL_SERVER,
  withCredentials: true,
});

// Add a request interceptor
axiosBase.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosBase.interceptors.response.use(
  // (
  //   response: AxiosResponse<IAxiosResponseSuccess>
  // ): AxiosResponse<IAxiosResponseSuccess> => {
  //   return response;
  // },
  async function (response: AxiosResponse<IAxiosResponseSuccess>) {
    return response;
  },

  async function (error: AxiosError<IAxiosResponseFail>) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;
    const customError = error.response?.data;

    if (error.response?.status === 401 && originalRequest) {
      try {
        // refresh token
        const url = ENV_CONFIG.URL_SERVER + `auth/refresh-token`;
        const response = (await axios.post(
          url,
          {},
          {
            withCredentials: true,
          }
        )) as IAxiosResponseSuccess;

        if (response?.status === 401) {
          await useAuthStore.getState().signout();
          return Promise.reject(customError);
        }

        return axiosBase(originalRequest);
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 401) {
          await useAuthStore.getState().signout();
          return Promise.reject(customError);
        }
      }
    }

    return Promise.reject(customError);
  }
);
