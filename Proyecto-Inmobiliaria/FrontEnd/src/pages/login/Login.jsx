import React from 'react';
import LoginForm from './components/loginForm';

const Login = ({bookTriedWithoutLogin, setBookTriedWithoutLogin }) => {
  return (
    <>
      <LoginForm
        bookTriedWithoutLogin={bookTriedWithoutLogin}
        setBookTriedWithoutLogin={setBookTriedWithoutLogin}
      />
    </>
  );
}

export default Login;