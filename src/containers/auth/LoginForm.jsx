import React, { useState, useEffect } from 'react';
import Login from '../../components/auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../redux/modules/auth';
import { withRouter } from 'react-router-dom';
import { check } from '../../redux/modules/user';

const LoginForm = ({ history }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { userId, password } = form;
    console.log(userId, password);
    dispatch(login({ userId, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      return;
    }
    if (auth) {
      console.log('로그인 성공');
      dispatch(check(auth));
    }
  }, [auth, authError, dispatch, history]);

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
    <Login form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
  );
};

export default withRouter(LoginForm);
