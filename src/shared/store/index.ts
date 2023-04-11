import { configureStore, Store } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import rootSaga from './rootSagas'

import { AuthenticationState } from './authentication/types'
import { PostsState } from './posts//types'

const sagaMiddleware = createSagaMiddleware()

export interface ApplicationState {
  authentication: AuthenticationState
  posts: PostsState
}

const store: Store<ApplicationState> = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddlewares) {
    return getDefaultMiddlewares().concat(sagaMiddleware)
  },
})

sagaMiddleware.run(rootSaga)

export default store
