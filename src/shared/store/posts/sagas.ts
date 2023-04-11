import { call, put } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import { errorHandler } from '@shared/utils/error-handler'
import { api } from '@shared/services/api'

import {
  GetPostsQueryResponse,
  AddPostRequestPayload,
  UpdatePostRequestPayload,
  DeletePostRequestPayload,
  Post,
} from './types'

import {
  getPostsRequestFailure,
  getPostsRequestSuccess,
  addPostRequestFailure,
  addPostRequestSuccess,
  updatePostRequestFailure,
  updatePostRequestSuccess,
  deletePostRequestFailure,
  deletePostRequestSuccess,
} from './actions'
import { AxiosResponse } from 'axios'

export interface ErrorResponse {
  message: string
}

interface AddPostAction {
  type: string
  payload: AddPostRequestPayload
}

interface UpdatePostAction {
  type: string
  payload: UpdatePostRequestPayload
}

interface DeletePostAction {
  type: string
  payload: DeletePostRequestPayload
}

async function apiGetPosts() {
  return api.get('/careers')
}

async function apiAddPost({ username, content, title }: AddPostRequestPayload) {
  return api.post('/careers/', {
    username,
    content,
    title,
  })
}

async function apiUpdatePost({ id, content, title }: UpdatePostRequestPayload) {
  return api.patch(`/careers/${id}/`, {
    content,
    title,
  })
}

async function apiDeletePost({ id }: DeletePostRequestPayload) {
  return api.delete(`/careers/${id}/`)
}

export function* getPosts() {
  try {
    const { data }: AxiosResponse<GetPostsQueryResponse> = yield call(
      apiGetPosts,
    )

    yield put(getPostsRequestSuccess(data))
  } catch (error) {
    const message = errorHandler(error)
    Toast.show({
      type: 'error',
      text1: 'Opss! somenthing went wrong',
      text2: message,
    })
    yield put(getPostsRequestFailure())
  }
}

export function* addPost({ payload }: AddPostAction) {
  try {
    const { data }: AxiosResponse<Post> = yield call(apiAddPost, payload)

    console.log({ data })

    yield put(addPostRequestSuccess(data))

    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: `Post created successfully`,
    })
  } catch (error) {
    const message = errorHandler(error)
    Toast.show({
      type: 'error',
      text1: 'Opss! somenthing went wrong',
      text2: message,
    })
    yield put(addPostRequestFailure())
  }
}

export function* updatePost({ payload }: UpdatePostAction) {
  try {
    const { data }: AxiosResponse<Post> = yield call(apiUpdatePost, payload)

    yield put(updatePostRequestSuccess(data))

    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: `Post updated successfully`,
    })
  } catch (error) {
    const message = errorHandler(error)
    Toast.show({
      type: 'error',
      text1: 'Opss! somenthing went wrong',
      text2: message,
    })
    yield put(updatePostRequestFailure())
  }
}
export function* deletePost({ payload }: DeletePostAction) {
  try {
    const { id } = payload
    yield call(apiDeletePost, payload)

    yield put(
      deletePostRequestSuccess({
        id,
      }),
    )

    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: `Post deleted successfully`,
    })
  } catch (error) {
    const message = errorHandler(error)
    Toast.show({
      type: 'error',
      text1: 'Opss! somenthing went wrong',
      text2: message,
    })
    yield put(deletePostRequestFailure())
  }
}
