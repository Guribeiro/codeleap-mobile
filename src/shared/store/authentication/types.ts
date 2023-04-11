/* eslint-disable no-unused-vars */
export enum AuthenticationTypes {
  AUTHENTICATION_REQUEST = `AUTHENTICATION_REQUEST`,
  AUTHENTICATION_REQUEST_SUCCESS = `AUTHENTICATION_REQUEST_SUCCESS`,
  AUTHENTICATION_REQUEST_FAILURE = `AUTHENTICATION_REQUEST_FAILURE`,

  LOGOUT_REQUEST = `LOGOUT_REQUEST`,
  LOGOUT_REQUEST_SUCCESS = `LOGOUT_REQUEST_SUCCESS`,
  LOGOUT_REQUEST_FAILURE = `LOGOUT_REQUEST_FAILURE`,
}

export interface LoginRequestPayload {
  username: string
}

export interface User {
  username: string
}

export interface Authentication {
  username: string
}

export interface AuthenticationAction {
  type: keyof typeof AuthenticationTypes
  payload: {
    data: any
  }
}

export interface AuthenticationState {
  readonly data: Authentication
  readonly loading: boolean
  readonly error: boolean
}
