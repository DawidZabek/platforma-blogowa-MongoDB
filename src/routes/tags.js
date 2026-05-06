const express = require('express');
const router = express.Router();
const {getAllTags, getPopularTags} = require('../controllers/tags');

router.get('/', getAllTags);
router.get('/popular', getPopularTags);

module.exports = router;
