import { call, put } from 'redux-saga/effects';
import { finishLoading, startLoading } from '../redux/modules/loading';
import * as authAPI from './api/auth';

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export function createRegisterSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type));
    console.log(action.payload.id);
    try {
      const check = yield call(authAPI.checkRegister, action.payload.id);
      if (check.data.length === 0) {
        console.log(action.payload);
        yield call(authAPI.register, {
          ...action.payload,
        });
        yield put({
          type: SUCCESS,
          payload: { registerCheck: true },
        });
      } else {
        yield put({
          type: FAILURE,
          payload: { registerCheck: 'overlap' },
        });
      }
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: { registerCheck: 'register fail' },
      });
    }
    yield put(finishLoading(type));
  };
}

export function createLoginSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILUE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type));
    try {
      const response = yield call(authAPI.login, action.payload);
      console.log(response.data[0].id);
      sessionStorage.setItem('token', response.data[0].id);
      yield put({
        type: SUCCESS,
        payload: {
          token: response.data[0].id,
          loginCheck: true,
        },
      });
    } catch (e) {
      yield put({
        type: FAILUE,
        payload: { loginCheck: false },
        // error: e,
      });
    }
    yield put(finishLoading(type));
  };
}

// export function createCheckSaga(type) {
//   const SUCCESS = `${type}_SUCCESS`;
//   const FAILUE = `${type}_FAILURE`;

//   return function* (action) {
//     yield put(startLoading(type));
//     try {
//       const response = yield call(authAPI.check, action.payload);
//       console.log(response.data[0].id);
//       if (response.data[0].id === 0) {
//         return;
//       } else {
//         yield put({
//           type: SUCCESS,
//           payload: response.data[0].token,
//         });
//       }
//     } catch (e) {
//       yield put({
//         type: FAILUE,
//         payload: e,
//         error: true,
//       });
//     }
//     yield put(finishLoading(type));
//   };
// }
