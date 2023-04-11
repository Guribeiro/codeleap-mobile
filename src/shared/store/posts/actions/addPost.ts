import { action } from 'typesafe-actions'
import { PostsTypes, AddPostRequestPayload, Post } from '../types'

const { ADD_POST_REQUEST, ADD_POST_REQUEST_FAILURE, ADD_POST_REQUEST_SUCCESS } =
  PostsTypes

export const addPostRequest = (data: AddPostRequestPayload) => {
  return action(ADD_POST_REQUEST, data)
}

export const addPostRequestSuccess = (data: Post) => {
  return action(ADD_POST_REQUEST_SUCCESS, {
    data,
  })
}

export const addPostRequestFailure = () => {
  return action(ADD_POST_REQUEST_FAILURE)
}
