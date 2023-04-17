import { takeLatest } from 'redux-saga/effects'

import { AuthenticationTypes } from './types'

import { login, logout, updateAvatar } from './sagas'

const { AUTHENTICATION_REQUEST, LOGOUT_REQUEST, UPDATE_AVATAR_REQUEST } =
  AuthenticationTypes

const rootSagas = [
  takeLatest(AUTHENTICATION_REQUEST, login),
  takeLatest(LOGOUT_REQUEST, logout),
  takeLatest(UPDATE_AVATAR_REQUEST, updateAvatar),
]

export default rootSagas
