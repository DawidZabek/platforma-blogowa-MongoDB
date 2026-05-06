const express = require('express');
const router = express.Router();
const { getAllPosts, getPostById, createPost, updatePost, deletePost} = require('../controllers/posts');
const { addComment, deleteComment} = require('../controllers/comments');

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

router.post('/:id/comments', addComment);
router.delete('/:postId/comments/:commentId', deleteComment);

module.exports = router;
