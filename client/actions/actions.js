import * as types from '../constants/actionTypes';

export const inputEmailActionCreator = (emailInput) => ({
  type: types.INPUT_EMAIL,
  payload: emailInput,
});

export const inputPasswordActionCreator = (passwordInput) => ({
  type: types.INPUT_PASSWORD,
  payload: passwordInput,
});
