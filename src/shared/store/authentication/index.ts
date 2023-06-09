import { Reducer } from 'redux'
import {
  AuthenticationState,
  AuthenticationAction,
  Authentication,
  AuthenticationTypes,
} from './types'

const {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_REQUEST_FAILURE,
  AUTHENTICATION_REQUEST_SUCCESS,

  LOGOUT_REQUEST,
  LOGOUT_REQUEST_FAILURE,
  LOGOUT_REQUEST_SUCCESS,

  UPDATE_AVATAR_REQUEST,
  UPDATE_AVATAR_REQUEST_FAILURE,
  UPDATE_AVATAR_REQUEST_SUCCESS,
} = AuthenticationTypes

const INITIAL_STATE: AuthenticationState = {
  data: {} as Authentication,
  error: false,
  loading: false,
}

const reducer: Reducer<AuthenticationState, AuthenticationAction> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      return { ...state, loading: true }
    case AUTHENTICATION_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      }
    case AUTHENTICATION_REQUEST_FAILURE:
      return { loading: false, error: true, data: {} as Authentication }
    case LOGOUT_REQUEST:
      return { ...state, loading: true, error: false }
    case LOGOUT_REQUEST_FAILURE:
      return { ...state, loading: false, error: true }
    case LOGOUT_REQUEST_SUCCESS:
      return { loading: false, error: false, data: {} as Authentication }
    case UPDATE_AVATAR_REQUEST:
      return { ...state, loading: true, error: false }
    case UPDATE_AVATAR_REQUEST_FAILURE:
      return { ...state, loading: false, error: true }
    case UPDATE_AVATAR_REQUEST_SUCCESS:
      return {
        loading: false,
        error: false,
        data: { ...state.data, avatar: action.payload.data },
      }
    default:
      return state
  }
}

export default reducer
