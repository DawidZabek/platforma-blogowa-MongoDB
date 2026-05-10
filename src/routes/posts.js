import { Router } from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/posts.js';
import { addComment, deleteComment } from '../controllers/comments.js';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

router.post('/:id/comments', addComment);
router.delete('/:postId/comments/:commentId', deleteComment);

export default router;
