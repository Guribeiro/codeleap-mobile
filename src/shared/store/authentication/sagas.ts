import { call, put } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { LoginRequestPayload } from './types'

import { loginRequestFailure, loginRequestSuccess } from './actions'

export interface ErrorResponse {
  message: string
}

export const AUTHENTICATION_STORAGE_KEY = '@authentication/username'

interface LoginAction {
  type: string
  payload: LoginRequestPayload
}

async function storeUsername({ username }: LoginRequestPayload) {
  return AsyncStorage.setItem(AUTHENTICATION_STORAGE_KEY, username)
}

export function* login({ payload }: LoginAction) {
  try {
    const { username } = payload

    yield call(storeUsername, { username })

    yield put(
      loginRequestSuccess({
        username,
      }),
    )

    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: `Welcome, ${username}`,
    })
  } catch (error) {
    yield put(loginRequestFailure())

    const { message } = error as ErrorResponse
    Toast.show({
      type: 'error',
      text1: 'Opss! somenthing went wrong',
      text2: message,
    })
  }
}
