// src/lib/ApiClient.ts
import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./base-url";

const axiosInstance = axios.create({
  baseURL: BASE_URL, // ganti sesuai API kamu
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiClientMutation = async <T>(config: AxiosRequestConfig): Promise<T | { error: any }> => {
  try {
    const res = await axiosInstance(config);
    return res.data
  } catch (err: any) {
    const message =
      err.response?.data?.message ||
      err.message ||
      "Terjadi kesalahan saat menghubungi server";
    return { error: message };
  }
  
};
export const ApiClientFetch = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const res = await axiosInstance(config);
    return res.data
  } catch (err: any) {
    throw err
  }
  
};
