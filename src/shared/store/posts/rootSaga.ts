import { takeLatest } from 'redux-saga/effects'

import { PostsTypes } from './types'

import {
  getPosts,
  addPost,
  updatePost,
  deletePost,
  fetchMorePosts,
} from './sagas'

const {
  GET_POSTS_REQUEST,
  ADD_POST_REQUEST,
  UPDATE_POST_REQUEST,
  DELETE_POST_REQUEST,
  FETCH_MORE_POST_REQUEST,
} = PostsTypes

const rootSagas = [
  takeLatest(GET_POSTS_REQUEST, getPosts),
  takeLatest(ADD_POST_REQUEST, addPost),
  takeLatest(UPDATE_POST_REQUEST, updatePost),
  takeLatest(DELETE_POST_REQUEST, deletePost),
  takeLatest(FETCH_MORE_POST_REQUEST, fetchMorePosts),
]

export default rootSagas
