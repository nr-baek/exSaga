import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import {
  createRequestActionTypes,
  createLoginSaga,
  createRegisterSaga,
} from '../../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';

// 초기 상태
const initialState = {
  register: {
    id: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    id: '',
    password: '',
  },
  token: null,
  registerCheck: null,
  loginCheck: null,
};

// 액션 타입 정의
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

// saga 액션 타입 정의
export const [
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
] = createRequestActionTypes('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);

// 액션 생성 함수
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register, login
    key, // username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM);

export const login = createAction(LOGIN, ({ id, password }) => ({
  id,
  password,
}));

export const register = createAction(
  REGISTER,
  ({ id, password, nickname }) => ({
    id,
    password,
    nickname,
  }),
);

// 사가 생성
const registerSaga = createRegisterSaga(REGISTER);
const loginSaga = createLoginSaga(LOGIN);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      registerCheck: null,
      loginCheck: null,
    }),
    // 회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: { registerCheck } }) => ({
      ...state,
      registerCheck,
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: { registerCheck } }) => ({
      ...state,
      registerCheck,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: { token, loginCheck } }) => ({
      ...state,
      loginCheck,
      token,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: { loginCheck } }) => ({
      ...state,
      token: null,
      loginCheck,
    }),
  },
  initialState,
);

export default auth;
