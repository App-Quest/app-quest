import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  inputEmailActionCreator,
  inputPasswordActionCreator,
  setEmailActionCreator,
  setApplicationPostsActionCreator,
} from '../actions/actions';

const mapDispatchToProps = (dispatch) => ({
  inputEmailFunc: (emailInput) => dispatch(inputEmailActionCreator(emailInput)),
  inputPasswordFunc: (passwordInput) =>
    dispatch(inputPasswordActionCreator(passwordInput)),
  setEmailFunc: (email) => dispatch(setEmailActionCreator(email)),
  setApplicationPostsFunc: (applicationPosts) =>
    dispatch(setApplicationPostsActionCreator(applicationPosts)),
});

const mapStateToProps = (state) => ({
  emailInput: state.auth.emailInput,
  passwordInput: state.auth.passwordInput,
});

const AuthForm = ({
  buttonLabel,
  emailInput,
  passwordInput,
  inputEmailFunc,
  inputPasswordFunc,
  url,
  setEmailFunc,
  setApplicationPostsFunc,
}) => {
  const history = useHistory();
  const handleChange = (event) => {
    if (event.target.id === 'inputEmail') {
      inputEmailFunc(event.target.value);
    }
    if (event.target.id === 'inputPassword') {
      inputPasswordFunc(event.target.value);
    }
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
        setEmailFunc(results.email);
        setApplicationPostsFunc(results.applicationPosts);
        history.push('/apps');
      });
  };
  return (
    <div className='form'>
      <TextField
        id='inputEmail'
        label='Email'
        value={emailInput}
        onChange={handleChange}
      />
      <TextField
        id='inputPassword'
        label='Password'
        type='password'
        value={passwordInput}
        onChange={handleChange}
        style={{ marginTop: '15px', marginBottom: '15px' }}
      />
      <Button onClick={handleClick}>{buttonLabel}</Button>
      {url === 'signin' && (
        <span id='signup-prompt'>
          Click <Link to='signup'>here</Link> to sign up as a new user.
        </span>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
