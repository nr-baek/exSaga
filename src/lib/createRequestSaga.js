import { call, put } from 'redux-saga/effects';
import { finishLoading, startLoading } from '../redux/modules/loading';
import * as authAPI from './api/auth';

// 토큰 생성 함수
const createToken = () => {
  return Math.random() * 10000;
  //Math.ceil(createToken());
};

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export function createRegisterSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILUE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type));
    console.log(action.payload.userId);
    try {
      const check = yield call(authAPI.checkRegister, action.payload.userId);
      if (check.data.length === 0) {
        const token = Math.ceil(createToken());
        const response = yield call(authAPI.register, {
          ...action.payload,
          token,
        });
        yield put({
          type: SUCCESS,
          payload: response.data.token,
          error: null,
        });
      } else {
        yield put({
          type: FAILUE,
          payload: { errorType: 409 },
          error: true,
        });
      }
    } catch (e) {
      yield put({
        type: FAILUE,
        payload: e,
        error: true,
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
      console.log(response.data[0].token);
      sessionStorage.setItem('token', response.data[0].token);
      yield put({
        type: SUCCESS,
        payload: response.data[0].token,
      });
    } catch (e) {
      yield put({
        type: FAILUE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}

export function createCheckSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILUE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type));
    try {
      const response = yield call(authAPI.check, action.payload);
      console.log(response.data[0].token);
      if (response.data[0].token === 0) {
        return;
      } else {
        yield put({
          type: SUCCESS,
          payload: response.data[0].token,
        });
      }
    } catch (e) {
      yield put({
        type: FAILUE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
