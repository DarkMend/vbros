import axios, { CreateAxiosDefaults } from "axios";
import Cookies from "js-cookie";
import { removeToken } from "../utils/helpers/removeToken";

const URL = import.meta.env.VITE_APP_URL_API;

const options: CreateAxiosDefaults = {
  baseURL: URL,
  withCredentials: true,
};

export const axiosClassic = axios.create(options);

export const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosWithAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401) {
      removeToken();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
