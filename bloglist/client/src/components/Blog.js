import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteBlog, likeBlog, unlikeBlog } from '../actions/blogs';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    blog.likes.includes(user.id) ? setLiked(true) : setLiked(false);
  }, [blog.likes, user.id]);

  const handleLike = (type, blogID) =>
    type === 'like' ? dispatch(likeBlog(blogID)) : dispatch(unlikeBlog(blogID));

  const handleDelete = blogID => {
    const confirm = window.confirm(
      'Are you sure you want to delete this blog?'
    );

    return !confirm ? null : dispatch(deleteBlog(blogID));
  };

  // const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!visible);

  return (
    <div className='blog'>
      <div>
        <span className='title'>{blog.title}</span> -{' '}
        <span className='author'>{blog.author}</span>
        <ul className='details' style={showWhenVisible}>
          <li>
            likes - {blog.likes.length}
            {liked ? (
              <button
                className='like'
                onClick={() => handleLike('unlike', blog.id)}>
                unlike
              </button>
            ) : (
              <button
                className='like'
                onClick={() => handleLike('like', blog.id)}>
                like
              </button>
            )}
          </li>
          <li>url - {blog.url}</li>
          <li>user - {blog.user.name}</li>
        </ul>
      </div>
      <div>
        <button onClick={toggleVisibility} className='view'>
          {visible ? 'hide' : 'show'}
        </button>
        <button
          onClick={() => handleDelete(blog.id)}
          className='delete'
          disabled={user.id !== blog.user.id}>
          X
        </button>
      </div>
    </div>
  );
};

export default Blog;
