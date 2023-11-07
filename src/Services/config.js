import axios from "axios";

import { store } from "../Redux/store";
import { localServices } from "./localServices";
import {
  handleLoadingOff,
  handleLoadingOn,
} from "../Redux/spinnerSlice/spinnerSlice";

export const BASE_URL = "https://elearningnew.cybersoft.edu.vn";
export const TOKEN_CYBER =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOCIsIkhldEhhblN0cmluZyI6IjIxLzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxMDk3OTIwMDAwMCIsIm5iZiI6MTY4NzE5NDAwMCwiZXhwIjoxNzExMTI2ODAwfQ.I9iDnvUJNQaG_RBPSODU3vvlNF0JJ7lRamr221wclIQ";

export const configHeader = () => {
  return { TokenCybersoft: TOKEN_CYBER };
};

// axios instance
export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBER,
    Authorization: "Bearer " + localServices.get()?.accessToken,
  },
});

// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    store.dispatch(handleLoadingOn());
    console.log("api đi");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    setTimeout(() => {
      store.dispatch(handleLoadingOff());
    }, 2000);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("api về");

    return response;
  },
  function (error) {
    setTimeout(() => {
      store.dispatch(handleLoadingOff());
    }, 2000);

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);