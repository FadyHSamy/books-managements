import axios from "axios";
import querystring from "query-string";

const baseUrl = "http://localhost:3100/";
const getToken = (): string | null => localStorage.getItem("token");

interface CustomParams {
  [key: string]: string | number | boolean;
}

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: (params: CustomParams) => querystring.stringify({ params }),
});

axiosClient.interceptors.request.use(async (config: any) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${getToken()}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    return Promise.reject(err.response);
  }
);

export default axiosClient;
