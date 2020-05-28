import { INIT_BLOGS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case INIT_BLOGS:
      return action.payload;
    default:
      return state;
  }
};
