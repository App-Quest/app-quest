import { combineReducers } from 'redux';
import mainReducer from './mainReducer';

const reducers = combineReducers({
  main: mainReducer,
});

export default reducers;
