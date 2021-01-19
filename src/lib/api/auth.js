import client from './client';

// 로그인
export const login = ({ id, password }) =>
  client.get(`http://localhost:4000/users?id=${id}&password=${password}`);

// 중복계정 확인
export const checkRegister = (id) =>
  client.get(`http://localhost:4000/users?id=${id}`);

// 회원가입
export const register = ({ nickname, id, password }) =>
  client.post('http://localhost:4000/users/', {
    nickname,
    id,
    password,
  });

// // 로그인 상태 확인
// export const check = (token) =>
//   client.get(`http://localhost:4000/users?token=${token}`); 필요없음
