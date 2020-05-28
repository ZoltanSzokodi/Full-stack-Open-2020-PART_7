export const sortByLikes = (a, b) => {
  if (a.likes.length > b.likes.length) {
    return -1;
  }
  if (a.likes.length < b.likes.length) {
    return 1;
  }
  return 0;
};
