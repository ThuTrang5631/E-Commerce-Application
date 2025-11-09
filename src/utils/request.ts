import axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL, REFRESH_TOKEN, ROUTES } from "./constants";
import { clearToken, getValueFromLocalStorage } from "./handler";

export const request = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error", error);

    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 500) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      localStorage.removeItem(ACCESS_TOKEN);

      try {
        const refreshToken = getValueFromLocalStorage(REFRESH_TOKEN);

        if (refreshToken) {
          const response = await request.post("/auth/refresh", {
            refreshToken,
          });

          if (response?.data) {
            localStorage.setItem(ACCESS_TOKEN, response?.data?.accessToken);

            originalRequest.headers.Authorization = `Bearer ${response?.data?.accessToken}`;
            return request(originalRequest);
          }
        }
      } catch (error) {
        clearToken();
        window.location.href = ROUTES.LOGIN;
      }
    }

    return Promise.reject(error);
  }
);
