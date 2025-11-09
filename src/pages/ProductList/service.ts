import { request } from "../../utils/request";

export const searchList = (params: any) => {
  return request.get("/products/search", { params });
};

export const getlistProducts = (params: any) => {
  return request.get("/products", { params });
};

export const addToCart = (data: any) => {
  return request.post("/carts/add", data);
};
