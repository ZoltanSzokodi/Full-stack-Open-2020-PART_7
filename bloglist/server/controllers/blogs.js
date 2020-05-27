// const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/Blog');
const User = require('../models/User');
require('express-async-errors');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 });

  res.send(blogs);
};

// @desc    Get a single blog
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ error: 'Blog not found' });

  res.send(blog);
};

// @desc    Post a new blog
// @route   POST /api/blogs
// @access  Private
exports.postNewBlog = async (req, res) => {
  const { title, author, url } = req.body;

  if (!req.token)
    return res.status(401).json({
      error: 'User must be signed in to access this route',
    });

  const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title,
    author,
    url,
    user: user._id,
  });

  const savedBlog = await blog.save();

  const responseBlog = await Blog.findById(savedBlog._id).populate('user', {
    name: 1,
    username: 1,
  });

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(responseBlog);
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private
exports.updateBlog = async (req, res) => {
  if (!req.token)
    return res.status(401).json({
      error: 'User must be signed in to perform this action',
    });

  const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);

  let blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ error: 'Blog not found' });

  if (blog.user.toString() !== decodedToken.id)
    return res
      .status(401)
      .json({ error: 'User is unauthorized to access this route' });

  blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  res.send(blog);
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private
exports.deleteBlog = async (req, res) => {
  if (!req.token)
    return res.status(401).json({
      error: 'User must be signed in to perform this action',
    });

  const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);

  let blog = await Blog.findById(req.params.id);

  // console.log(blog.user.toString() === decodedToken.id);
  if (blog.user.toString() !== decodedToken.id)
    return res
      .status(401)
      .json({ error: 'User is unauthorized to access this route' });

  await blog.remove();

  res.status(200).json({ message: 'Blog has been removed' });
};

// @desc    Like a blog
// @route   PUT /api/blogs/:id/likes
// @access  Private
exports.likePost = async (req, res) => {
  if (!req.token)
    return res.status(401).json({
      error: 'User must be signed in to perform this action',
    });

  const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);

  const blog = await Blog.findById(req.params.id).populate('user', {
    name: 1,
    username: 1,
  });

  const isLiked = blog.likes.some(like => like.toString() === decodedToken.id);

  if (isLiked)
    return res.status(403).json({ error: 'User has already liked this blog' });

  blog.likes.unshift(decodedToken.id);

  await blog.save();

  res.send(blog);
};

// @desc    Unlike post
// @route   DELETE /api/blogs/:id/likes
// @access  Private
exports.unlikePost = async (req, res, next) => {
  if (!req.token)
    return res.status(401).json({
      error: 'User must be signed in to perform this action',
    });

  const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);

  const blog = await Blog.findById(req.params.id).populate('user', {
    name: 1,
    username: 1,
  });

  const isLiked = blog.likes.some(like => like.toString() === decodedToken.id);

  if (!isLiked)
    return res
      .status(403)
      .json({ error: 'User has already unliked this blog' });

  const likeToRemove = blog.likes.find(
    like => like.toString() === decodedToken.id
  );

  blog.likes.splice(blog.likes.indexOf(likeToRemove), 1);

  await blog.save();

  res.send(blog);
};
