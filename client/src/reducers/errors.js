import { SET_ERRORS, CLEAR_ERRORS } from '../actions/types';

export default function errors(state = {}, action) {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
};