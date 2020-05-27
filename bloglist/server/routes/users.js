const express = require('express');
const router = express.Router();

const { getAllUsers, postNewUser } = require('../controllers/users');

router.route('/').get(getAllUsers).post(postNewUser);

module.exports = router;
