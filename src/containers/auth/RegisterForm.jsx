import { useEffect, useState } from 'react';
import Register from '../../components/auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  changeField,
  register,
  initializeForm,
} from '../../redux/modules/auth';

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, registerCheck } = useSelector(({ auth }) => ({
    form: auth.register,
    registerCheck: auth.registerCheck,
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
    const { id, password, passwordConfirm, nickname } = form;
    // 하나라도 비어 있다면
    if ([id, password, passwordConfirm].includes('')) {
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
    dispatch(register({ id, password, nickname }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (registerCheck === true) {
      console.log('회원가입 성공');
      history.push('/login');
    } else if (registerCheck === 'overlap') {
      // 계정명이 이미 존재할 때
      setError('이미 존재하는 ID입니다.');
    } else if (registerCheck === 'register fail') {
      //기타 이유
      setError('회원가입 실패');
    }
  }, [registerCheck, dispatch, history, error]);

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
