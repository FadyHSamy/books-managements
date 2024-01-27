import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { loginRequestModel, loginResponseModel } from "../models/auth/login";
import { signUpRequestModel, signUpResponseModel } from "../models/auth/signUp";
import { verifyTokenResponseModal } from "../models/auth/verifyToken";

const authApi = {
  signUp: async (params: signUpRequestModel): Promise<signUpResponseModel> => {
    try {
      const response = await axiosClient.post<signUpResponseModel>("auth/register", params);
      return response.data;
    } catch (err) {
      const error = err as AxiosResponse;
      throw error.data.error;
    }
  },
  login: async (params: loginRequestModel): Promise<loginResponseModel> => {
    try {
      const response = await axiosClient.post<loginResponseModel>("auth/login", params);
      return response.data;
    } catch (err) {
      const error = err as AxiosResponse;
      throw error.data.error;
    }
  },
  verifyToken: async (token: string): Promise<verifyTokenResponseModal> => {
    try {
      const response = await axiosClient.post<verifyTokenResponseModal>("auth/verify-token", {
        token: token,
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosResponse;
      throw error.data.error;
    }
  },
};

export default authApi;
