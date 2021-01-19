import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Home = () => {
  const token = useSelector((state) => state.auth);
  console.log(token);
  if (token === null) {
    return <Redirect to="/login" />;
  }
  return <div>Home</div>;
};

export default Home;
