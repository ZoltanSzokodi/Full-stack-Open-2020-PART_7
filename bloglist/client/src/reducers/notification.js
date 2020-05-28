import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.payload;
    case CLEAR_NOTIFICATION:
      return null;
    default:
      return state;
  }
};
