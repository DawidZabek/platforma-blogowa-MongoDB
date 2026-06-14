import { Router } from 'express';
import { getAllTags, getPopularTags, getAuthorStats } from '../controllers/tags.js';

const router = Router();

router.get('/', getAllTags);
router.get('/popular', getPopularTags);
router.get('/author-stats', getAuthorStats);

export default router;
