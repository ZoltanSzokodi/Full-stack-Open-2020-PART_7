import React from 'react';
import Blog from './Blog';
import sortByLikes from '../helpers/sortByLikes';

const Blogs = ({ blogs, user, handleDelete, handleLike }) => {
  return (
    <div>
      <h2>Blogs list</h2>
      {[...blogs].sort(sortByLikes).map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleDelete={handleDelete}
          handleLike={handleLike}
        />
      ))}
    </div>
  );
};

export default Blogs;
