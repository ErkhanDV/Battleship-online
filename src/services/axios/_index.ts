import axios, { InternalAxiosRequestConfig } from "axios";
import { CLONE_SERVER } from "./_constants";

export const axiosAPI = axios.create({
  withCredentials: true,
  baseURL: CLONE_SERVER,
});

axiosAPI.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  }
);
