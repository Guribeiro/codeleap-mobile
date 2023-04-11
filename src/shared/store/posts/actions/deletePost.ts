import { action } from 'typesafe-actions'
import { PostsTypes, DeletePostRequestPayload } from '../types'

const {
  DELETE_POST_REQUEST,
  DELETE_POST_REQUEST_SUCCESS,
  DELETE_POST_REQUEST_FAILURE,
} = PostsTypes

export const deletePostRequest = (data: DeletePostRequestPayload) => {
  return action(DELETE_POST_REQUEST, data)
}

export const deletePostRequestSuccess = (data: DeletePostRequestPayload) => {
  return action(DELETE_POST_REQUEST_SUCCESS, {
    data,
  })
}

export const deletePostRequestFailure = () => {
  return action(DELETE_POST_REQUEST_FAILURE)
}
