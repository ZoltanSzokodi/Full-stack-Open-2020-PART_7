// const usersRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('express-async-errors');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getAllUsers = async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    createdAt: 1,
  });

  res.send(users);
};

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
exports.postNewUser = async (req, res) => {
  const { username, name, password } = req.body;

  if (!password || password.length < 3)
    return res.status(400).json({ error: 'Password minimum length is 3' });

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
};
