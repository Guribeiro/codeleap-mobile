import { action } from 'typesafe-actions'
import {
  PostsTypes,
  GetPostsQueryResponse,
  FetchMorePostsRequestPayload,
} from '../types'

const {
  FETCH_MORE_POST_REQUEST,
  FETCH_MORE_POST_REQUEST_FAILURE,
  FETCH_MORE_POST_REQUEST_SUCCESS,
} = PostsTypes

export const fetchMorePostsRequest = (data: FetchMorePostsRequestPayload) => {
  return action(FETCH_MORE_POST_REQUEST, data)
}

export const fetchMorePostsRequestSuccess = (data: GetPostsQueryResponse) => {
  return action(FETCH_MORE_POST_REQUEST_SUCCESS, {
    data,
  })
}

export const fetchMorePostsRequestFailure = () => {
  return action(FETCH_MORE_POST_REQUEST_FAILURE)
}
