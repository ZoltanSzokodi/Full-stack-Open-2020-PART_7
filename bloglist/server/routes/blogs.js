const express = require('express');
const router = express.Router();

const {
  getAllBlogs,
  getBlog,
  postNewBlog,
  updateBlog,
  deleteBlog,
  likePost,
  unlikePost,
} = require('../controllers/blogs');

router.route('/').get(getAllBlogs).post(postNewBlog);

router.route('/:id').get(getBlog).put(updateBlog).delete(deleteBlog);

router.route('/:id/likes').put(likePost).delete(unlikePost);

module.exports = router;
