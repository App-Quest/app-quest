import { combineReducers } from 'redux';
import appsReducer from './appsReducer';
import authReducer from './authReducer';

const reducers = combineReducers({
  auth: authReducer,
  apps: appsReducer,
});

export default reducers;
