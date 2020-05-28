import React from 'react';
import { useSelector } from 'react-redux';

import Blog from './Blog';
import { sortByLikes } from '../helpers';

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs.slice().sort(sortByLikes));

  return (
    <div>
      <h2>Blogs list</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
