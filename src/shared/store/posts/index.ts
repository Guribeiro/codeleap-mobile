/* eslint-disable no-case-declarations */
import { Reducer } from 'redux'
import {
  PostsState,
  PostsAction,
  PostsTypes,
  GetPostsQueryResponse,
} from './types'

const {
  GET_POSTS_REQUEST,
  GET_POSTS_REQUEST_FAILURE,
  GET_POSTS_REQUEST_SUCCESS,

  ADD_POST_REQUEST,
  ADD_POST_REQUEST_FAILURE,
  ADD_POST_REQUEST_SUCCESS,

  UPDATE_POST_REQUEST,
  UPDATE_POST_REQUEST_FAILURE,
  UPDATE_POST_REQUEST_SUCCESS,

  DELETE_POST_REQUEST,
  DELETE_POST_REQUEST_FAILURE,
  DELETE_POST_REQUEST_SUCCESS,
} = PostsTypes

const INITIAL_STATE: PostsState = {
  data: {} as GetPostsQueryResponse,
  error: false,
  loading: false,
}

const reducer: Reducer<PostsState, PostsAction> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return { ...state, loading: true }
    case GET_POSTS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      }
    case GET_POSTS_REQUEST_FAILURE:
      return { ...state, loading: false, error: true }
    case ADD_POST_REQUEST:
      return { ...state, loading: true }
    case ADD_POST_REQUEST_SUCCESS:
      return {
        loading: false,
        error: false,
        data: {
          ...state.data,
          results: [action.payload.data, ...state.data.results],
        },
      }
    case ADD_POST_REQUEST_FAILURE:
      return { ...state, loading: false, error: true }
    case UPDATE_POST_REQUEST:
      return { ...state, loading: true }
    case UPDATE_POST_REQUEST_SUCCESS:
      const resultsList = [...state.data.results]
      const findUpdatedIndex = resultsList.findIndex(
        (post) => post.id === action.payload.data.id,
      )
      resultsList[findUpdatedIndex] = action.payload.data
      return {
        loading: false,
        error: false,
        data: {
          ...state.data,
          results: resultsList,
        },
      }
    case UPDATE_POST_REQUEST_FAILURE:
      return { ...state, loading: false, error: true }
    case DELETE_POST_REQUEST:
      return { ...state, loading: true }
    case DELETE_POST_REQUEST_SUCCESS:
      return {
        loading: false,
        error: false,
        data: {
          ...state.data,
          results: state.data.results.filter(
            (result) => result.id !== action.payload.data.id,
          ),
        },
      }
    case DELETE_POST_REQUEST_FAILURE:
      return { ...state, loading: false, error: true }
    default:
      return state
  }
}

export default reducer
