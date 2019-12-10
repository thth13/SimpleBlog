import { combineReducers } from 'redux';

import postReducer from './post';
import authReducer from './auth';
import errors from './errors';

export default combineReducers({
  post: postReducer,
  auth: authReducer,
  errors
});