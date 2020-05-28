import userService from '../services/user';
import blogService from '../services/blogs';

import { SAVED_USER, LOGIN_USER, LOGOUT_USER } from './types';

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
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('user');

  dispatch({
    type: LOGOUT_USER,
  });
};
