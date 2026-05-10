import { Router } from 'express';
import { getAllTags, getPopularTags } from '../controllers/tags.js';

const router = Router();

router.get('/', getAllTags);
router.get('/popular', getPopularTags);

export default router;
