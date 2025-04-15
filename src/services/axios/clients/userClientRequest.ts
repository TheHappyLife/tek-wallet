import axios from "axios";

let currentAccessToken = "";

const userClientRequest = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_TEK_WALLET_SERVER_URL}`,
  timeout: 600000,
  headers: {
    "app-slug": process.env.NEXT_PUBLIC_TEK_WALLET_APP_SLUG || "",
  },
});

export const setAuthToken = (token: string) => {
  currentAccessToken = token;
};

userClientRequest.interceptors.request.use(
  (config) => {
    if (currentAccessToken) {
      config.headers.Authorization = `Bearer ${currentAccessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default userClientRequest;
