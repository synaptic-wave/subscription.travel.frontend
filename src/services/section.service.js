import { useQuery } from 'react-query'
import { httpRequest } from './httpRequest'

export const sectionService = {
  getSections: (params) => httpRequest.get('v1/promotions/sections', { params })
}

export const useGetSections = ({ params = {}, queryParams = {} } = {}) => {
  return useQuery(
    ['useGetSections', params],
    () => sectionService.getSections(params),
    queryParams
  )
}
