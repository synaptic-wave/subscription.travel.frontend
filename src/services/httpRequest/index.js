import { authActions } from "@/store/auth/auth.slice";
import { store } from "@/store/index";
import generateSignature from "@/utils/generateSignature";
import axios from "axios";
import { toast } from "react-toastify";

const pathsWithToken = [
  "v1/booking/pre-booking-request",
  "v1/booking/pre-booking-request-by-id",
  "v1/booking/check-booking-status",
  "v1/payment/transaction",
  "v1/booking/cancelReq",
  "v1/auth/profile",
  "v1/booking/cart-list",
  "v1/booking/cart/add-item",
  "v1/booking/cart/update",
  "v1/booking/wishlist/add-item",
  "v1/booking/wishlist/update",
  "v1/booking/wishlist/list",
  "v1/auth/update-profile",
  "v1/auth/delete-account",
  "v1/booking/booking-history",
  "v1/booking/booking-history-detail",
  "v1/promotions/promocodes/membership"
];

export const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 20000
});

const errorHandler = (error) => {
  if (
    error?.response?.data?.code === 5003 &&
    error?.response?.data?.data === "UNAUTHORIZED ACCESS"
  ) {
    store.dispatch(authActions.logout());
    // window.location.replace("/");
  }

  // if (error?.response?.data?.data['soap:Envelope']) {
  //   const message =
  //     error?.response?.data?.data['soap:Envelope']['soap:Body']
  //       .HotelAvailResponse.AvailabilityRS.Errors.Error.attributes.Text
  //   toast.error(message)
  // } else {
  // toast.error(error?.response?.data?.message || error?.response?.data?.data)
  // }

  // Sentry.captureException(error.message)

  return Promise.reject(error.response);
};

httpRequest.interceptors.request.use((config) => {
  const state = store.getState();

  if (
    !config.headers.Authorization &&
    state.auth.user &&
    pathsWithToken.some((tokenPath) => config.url.includes(tokenPath))
  ) {
    config.headers.Authorization = `Bearer ${state.auth.user.tokens?.access?.token}`;
  }

  const signature = generateSignature();
  config.headers["x-api-key"] = import.meta.env.VITE_API_KEY;
  config.headers["x-api-secret"] = signature.key;
  config.headers["x-timestamp"] = signature.timestamp;
  // config.headers.apikey = import.meta.env.VITE_API_KEY
  // config.headers.apisecret = signature.key
  // config.headers.timestamp = signature.timestamp
  return config;
});

httpRequest.interceptors.response.use(
  (response) => response.data.data,
  errorHandler
);
