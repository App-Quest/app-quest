import React from 'react';
import AuthForm from './AuthForm';

const AuthPage = () => {
  return (
    <div className='mainPage'>
      <AuthForm buttonLabel='Sign Up' id='signup' />
    </div>
  );
};

export default AuthPage;
