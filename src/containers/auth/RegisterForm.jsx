import { useEffect, useState } from 'react';
import Register from '../../components/auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { check } from '../../redux/modules/user';
import {
  changeField,
  register,
  initializeForm,
} from '../../redux/modules/auth';

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { userId, password, passwordConfirm, nickname } = form;
    // 하나라도 비어 있다면
    if ([userId, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
      return;
    }
    dispatch(register({ userId, password, nickname }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      // 계정명이 이미 존재할 때
      if (authError.errorType === 409) {
        setError('이미 존재하는 ID입니다.');
        return;
      }
      //기타 이유
      setError('회원가입 실패');
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  // user값이 잘 설정되었는지 확인
  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        sessionStorage.setItem('token', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);
  return (
    <Register
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
