import React, { useState } from 'react';
import styled from 'styled-components';
import SignUpButton from '../common/Button';
import StyledInput from '../common/StyledInput';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

const StyledContainer = styled.div`
  h2 {
    color: #444;
    margin: 30px 0 1.3rem 0;
  }
  .backIcon {
    font-size: 1.5rem;
    color: #444;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: left;
  font-size: 0.875rem;
  margin-top: 1rem;
  float: left;
`;

const Register = ({ onChange, onSubmit, form, error, history }) => {
  const [isclickedBackBtn, setclicked] = useState(false);

  function onClick() {
    setclicked(true);
    setTimeout(() => {
      history.push('/login');
    }, 200);
  }
  return (
    <StyledContainer
      className={
        'container showRegister ' + (isclickedBackBtn ? 'noneRegister' : '')
      }
    >
      <ArrowLeftOutlined className="backIcon" onClick={onClick} />
      <form onSubmit={onSubmit}>
        <h2>Sign Up</h2>
        <StyledInput
          name="id"
          placeholder="Id"
          onChange={onChange}
          autoComplete="off"
          value={form.id}
        />
        <StyledInput
          name="nickname"
          placeholder="Nickname"
          onChange={onChange}
          autoComplete="off"
          value={form.nickname}
        />
        <StyledInput
          name="password"
          type="password"
          placeholder="Password"
          onChange={onChange}
          value={form.password}
        />
        <StyledInput
          name="passwordConfirm"
          type="password"
          placeholder="Confirm Password"
          onChange={onChange}
          value={form.passwordConfirm}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SignUpButton>Sign up</SignUpButton>
      </form>
    </StyledContainer>
  );
};

export default withRouter(Register);
