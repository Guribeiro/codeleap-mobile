import { action } from 'typesafe-actions'
import {
  AuthenticationTypes,
  LoginRequestPayload,
  Authentication,
} from '../types'

const {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_REQUEST_SUCCESS,
  AUTHENTICATION_REQUEST_FAILURE,
} = AuthenticationTypes

export const loginRequest = (data: LoginRequestPayload) => {
  return action(AUTHENTICATION_REQUEST, data)
}

export const loginRequestSuccess = (data: Authentication) => {
  return action(AUTHENTICATION_REQUEST_SUCCESS, {
    data,
  })
}

export const loginRequestFailure = () => {
  return action(AUTHENTICATION_REQUEST_FAILURE)
}
