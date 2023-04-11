/* eslint-disable no-unused-vars */
export enum PostsTypes {
  GET_POSTS_REQUEST = `GET_POSTS_REQUEST`,
  GET_POSTS_REQUEST_SUCCESS = `GET_POSTS_REQUEST_SUCCESS`,
  GET_POSTS_REQUEST_FAILURE = `GET_POSTS_REQUEST_FAILURE`,

  ADD_POST_REQUEST = `ADD_POST_REQUEST`,
  ADD_POST_REQUEST_SUCCESS = `ADD_POST_REQUEST_SUCCESS`,
  ADD_POST_REQUEST_FAILURE = `ADD_POST_REQUEST_FAILURE`,

  UPDATE_POST_REQUEST = `UPDATE_POST_REQUEST`,
  UPDATE_POST_REQUEST_SUCCESS = `UPDATE_POST_REQUEST_SUCCESS`,
  UPDATE_POST_REQUEST_FAILURE = `UPDATE_POST_REQUEST_FAILURE`,

  DELETE_POST_REQUEST = `DELETE_POST_REQUEST`,
  DELETE_POST_REQUEST_SUCCESS = `DELETE_POST_REQUEST_SUCCESS`,
  DELETE_POST_REQUEST_FAILURE = `DELETE_POST_REQUEST_FAILURE`,

  FETCH_MORE_POST_REQUEST = `FETCH_MORE_POST_REQUEST`,
  FETCH_MORE_POST_REQUEST_SUCCESS = `FETCH_MORE_POST_REQUEST_SUCCESS`,
  FETCH_MORE_POST_REQUEST_FAILURE = `FETCH_MORE_POST_REQUEST_FAILURE`,
}

export interface PostsAction {
  type: keyof typeof PostsTypes
  payload: {
    data: any
  }
}

export interface Post {
  id: number
  title: string
  content: string
  username: string
  created_datetime: Date
}

export interface GetPostsQueryResponse {
  count: number
  next: string | null
  previous: string | null
  results: Post[]
}

export interface AddPostRequestPayload {
  title: string
  content: string
  username: string
}

export interface UpdatePostRequestPayload {
  id: number
  title: string
  content: string
}

export interface DeletePostRequestPayload {
  id: number
}
export interface FetchMorePostsRequestPayload {
  next: string
}

export interface PostsState {
  readonly data: GetPostsQueryResponse
  readonly loading: boolean
  readonly error: boolean
}
