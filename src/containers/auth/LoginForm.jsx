import React, { useState, useEffect } from 'react';
import Login from '../../components/auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../redux/modules/auth';
import { withRouter } from 'react-router-dom';

const LoginForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, token, loginCheck } = useSelector(({ auth }) => ({
    form: auth.login,
    token: auth.token,
    loginCheck: auth.loginCheck,
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
    const { id, password } = form;
    console.log(id, password);
    if ([id, password].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    dispatch(login({ id, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (loginCheck === false) {
      console.log('login 오류 발생');
      setError('존재하지 않는 회원입니다.');
      return;
    }
    if (token && loginCheck) {
      console.log('로그인 성공');
      try {
        sessionStorage.setItem('token', JSON.stringify(form.id));

        history.push('/');
      } catch (e) {
        console.log('sessionStorage is not working');
      }
    }
  }, [token, history, form.id, loginCheck]);

  return (
    <Login form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
  );
};

export default withRouter(LoginForm);
