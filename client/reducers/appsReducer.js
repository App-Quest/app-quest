import * as types from '../constants/actionTypes';

const initialState = {
  applicationPosts: [],
};

const appsReducer = (state = initialState, action) => {
  let applicationPosts;
  switch (action.type) {
    case types.SET_APPLICATION_POSTS: {
      applicationPosts = action.payload;
      return {
        ...state,
        applicationPosts,
      };
    }
    default:
      return state;
  }
};

export default appsReducer;
