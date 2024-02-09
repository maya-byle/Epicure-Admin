import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpClientService } from "../services/HttpServerClient.ts";

//TODO: fix promises types

export const fetchData = createAsyncThunk(
  `/api/v1/get`,
  async (route: string): Promise<any> => {
    try {
      const response = await HttpClientService.get(route);
      return response.data;
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
      return response.data;
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
      return response.data;
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
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
