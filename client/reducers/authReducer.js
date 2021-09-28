import * as types from '../constants/actionTypes';

const initialState = {
  emailInput: '',
  passwordInput: '',
  email: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_EMAIL: {
      const email = action.payload;
      return {
        ...state,
        email,
      };
    }
    case types.INPUT_EMAIL: {
      const emailInput = action.payload;
      return {
        ...state,
        emailInput,
      };
    }
    case types.INPUT_PASSWORD: {
      const passwordInput = action.payload;
      return {
        ...state,
        passwordInput,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
