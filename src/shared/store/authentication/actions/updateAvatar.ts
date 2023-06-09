import { action } from 'typesafe-actions'
import { AuthenticationTypes, UpdateAvatarRequestPayload } from '../types'

const {
  UPDATE_AVATAR_REQUEST,
  UPDATE_AVATAR_REQUEST_FAILURE,
  UPDATE_AVATAR_REQUEST_SUCCESS,
} = AuthenticationTypes

export const updateAvatarRequest = (data: UpdateAvatarRequestPayload) => {
  return action(UPDATE_AVATAR_REQUEST, data)
}

export const updateAvatarRequestSuccess = (data: string) => {
  return action(UPDATE_AVATAR_REQUEST_SUCCESS, { data })
}

export const updateAvatarRequestFailure = () => {
  return action(UPDATE_AVATAR_REQUEST_FAILURE)
}
