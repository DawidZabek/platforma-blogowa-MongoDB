import Post from '../models/post.js';

const getAllTags = async (req, res) => {
    const tags = await Post.distinct('tags');
    res.json(tags);
};

const getPopularTags = async (req, res) => {
    const tags = await Post.aggregate([
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
        { $project: { tag: '$_id', count: 1, _id: 0 } },
    ]);

    res.json(tags);
};

export { getAllTags, getPopularTags };
