const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const Posts = await Post.getAllPosts();
    res.json(Posts);
  } catch (e) {
    next(e);
  }
});
