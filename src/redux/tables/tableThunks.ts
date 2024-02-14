import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpClientService } from "../../services/HttpServerClient.ts";
import { ApiResponse } from "../../Types/collectionType.ts";
import { transformData } from "../../utils/redux-utils.ts";

export const fetchData = createAsyncThunk(
  `/api/v1/get`,
  async (route: string): Promise<any> => {
    try {
      const response = await HttpClientService.get(route);
      const responseData = response.data as ApiResponse;
      return transformData(responseData.data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const addData = createAsyncThunk(
  `/api/v1/post`,
  async ({ route, item }: { route: string; item: any }): Promise<any> => {
    try {
      const response = await HttpClientService.post(route, item);
      const responseData = response.data as ApiResponse;
      return responseData.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const updateData = createAsyncThunk(
  `/api/v1/put`,
  async ({ route, item }: { route: string; item: any }): Promise<any> => {
    try {
      const response = await HttpClientService.put(route, item);
      const responseData = response.data as ApiResponse;
      return responseData.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const deleteData = createAsyncThunk(
  `/api/v1`,
  async ({ route, item }: { route: string; item: any }): Promise<any> => {
    try {
      const response = await HttpClientService.delete(route, item);
      const responseData = response.data as ApiResponse;
      return responseData.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);