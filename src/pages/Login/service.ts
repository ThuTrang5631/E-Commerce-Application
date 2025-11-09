import { request } from "../../utils/request";

export const login = (body: any) => {
  return request.post("/auth/login", body);
};

export const getCurrentUser = () => {
  return request.get("/auth/me");
};
