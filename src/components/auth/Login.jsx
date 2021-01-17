import React, { useState } from 'react';
import styled from 'styled-components';
import SignInButton from '../common/Button';
import StyledInput from '../common/StyledInput';
import { withRouter } from 'react-router-dom';

const StyledContainer = styled.div`
  h2 {
    color: #444;
    margin: 30px 0;
  }
  .signinMsg {
    padding: 1rem 0;
    float: left;
    color: #666;
  }
`;

const SignUpButton = styled.button`
  color: #8a60fd;
  background-color: #f1ecff;
  font-size: 1.1rem;
  padding: 1rem;
  width: 100%;
  border: 2px solid #dfd2ff;
  border-radius: 4px;
  margin-top: 80px;
  cursor: pointer;

  .signup {
    font-weight: bold;
  }
  &:hover {
    background-color: #eae2ff;
    border: 2px solid #d2c0ff;
  }
  &:focus {
    border: 0;
  }
`;

const Login = ({ onChange, form, onSubmit, history }) => {
  const [isclickedSignup, setclicked] = useState(false);

  function onClick() {
    setclicked(true);
    setTimeout(() => {
      history.push('/register');
    }, 200);
  }
  return (
    <StyledContainer
      className={
        'container showSignin ' + (isclickedSignup ? 'noneSignin' : '')
      }
    >
      <form onSubmit={onSubmit}>
        <h2>Sign in</h2>
        <StyledInput
          name="userId"
          placeholder="Id"
          onChange={onChange}
          value={form.userId}
        />
        <StyledInput
          name="password"
          type="password"
          placeholder="Password"
          onChange={onChange}
          value={form.password}
        />
        <p className="signinMsg">Let's plan a trip!</p>
        <SignInButton>Sign in</SignInButton>
      </form>
      <SignUpButton onClick={onClick}>
        Don't have an account? <span className="signup">Sign up</span>
      </SignUpButton>
    </StyledContainer>
  );
};

export default withRouter(Login);
