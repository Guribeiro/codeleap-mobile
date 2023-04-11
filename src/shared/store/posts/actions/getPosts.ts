import { action } from 'typesafe-actions'
import { PostsTypes, GetPostsQueryResponse } from '../types'

const {
  GET_POSTS_REQUEST,
  GET_POSTS_REQUEST_FAILURE,
  GET_POSTS_REQUEST_SUCCESS,
} = PostsTypes

export const getPostsRequest = () => {
  return action(GET_POSTS_REQUEST)
}

export const getPostsRequestSuccess = (data: GetPostsQueryResponse) => {
  return action(GET_POSTS_REQUEST_SUCCESS, {
    data,
  })
}

export const getPostsRequestFailure = () => {
  return action(GET_POSTS_REQUEST_FAILURE)
}
