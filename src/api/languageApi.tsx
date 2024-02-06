import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { getAllLanguagesResponse } from "../models/languages/languages";

const languagesApi = {
  getAllLanguages: async (): Promise<{ data: getAllLanguagesResponse[] }> => {
    try {
      const response = await axiosClient.get<{ data: getAllLanguagesResponse[] }>("language/getAllLanguage");
      return response.data;
    } catch (err) {
      const error = err as AxiosResponse;
      throw error.data.error;
    }
  },
};

export default languagesApi;
