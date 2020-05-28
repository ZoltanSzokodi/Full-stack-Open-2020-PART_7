import React, { Fragment, useState, useEffect, createRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { initBlogs } from './actions/blogs';
import { savedUser, logoutUser } from './actions/user';

import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import './App.css';

const App = () => {
  // The createRef method is used to create a blogFormRef ref, that is assigned to the Togglable component containing the creation blog form. The blogFormRef variable acts as a reference to the component.
  const blogFormRef = createRef();
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const notification = useSelector(({ notification }) => notification);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  // Check local storage for user token
  useEffect(() => {
    const userData = localStorage.getItem('user');
    userData && dispatch(savedUser(JSON.parse(userData)));
  }, []);

  // Reset notifications after 5s
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setNotification(null);
  //   }, 5000);

  //   return () => clearTimeout(timeout);
  // }, [notification]);

  // EVENT HANDLERS ============================

  const handleLogout = () => dispatch(logoutUser());

  return (
    <div>
      {user && (
        <Fragment>
          <span>{`${user.username} is logged in`}</span>
          <button type='button' onClick={handleLogout}>
            log out
          </button>
        </Fragment>
      )}

      {notification && <Notification notification={notification} />}

      {user === null ? (
        <LoginForm />
      ) : (
        <Fragment>
          <h2>Add new blog to list</h2>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <Blogs />
        </Fragment>
      )}
    </div>
  );
};

export default App;
