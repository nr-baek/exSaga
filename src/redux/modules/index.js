import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import { all } from 'redux-saga/effects';
import loading from './loading';

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
});

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
