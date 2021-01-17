import client from './client';

// 로그인
export const login = ({ userId, password }) =>
  client.get(
    `http://localhost:4000/users?userId=${userId}&password=${password}`,
  );

// 중복계정 확인
export const checkRegister = (userId) =>
  client.get(`http://localhost:4000/users?userId=${userId}`);

// 회원가입
export const register = ({ nickname, userId, password, token }) =>
  client.post('http://localhost:4000/users/', {
    nickname,
    userId,
    password,
    token,
  });

// 로그인 상태 확인
export const check = (token) =>
  client.get(`http://localhost:4000/users?token=${token}`);
