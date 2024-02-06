import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { booksGenreResponse } from "../models/books/genre";

const bookApi = {
  getBooksGenre: async (): Promise<booksGenreResponse[]> => {
    try {
      const response = await axiosClient.get<{ data: booksGenreResponse[] }>("book/getAllBookGenre");
      console.log(response.data);
      return response.data.data;
    } catch (err) {
      const error = err as AxiosResponse;
      throw error.data.error;
    }
  },
};

export default bookApi;
