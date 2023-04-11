import { takeLatest } from 'redux-saga/effects'

import { AuthenticationTypes } from './types'

import { login } from './sagas'

const { AUTHENTICATION_REQUEST } = AuthenticationTypes

const rootSagas = [takeLatest(AUTHENTICATION_REQUEST, login)]

export default rootSagas
