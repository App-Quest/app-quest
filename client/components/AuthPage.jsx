import React from 'react';
import AuthForm from './AuthForm';

const AuthPage = ({ buttonLabel, url }) => {
  return (
    <div className='authPage'>
      <AuthForm buttonLabel={buttonLabel} url={url} />
    </div>
  );
};

export default AuthPage;
