import blogsService from '../services/blogs';

import { INIT_BLOGS } from './types';

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
