import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../actions/blogs';

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();

  const initialState = {
    title: '',
    author: '',
    url: '',
  };

  const [{ title, author, url }, setFields] = useState(initialState);

  const handleChange = e => {
    const { name, value } = e.target;

    setFields(prevState => ({ ...prevState, [name]: value }));
  };

  const handleReset = () => setFields({ ...initialState });

  const handleSubmit = e => {
    e.preventDefault();
    // We can hide the form by calling blogFormRef.current.toggleVisibility() after a new blog has been created
    blogFormRef.current.toggleVisibility();

    dispatch(addBlog({ title, author, url }));

    handleReset();
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          title:{' '}
          <input
            onChange={handleChange}
            id='title'
            type='text'
            name='title'
            value={title}
            placeholder='Add title...'
            required
          />
        </label>
        <br />
        <label>
          author:{' '}
          <input
            onChange={handleChange}
            id='author'
            type='text'
            name='author'
            value={author}
            placeholder='Add author...'
            required
          />
        </label>
        <br />
        <label>
          url:{' '}
          <input
            onChange={handleChange}
            id='url'
            type='text'
            name='url'
            value={url}
            placeholder='Add url...'
            required
          />
        </label>
        <br />
        <button type='submit'>add blog</button>
      </form>
    </Fragment>
  );
};

export default BlogForm;
