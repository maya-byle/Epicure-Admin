import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpClientService } from "../../services/HttpServerClient.ts";
import { ApiResponse } from "../../Types/collectionType.ts";
import { transformData } from "../../utils/redux-utils.ts";

export const fetchData = createAsyncThunk(
  `/admin/v1/get`,
  async (route: string): Promise<any> => {
    try {
      const response = await HttpClientService.get(route);
      const responseData = response.data as ApiResponse;
      return transformData(responseData.data);
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const addData = createAsyncThunk(
  `/admin/v1/post`,
  async ({ route, item }: { route: string; item: any }): Promise<any> => {
    try {
      const response = await HttpClientService.post(route, item);
      const responseData = response.data as ApiResponse;
      return responseData.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const updateData = createAsyncThunk(
  `/admin/v1/put`,
  async ({ route, item }: { route: string; item: any }): Promise<any> => {
    try {
      const response = await HttpClientService.put(route, item);
      const responseData = response.data as ApiResponse;
      return responseData.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const deleteData = createAsyncThunk(
  `/admin/v1`,
  async ({ route, item }: { route: string; item: any }): Promise<any> => {
    try {
      const response = await HttpClientService.delete(route, item);
      const responseData = response.data as ApiResponse;
      return responseData.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const login = createAsyncThunk(
  `/admin/v1/login`,
  async ({ route, item }: { route: string; item: any }): Promise<any> => {
    try {
      const response = await HttpClientService.post(route, item);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getChefsList = createAsyncThunk(
  `/admin/v1/getChefsList`,
  async (route: string): Promise<any> => {
    try {
      const response = await HttpClientService.get(route);
      const responseData = response.data as ApiResponse;
      return responseData.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);
