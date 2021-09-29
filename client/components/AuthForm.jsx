import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  inputEmailActionCreator,
  inputPasswordActionCreator,
  setEmailActionCreator,
  setApplicationPostsActionCreator,
  setSignInResponseActionCreator,
} from '../actions/actions';

const mapDispatchToProps = (dispatch) => ({
  inputEmail: (emailInput) => dispatch(inputEmailActionCreator(emailInput)),
  inputPassword: (passwordInput) =>
    dispatch(inputPasswordActionCreator(passwordInput)),
  setEmail: (email) => dispatch(setEmailActionCreator(email)),
  setApplicationPosts: (applicationPosts) =>
    dispatch(setApplicationPostsActionCreator(applicationPosts)),
  setSignInResponse: (signInResponse) =>
    dispatch(setSignInResponseActionCreator(signInResponse)),
});

const mapStateToProps = (state) => ({
  emailInput: state.auth.emailInput,
  passwordInput: state.auth.passwordInput,
  signInResponse: state.auth.signInResponse,
});

const AuthForm = ({
  buttonLabel,
  emailInput,
  passwordInput,
  inputEmail,
  inputPassword,
  url,
  setEmail,
  setApplicationPosts,
  signInResponse,
  setSignInResponse,
}) => {
  const history = useHistory();
  const handleChange = (event) => {
    if (event.target.id === 'inputEmail') {
      inputEmail(event.target.value);
    }
    if (event.target.id === 'inputPassword') {
      inputPassword(event.target.value);
    }
  };
  const textEnterHandler = (event) => {
    if (event.key === 'Enter') handleClick();
  };
  const handleClick = () => {
    fetch(`/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    })
      .then((data) => data.json())
      .then((results) => {
        if (typeof results === 'object' && results.email) {
          setEmail(results.email);
          setApplicationPosts(results.applicationPosts);
          setSignInResponse('');
          inputEmail('');
          inputPassword('');
          history.push('/apps');
        } else {
          setSignInResponse(results);
        }
      })
      .catch((error) => {
        console.log('Error in AuthForm handleClick fetch request: ', error);
      });
  };
  return (
    <div className='form'>
      <TextField
        id='inputEmail'
        label='Email'
        value={emailInput}
        onChange={handleChange}
        onKeyDown={textEnterHandler}
      />
      <TextField
        id='inputPassword'
        label='Password'
        type='password'
        value={passwordInput}
        onChange={handleChange}
        style={{ marginTop: '15px', marginBottom: '15px' }}
        onKeyDown={textEnterHandler}
      />
      <Button onClick={handleClick}>{buttonLabel}</Button>
      {url === 'signin' && (
        <span className='auth-prompt'>
          Click <Link to='signup'>here</Link> to sign up as a new user.
        </span>
      )}
      {signInResponse && <span className='auth-prompt'>{signInResponse}</span>}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
