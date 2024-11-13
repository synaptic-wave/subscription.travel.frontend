import { useMutation, useQuery } from "react-query";
import { httpRequest } from "./httpRequest";

export const promocodeService = {
  generateSingle: (data) => httpRequest.post("v1/promotions/promocodes", data),
  generateSingle: (data) => httpRequest.post("v1/promotions/promocodes", data),
  getUserLatestPromocode: (id) =>
    httpRequest.get(`v1/promotions/promocodes/membership/${id}`),
  getPromocodeTypeById: (id, params) =>
    httpRequest.get(`v1/promotions/promocode-types/${id}`, {
      params
    }),
  checkPromocode: (id, params) =>
    httpRequest.get(`v1/promotions/promocodes/get-code/${id}`, {
      params
    })
};

export const useGeneratePromocode = ({ queryParams = {} } = {}) => {
  return useMutation(promocodeService.generateSingle, queryParams);
};

export const useGetPromocodeTypesById = ({ id, params = {}, queryParams }) => {
  return useQuery(
    ["useGetPromocodeTypesById", { id, ...params }],
    () => promocodeService.getPromocodeTypeById(id, params),
    queryParams
  );
};

export const useCheckPromocode = ({ id, params = {}, queryParams }) => {
  return useQuery(
    ["useCheckPromocode", { id, ...params }],
    () => promocodeService.checkPromocode(id, params),
    queryParams
  );
};

export const useGetLatestUsedPromocode = ({ id, queryParams } = {}) => {
  return useQuery(
    ["GET_LATEST_USED_PROMOCODE", id],
    () => promocodeService.getUserLatestPromocode(id),
    queryParams
  );
};
