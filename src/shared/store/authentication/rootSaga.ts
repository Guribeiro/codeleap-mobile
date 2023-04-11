import { takeLatest } from 'redux-saga/effects'

import { AuthenticationTypes } from './types'

import { login, logout } from './sagas'

const { AUTHENTICATION_REQUEST, LOGOUT_REQUEST } = AuthenticationTypes

const rootSagas = [
  takeLatest(AUTHENTICATION_REQUEST, login),
  takeLatest(LOGOUT_REQUEST, logout),
]

export default rootSagas
