import { action } from 'typesafe-actions'
import { PostsTypes, UpdatePostRequestPayload, Post } from '../types'

const {
  UPDATE_POST_REQUEST,
  UPDATE_POST_REQUEST_FAILURE,
  UPDATE_POST_REQUEST_SUCCESS,
} = PostsTypes

export const updatePostRequest = (data: UpdatePostRequestPayload) => {
  return action(UPDATE_POST_REQUEST, data)
}

export const updatePostRequestSuccess = (data: Post) => {
  return action(UPDATE_POST_REQUEST_SUCCESS, {
    data,
  })
}

export const updatePostRequestFailure = () => {
  return action(UPDATE_POST_REQUEST_FAILURE)
}
