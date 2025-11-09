import { request } from "../../utils/request";

export const getCartByUser = async (id: number) => {
  return request.get(`/carts/user/${id}`);
};
