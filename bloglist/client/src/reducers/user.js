import { SAVED_USER, LOGIN_USER, LOGOUT_USER } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case SAVED_USER:
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
};
