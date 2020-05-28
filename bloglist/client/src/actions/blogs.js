import blogsService from '../services/blogs';

import {
  INIT_BLOGS,
  ADD_BLOG,
  DELETE_BLOG,
  LIKE_BLOG,
  UNLIKE_BLOG,
} from './types';

export const initBlogs = () => async dispatch => {
  try {
    const blogs = await blogsService.getAll();

    dispatch({
      type: INIT_BLOGS,
      payload: blogs,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addBlog = blogObj => async dispatch => {
  try {
    const newBlog = await blogsService.create(blogObj);

    dispatch({
      type: ADD_BLOG,
      payload: newBlog,
    });
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

export const likeBlog = blogID => async dispatch => {
  try {
    const resBlogObj = await blogsService.like(blogID);

    dispatch({
      type: LIKE_BLOG,
      payload: resBlogObj,
    });
  } catch (error) {
    console.log(error);
  }
};

export const unlikeBlog = blogID => async dispatch => {
  try {
    const resBlogObj = await blogsService.unlike(blogID);

    dispatch({
      type: UNLIKE_BLOG,
      payload: resBlogObj,
    });
  } catch (error) {
    console.log(error);
  }
};
