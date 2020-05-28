import blogsService from '../services/blogs';

import {
  INIT_BLOGS,
  ADD_BLOG,
  DELETE_BLOG,
  LIKE_BLOG,
  UNLIKE_BLOG,
} from './types';

import { setNotification } from './notification';

export const initBlogs = () => async dispatch => {
  try {
    const blogs = await blogsService.getAll();

    dispatch({
      type: INIT_BLOGS,
      payload: blogs,
    });
  } catch (err) {
    const { error } = err.response.data;
    console.log(error);

    dispatch(setNotification(error, false, 5000));
  }
};

export const addBlog = blogObj => async dispatch => {
  try {
    const newBlog = await blogsService.create(blogObj);

    dispatch({
      type: ADD_BLOG,
      payload: newBlog,
    });

    dispatch(setNotification('New blog added', true, 5000));
  } catch (err) {
    const { error } = err.response.data;
    console.log(error);

    dispatch(setNotification(error, false, 5000));
  }
};

export const deleteBlog = blogID => async dispatch => {
  try {
    const response = await blogsService.remove(blogID);

    console.log(response);

    dispatch({
      type: DELETE_BLOG,
      payload: blogID,
    });

    dispatch(setNotification('Blog removed', true, 5000));
  } catch (err) {
    const { error } = err.response.data;
    console.log(error);

    dispatch(setNotification(error, false, 5000));
  }
};

export const likeBlog = blogID => async dispatch => {
  try {
    const resBlogObj = await blogsService.like(blogID);

    dispatch({
      type: LIKE_BLOG,
      payload: resBlogObj,
    });

    dispatch(setNotification(`You liked "${resBlogObj.title}"`, true, 5000));
  } catch (err) {
    const { error } = err.response.data;
    console.log(error);

    dispatch(setNotification(error, false, 5000));
  }
};

export const unlikeBlog = blogID => async dispatch => {
  try {
    const resBlogObj = await blogsService.unlike(blogID);

    dispatch({
      type: UNLIKE_BLOG,
      payload: resBlogObj,
    });

    dispatch(setNotification(`You unliked "${resBlogObj.title}"`, true, 5000));
  } catch (err) {
    const { error } = err.response.data;
    console.log(error);

    dispatch(setNotification(error, false, 5000));
  }
};
