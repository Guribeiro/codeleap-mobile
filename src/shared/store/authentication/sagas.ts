import { call, put } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  LoginRequestPayload,
  UpdateAvatarRequestPayload,
  LoadStoragedAvatarPayload,
} from './types'

import {
  loginRequestFailure,
  loginRequestSuccess,
  logoutRequestFailure,
  logoutRequestSuccess,
  updateAvatarRequestFailure,
  updateAvatarRequestSuccess,
} from './actions'

export interface ErrorResponse {
  message: string
}

export const AUTHENTICATION_STORAGE_KEY = '@codeleap/authentication/username'

interface LoginAction {
  type: string
  payload: LoginRequestPayload
}

interface UpdateAvatarAction {
  type: string
  payload: UpdateAvatarRequestPayload
}

async function storeUsername({ username }: LoginRequestPayload) {
  return AsyncStorage.setItem(AUTHENTICATION_STORAGE_KEY, username)
}

async function removeStoragedUsername() {
  return AsyncStorage.removeItem(AUTHENTICATION_STORAGE_KEY)
}

async function storeUserAvatar({
  image,
  username,
}: UpdateAvatarRequestPayload) {
  return AsyncStorage.setItem(
    `${AUTHENTICATION_STORAGE_KEY}/avatar-${username}`,
    image,
  )
}

async function loadStoredAvatar({ username }: LoadStoragedAvatarPayload) {
  return AsyncStorage.getItem(
    `${AUTHENTICATION_STORAGE_KEY}/avatar-${username}`,
  )
}

export function* login({ payload }: LoginAction) {
  try {
    const { username } = payload

    yield call(storeUsername, { username })

    let avatar: string

    const storedAvatar: string | null = yield call(loadStoredAvatar, {
      username,
    })

    avatar = `https://ui-avatars.com/api/?name=${username}`

    if (storedAvatar) {
      avatar = storedAvatar
    }

    yield put(
      loginRequestSuccess({
        username,
        avatar,
      }),
    )

    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: `Welcome, ${username}`,
      visibilityTime: 2000,
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

export function* logout() {
  try {
    yield call(removeStoragedUsername)

    yield put(logoutRequestSuccess())
  } catch (error) {
    yield put(logoutRequestFailure())

    const { message } = error as ErrorResponse
    Toast.show({
      type: 'error',
      text1: 'Opss! somenthing went wrong',
      text2: message,
    })
  }
}
export function* updateAvatar({ payload }: UpdateAvatarAction) {
  try {
    yield call(storeUserAvatar, payload)

    const { image } = payload

    yield put(updateAvatarRequestSuccess(image))

    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: `Avatar updated successfully`,
      visibilityTime: 2000,
    })
  } catch (error) {
    yield put(updateAvatarRequestFailure())
    const { message } = error as ErrorResponse
    Toast.show({
      type: 'error',
      text1: 'Opss! somenthing went wrong',
      text2: message,
    })
  }
}
