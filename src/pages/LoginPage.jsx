import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';

const LoginPage = () => {
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  if (token !== null) {
    return <Redirect to="/" />;
  }
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
  // return (
  //   <AuthTemplate>
  //     <LoginForm />
  //   </AuthTemplate>
  // );
};

export default LoginPage;
