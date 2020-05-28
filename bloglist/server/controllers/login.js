// const loginRouter = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc    Login user
// @route   POST /api/login
// @access  Public
exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(req.body.password, user.passwordHash);

  if (!(user && passwordCorrect))
    return res.status(401).json({ error: 'Invalid credentials' });

  const { name, username, _id } = user;

  const userCredentials = {
    id: _id,
    username,
  };

  const token = jwt.sign(userCredentials, process.env.JWT_SECRET);

  res.send({
    token,
    id: _id,
    name,
    username,
  });
};
