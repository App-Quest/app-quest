import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  inputEmailActionCreator,
  inputPasswordActionCreator,
} from '../actions/actions';

const mapDispatchToProps = (dispatch) => ({
  inputEmailFunc: (emailInput) => dispatch(inputEmailActionCreator(emailInput)),
  inputPasswordFunc: (passwordInput) =>
    dispatch(inputPasswordActionCreator(passwordInput)),
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
}) => {
  const handleChange = (event) => {
    if (event.target.id === 'inputEmail') {
      inputEmailFunc(event.target.value);
    }
    if (event.target.id === 'inputPassword') {
      inputPasswordFunc(event.target.value);
    }
  };
  const handleClick = (event) => {
    fetch(`http://localhost:3000/${event.target.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: emailInput,
        password: passwordInput,
      },
    })
      .then((data) => data.json())
      .then((results) => {
        console.log(results);
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
        value={passwordInput}
        onChange={handleChange}
      />
      <Button onClick={handleClick}>{buttonLabel}</Button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
