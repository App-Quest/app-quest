import * as types from '../constants/actionTypes';

export const inputEmailActionCreator = (emailInput) => ({
  type: types.INPUT_EMAIL,
  payload: emailInput,
});

export const inputPasswordActionCreator = (passwordInput) => ({
  type: types.INPUT_PASSWORD,
  payload: passwordInput,
});

export const setEmailActionCreator = (email) => ({
  type: types.SET_EMAIL,
  payload: email,
});

export const setApplicationPostsActionCreator = (applicationPosts) => ({
  type: types.SET_APPLICATION_POSTS,
  payload: applicationPosts,
});

export const setSignInResponseActionCreator = (signInResponse) => ({
  type: types.SET_SIGN_IN_RESPONSE,
  payload: signInResponse,
});

export const updateAppActionCreator = (application) => ({
  type: types.UPDATE_APP,
  payload: application,
});

export const clearAppStateActionCreator = () => ({
  type: types.CLEAR_APP_STATE,
  payload: null,
});
