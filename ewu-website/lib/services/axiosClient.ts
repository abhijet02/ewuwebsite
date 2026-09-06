import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  timeout: 5 * 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosFormDataClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  timeout: 5 * 60000,
  headers: {
    "Content-Type":
      "multipart/form-data; boundary=--------------------------700715399828023233426788",
    "Apollo-Require-Preflight": "true",
  },
});

export { axiosClient, axiosFormDataClient };
