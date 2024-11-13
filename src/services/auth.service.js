import { useMutation, useQuery } from 'react-query'
import { httpRequest } from './httpRequest'

const service = {
  register: (data) => httpRequest.post('v1/auth/register', data),
  deleteUser: (data) => httpRequest.delete('v1/auth/delete-account', data),
  loginOAuth: (data) => httpRequest.post('v1/auth/login/oauth', data),
  registerOAuth: (data) => httpRequest.post('v1/auth/register', data),
  resetPassword: (data, params) =>
    httpRequest.post('v1/auth/reset-password', data, {
      params
    }),
  forgotPassword: (data) => httpRequest.post('v1/auth/forgot-password', data),
  verifyEmail: (params, headers) =>
    httpRequest.get('v1/auth/verify-email-with-otp', {
      params,
      headers
    }),
  verifyEmailWithToken: (params) =>
    httpRequest.get('v1/auth/verify-email', {
      params
    }),
  resendEmail: (data) =>
    httpRequest.post('v1/auth/re-send-verification-email', data),
  login: (data) => httpRequest.post('v1/auth/login', data),
  updateProfile: (data) => httpRequest.post('v1/auth/update-profile', data),
  logout: (data, headers) =>
    httpRequest.post('v1/auth/logout', data, {
      headers
    }),
  getProfile: (params) => httpRequest.get('v1/auth/profile', { params }),
  sendVerificationEmail: (headers) =>
    httpRequest.get('v1/auth/send-verification-email', {
      headers: {
        ...headers
      }
    })
}

export const useRegister = ({ queryProps } = {}) => {
  return useMutation(service.register, queryProps)
}

export const useDeleteUser = ({ queryProps } = {}) => {
  return useMutation(service.deleteUser, queryProps)
}

export const useForgotPassword = ({ queryProps } = {}) => {
  return useMutation(service.forgotPassword, queryProps)
}

export const useUpdateProfile = ({ queryProps } = {}) => {
  return useMutation(service.updateProfile, queryProps)
}

export const useResetPassword = ({ queryProps, params } = {}) => {
  return useMutation((data) => service.resetPassword(data, params), queryProps)
}

export const useVerifyEmail = ({ queryParams, params, headers } = {}) => {
  return useQuery(
    ['VERIFY_EMAIL', params, headers],
    () => service.verifyEmail(params, headers),
    queryParams
  )
}

export const useProfile = ({ queryParams, params, key } = {}) => {
  return useQuery(
    ['GET_PROFILE', params, key],
    () => service.getProfile(params),
    queryParams
  )
}

export const useVerifyEmailWithToken = ({ queryParams, params } = {}) => {
  return useQuery(
    ['VERIFY_EMAIL_WITH_TOKEN', params],
    () => service.verifyEmailWithToken(params),
    queryParams
  )
}

export const useLogin = ({ queryParams } = {}) => {
  return useMutation(service.login, queryParams)
}

export const useOAuthLogin = ({ queryParams } = {}) => {
  return useMutation(service.loginOAuth, queryParams)
}

export const useOAuthRegister = ({ queryParams } = {}) => {
  return useMutation(service.registerOAuth, queryParams)
}

export const useLogout = ({ queryParams, headers } = {}) => {
  return useMutation((data) => service.logout(data, headers), queryParams)
}

export const useSendVerificationEmail = ({ headers, queryParams } = {}) => {
  return useQuery(
    ['SEND_VERIFICATION_EMAIL', headers],
    () => service.sendVerificationEmail(headers),
    queryParams
  )
}

export const useResendEmail = ({ queryParams } = {}) => {
  return useMutation(service.resendEmail, queryParams)
}
