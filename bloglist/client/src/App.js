import React, { Fragment, useState, useEffect, createRef } from 'react';

import { useDispatch } from 'react-redux';
import { initBlogs } from './actions/blogs';

import blogService from './services/blogs';
import loginService from './services/login';

import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import './App.css';

const App = () => {
  const [notification, setNotification] = useState(null);
  // const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  // console.log(blogs);
  // console.log(user);

  // The createRef method is used to create a blogFormRef ref, that is assigned to the Togglable component containing the creation blog form. The blogFormRef variable acts as a reference to the component.
  const blogFormRef = createRef();

  // Fetch all blogs
  // useEffect(() => {
  //   blogService.getAll().then(blogs => setBlogs(blogs));
  // }, []);

  // Check local storage for user token
  useEffect(() => {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // Reset notifications after 5s
  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [notification]);

  // EVENT HANDLERS ============================
  // const resetNotification = () =>
  //   setTimeout(() => {
  //     setNotification(null);
  //   }, 5000);

  const loginUser = async credentialsObj => {
    try {
      const user = await loginService.login(credentialsObj);

      blogService.setToken(user.token);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      setNotification({
        success: true,
        msg: 'You are logged in',
      });

      // resetNotification();
    } catch (error) {
      console.log(error.response.data.error);
      setNotification({
        success: false,
        msg: error.response.data.error,
      });

      // resetNotification();
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('user');

    setUser(null);
    setNotification({
      success: true,
      msg: 'Logged out',
    });

    // resetNotification();
  };
  // const createBlog = async newBlogObj => {
  //   // We can hide the form by calling blogFormRef.current.toggleVisibility() after a new blog has been created
  //   blogFormRef.current.toggleVisibility();

  //   try {
  //     const blog = await blogService.create(newBlogObj);

  //     setBlogs(blogs.concat(blog));

  //     setNotification({
  //       success: true,
  //       msg: 'New blog added',
  //     });

  //     // resetNotification();
  //   } catch (error) {
  //     console.log(error.response.data.error);
  //     setNotification({
  //       success: false,
  //       msg: error.response.data.error,
  //     });

  //     // resetNotification();
  //   }
  // };

  // const deleteBlog = async blogID => {
  //   const confirm = window.confirm(
  //     'Are you sure you want to delete this blog?'
  //   );

  //   if (!confirm) return null;

  //   try {
  //     const res = await blogService.remove(blogID);
  //     const updatedBlogs = blogs.filter(b => b.id !== blogID);

  //     setBlogs(updatedBlogs);
  //     setNotification({
  //       success: true,
  //       msg: res.message,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const toggleLike = async (type, blogID) => {
  //   let resBlogObj;
  //   try {
  //     type === 'like'
  //       ? (resBlogObj = await blogService.like(blogID))
  //       : (resBlogObj = await blogService.unlike(blogID));

  //     const updatedBlogs = blogs.map(b => {
  //       if (b.id === resBlogObj.id) return resBlogObj;
  //       else return b;
  //     });

  //     setBlogs(updatedBlogs);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      {user && (
        <Fragment>
          <span>{`${user.username} is logged in`}</span>
          <button type='button' onClick={logoutUser}>
            log out
          </button>
        </Fragment>
      )}

      {notification && <Notification notification={notification} />}

      {user === null ? (
        <LoginForm loginUser={loginUser} />
      ) : (
        <Fragment>
          <h2>Add new blog to list</h2>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <Blogs
            // blogs={blogs}
            user={user}
            // handleDelete={deleteBlog}
            // handleLike={toggleLike}
          />
        </Fragment>
      )}
    </div>
  );
};

export default App;
