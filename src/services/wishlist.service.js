import { useMutation, useQuery } from "react-query";
import { httpRequest } from "./httpRequest";

export const service = {
  add: (data) => httpRequest.post("v1/booking/wishlist/add-item", data),
  update: (data) => httpRequest.put("v1/booking/wishlist/update", data),
  getList: () => httpRequest.get("v1/booking/wishlist/list")
};

export const useAddWishlist = () => {
  return useMutation((data) => service.add(data));
};

export const useUpdateWishlist = () => {
  return useMutation((data) => service.update(data));
};

export const useWishList = ({ params = {}, queryParams = {} } = {}) => {
  return useQuery(
    ["GET_WISH_LIST", params],
    () => service.getList(params),
    queryParams
  );
};
