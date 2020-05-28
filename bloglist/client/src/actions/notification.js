import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from './types';

// Referencing the id to reset after multiple votes have occured
let timeoutID;

export const setNotification = (msg, success, timeout) => dispatch => {
  dispatch({
    type: SET_NOTIFICATION,
    payload: {
      success,
      msg,
    },
  });

  if (timeoutID) clearTimeout(timeoutID);

  timeoutID = setTimeout(
    () =>
      dispatch({
        type: CLEAR_NOTIFICATION,
      }),
    timeout
  );
};
