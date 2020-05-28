import userService from '../services/user';
import blogService from '../services/blogs';

import { SAVED_USER, LOGIN_USER, LOGOUT_USER } from './types';

import { setNotification } from './notification';

export const savedUser = user => dispatch => {
  const { id, name, username, token } = user;

  blogService.setToken(token);

  dispatch({
    type: SAVED_USER,
    payload: {
      id,
      name,
      username,
    },
  });
};

export const loginUser = credentials => async dispatch => {
  try {
    const user = await userService.login(credentials);
    const { id, name, username, token } = user;

    blogService.setToken(token);
    localStorage.setItem('user', JSON.stringify(user));

    dispatch({
      type: LOGIN_USER,
      payload: {
        id,
        name,
        username,
      },
    });

    dispatch(setNotification(`Welcome back ${name}!`, true, 5000));
  } catch (err) {
    const { error } = err.response.data;
    console.log(error);

    dispatch(setNotification(error, false, 5000));
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('user');

  dispatch({
    type: LOGOUT_USER,
  });
};
