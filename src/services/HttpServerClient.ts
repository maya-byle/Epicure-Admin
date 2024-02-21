import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as constants from "../resources/constants.ts";

// const baseURL = "http://localhost:3001/admin/v1/";
const baseURL =
  "http://ec2-51-20-81-186.eu-north-1.compute.amazonaws.com:3001/admin/v1/";
const token = sessionStorage.getItem(constants.USERTOKEN);
const headers = { token: token };

export const HttpClientService = {
  async post<T>(
    url: string,
    data: unknown,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    return HttpClientService.send<T>({
      ...options,
      url,
      baseURL,
      data,
      method: "post",
      headers: headers,
    });
  },

  async put<T>(
    url: string,
    data: unknown,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    return HttpClientService.send<T>({
      ...options,
      url,
      baseURL,
      data,
      method: "put",
      headers: headers,
    });
  },
  async get<T>(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    return HttpClientService.send<T>({
      ...options,
      url,
      baseURL,
      method: "get",
      headers: headers,
    });
  },

  async delete<T>(
    url: string,
    data: unknown,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    return HttpClientService.send<T>({
      ...options,
      url,
      baseURL,
      data,
      method: "delete",
      headers: headers,
    });
  },

  async patch<T>(
    url: string,
    data: unknown,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    return HttpClientService.send<T>({
      ...options,
      url,
      baseURL,
      data,
      method: "patch",
    });
  },

  async send<T>(
    httpOptions: AxiosRequestConfig
  ): Promise<AxiosResponse<T, any>> {
    httpOptions.headers = {
      ...httpOptions.headers,
    };
    return axios(httpOptions);
  },
};
