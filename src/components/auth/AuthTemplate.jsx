import React from 'react';
import styled from 'styled-components';
import { ScheduleOutlined } from '@ant-design/icons';
import authBg from '../../img/bgImg.jpeg';

const AuthTemplateBlock = styled.div`
  /* 화면 전체를 채움 */
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #dfe4ff;
  background-image: url(${authBg});
  /* background-image: url('https://images.unsplash.com/photo-1511351058023-d8980bd46282?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80'); */
  background-size: cover;
  /* flex로 내부 중앙정렬 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TemplateBox = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  background: inherit;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
`;

const TemplateLeftBox = styled.div`
  width: 400px;
  height: 100%;
  background: linear-gradient(45deg, #8a60fd, #8c78ff);
  opacity: 0.9;

  background-size: cover;
  padding: 2rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;

  h1 {
    font-size: 2rem;
    margin: 0;
  }
  p {
    font-size: 1.5rem;
    margin: 10px;
  }
  small {
    margin-top: 130px;
    font-size: 15px;
  }
  .logo {
    font-size: 8rem;
    margin: 2rem;
  }
  .show {
  }
`;

const TemplateRightBox = styled.div`
  width: 400px;
  height: 100%;
  background: #fff;

  @keyframes showToRightAni {
    0% {
      opacity: 0;
      transform: translate(-30px, 0);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
  @keyframes showToLeftAni {
    0% {
      opacity: 0;
      transform: translate(30px, 0);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
  @keyframes disappearToRightAni {
    0% {
      opacity: 1;
      transform: translate(0, 0);
    }
    100% {
      opacity: 0;
      transform: translate(30px, 0);
    }
  }
  @keyframes disappearToLeftAni {
    0% {
      opacity: 1;
      transform: translate(0, 0);
    }
    100% {
      opacity: 0;
      transform: translate(-30px, 0);
    }
  }
  .container {
    padding: 3rem;
  }
  .showSignin {
    animation: showToRightAni 200ms linear normal forwards;
  }

  .showSignin.noneSignin {
    animation: disappearToLeftAni 200ms linear normal forwards;
  }
  .showRegister {
    animation: showToLeftAni 200ms linear normal forwards;
  }
  .showRegister.noneRegister {
    animation: disappearToRightAni 200ms linear normal forwards;
  }
`;

const TemplateLeft = () => {
  return (
    <TemplateLeftBox>
      <ScheduleOutlined className="logo" />
      <h1>Hi, Traveler</h1>
      <p>Make a travel schedule!</p>
      <small>&copy;by Rungak</small>
    </TemplateLeftBox>
  );
};

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <TemplateBox>
        <TemplateLeft />
        <TemplateRightBox>{children}</TemplateRightBox>
      </TemplateBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
