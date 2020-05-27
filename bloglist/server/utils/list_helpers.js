exports.totalLikes = blogs => {
  // const reducer = (likesSum, blog) => likesSum + blog.likes;
  // return blogs.reduce(reducer, 0);
  if (blogs.length === 0) return 0;

  let sumsObj = {};
  let returnObj = {
    author: '',
    likes: 0,
  };

  blogs.forEach(blog => {
    if (sumsObj[blog.author]) {
      sumsObj[blog.author] += blog.likes;
    } else {
      sumsObj[blog.author] = blog.likes;
    }
  });

  for (let key in sumsObj) {
    if (sumsObj[key] >= returnObj.likes) {
      returnObj.author = key;
      returnObj.likes = sumsObj[key];
    }
  }

  return returnObj;
};

exports.mostBlogs = blogs => {
  let sumsObj = {};
  let returnObj = {
    author: '',
    blogs: 0,
  };

  blogs.forEach(blog => {
    if (sumsObj[blog.author]) {
      sumsObj[blog.author]++;
    } else {
      sumsObj[blog.author] = 1;
    }
  });

  for (let key in sumsObj) {
    if (sumsObj[key] >= returnObj.blogs) {
      returnObj.author = key;
      returnObj.blogs = sumsObj[key];
    }
  }
  return returnObj;
};
