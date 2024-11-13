import { useQuery } from "react-query";
import { httpRequest } from "./httpRequest";

export const tripAdvisorServices = {
  getHotelReviews: (code, params) =>
    httpRequest.get(`v1/content/tripadvisor/location-reviews/${code}`, {
      params
    }),
  getNearestObjects: (params) =>
    httpRequest.get(`v1/content/tripadvisor/location-search`, {
      params
    }),
  getLocationDetails: (locationId, params) =>
    httpRequest.get(`v1/content/tripadvisor/location-details/${locationId}`, {
      params
    }),
  getLocationPhotos: (locationId, params) =>
    httpRequest.get(`v1/content/tripadvisor/location-photos/${locationId}`, {
      params
    }),
  getNearbyPlaces: (params) =>
    httpRequest.get(`v1/content/tripadvisor/nearby-locations`, {
      params
    })
};

export const useGetHotelReviews = ({ params = {}, queryParams = {}, code }) => {
  return useQuery(
    ["GET_HOTEL_REVIEWS", code, params],
    () => tripAdvisorServices.getHotelReviews(code, params),
    {
      ...queryParams
    }
  );
};

export const useGetNearestObjects = ({ params = {}, queryParams = {} }) => {
  return useQuery(
    ["GET_NEAREST_OBJECTS", params],
    () => tripAdvisorServices.getNearestObjects(params),
    {
      ...queryParams
    }
  );
};

export const useGetNearbyPlaces = ({ params = {}, queryParams = {} }) => {
  return useQuery(
    ["GET_NEARBY_PLACES", params],
    () => tripAdvisorServices.getNearbyPlaces(params),
    queryParams
  );
};

export const useGetLocationDetails = ({
  params = {},
  queryParams = {},
  locationId
}) => {
  return useQuery(
    ["GET_LOCATION_DETAILS", params, locationId],
    () => tripAdvisorServices.getLocationDetails(locationId, params),
    {
      ...queryParams
    }
  );
};
