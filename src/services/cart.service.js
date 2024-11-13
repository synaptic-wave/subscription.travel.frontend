import { useMutation, useQuery } from 'react-query'
import { httpRequest } from './httpRequest'

export const service = {
  add: (data) => httpRequest.post('v1/booking/cart/add-item', data),
  update: (data) => httpRequest.put('v1/booking/cart/update', data),
  getList: () => httpRequest.get('v1/booking/cart-list')
}

export const useAddCart = () => {
  return useMutation((data) => service.add(data))
}

export const useUpdateCart = () => {
  return useMutation((data) => service.update(data))
}

export const useCartList = ({ params = {}, queryParams = {} } = {}) => {
  return useQuery(
    ['GET_CART_LIST', params],
    () => service.getList(params),
    queryParams
  )
}
