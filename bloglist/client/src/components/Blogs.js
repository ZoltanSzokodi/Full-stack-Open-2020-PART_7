import React from 'react';
import { useSelector } from 'react-redux';

import Blog from './Blog';
import { sortByLikes } from '../helpers';

const Blogs = ({ user }) => {
  // STILL NEED TO INCLUDE SORT IN HERE
  const blogs = useSelector(({ blogs }) => {
    return blogs.slice().sort(sortByLikes);
  });

  return (
    <div>
      <h2>Blogs list</h2>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          // handleDelete={handleDelete}
          // handleLike={handleLike}
        />
      ))}
    </div>
  );
};

export default Blogs;
