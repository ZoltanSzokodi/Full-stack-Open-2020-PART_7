const { totalLikes, mostBlogs } = require('../utils/list_helpers');
const { blogs, listWithOneBlog } = require('./data_for_testing');

// TOTAL LIKES ===========================
describe('total likes', () => {
  test('when list has only one blog return an object with the author and his/her likes', () => {
    const result = totalLikes(listWithOneBlog);

    expect(result).toMatchObject({ author: 'Edsger W. Dijkstra', likes: 5 });
  });

  // test('when list has many blogs add up all the likes', () => {
  //   const result = totalLikes(blogs);

  //   expect(result).toBe(36);
  // });

  test('when list is empty the return value should be 0', () => {
    const result = totalLikes([]);

    expect(result).toBe(0);
  });

  test('when list has many blogs return the author with the most amount of likes as an onject. The return value also contains the number of likes the top author has', () => {
    const result = totalLikes(blogs);

    expect(result).toMatchObject({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});

// MOST BLOGS ===========================
describe('most blogs', () => {
  test('when list has many blogs return the author with the most amount of blogs as an onject. The return value also contains the number of blogs the top author has', () => {
    const result = mostBlogs(blogs);

    expect(result).toMatchObject({ author: 'Robert C. Martin', blogs: 3 });
  });
});
