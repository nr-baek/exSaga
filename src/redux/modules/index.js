import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import { all } from 'redux-saga/effects';
import loading from './loading';
import user, { userSaga } from './user';

// const state = {
//   auth: {
//     register: {
//       userId: '',
//       username: '',
//       password: '',
//       passwordConfirm: '',
//     },
//     login: {
//       userId: '',
//       password: '',
//     },
//     auth: null,
//     authError: null,
//   },
//  post: null
// };

const rootReducer = combineReducers({
  auth,
  loading,
  user,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;
