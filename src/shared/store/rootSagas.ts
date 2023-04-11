import { all } from 'redux-saga/effects'

import authenticationRootSaga from '@shared/store/authentication/rootSaga'
import postsRootSaga from '@shared/store/posts/rootSaga'

export default function* rootSaga() {
  yield all([...authenticationRootSaga, ...postsRootSaga])
}
