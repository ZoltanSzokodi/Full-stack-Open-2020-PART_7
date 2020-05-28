import {
  INIT_BLOGS,
  ADD_BLOG,
  DELETE_BLOG,
  LIKE_BLOG,
  UNLIKE_BLOG,
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return action.payload;
    case ADD_BLOG:
      return state.concat(action.payload);
    case DELETE_BLOG:
      return state.filter(({ id }) => id !== action.payload);
    case LIKE_BLOG:
    case UNLIKE_BLOG: {
      const { id } = action.payload;
      return state.map(blog => (blog.id === id ? action.payload : blog));
    }
    default:
      return state;
  }
};
