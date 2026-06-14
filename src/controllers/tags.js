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

const getAuthorStats = async (req, res) => {
    const stats = await Post.aggregate([
        {
            $group: {
                _id: '$author_id',
                postCount: { $sum: 1 },
                commentCount: { $sum: { $size: '$comments' } },
                totalLikes: { $sum: '$stats.likes' },
                totalViews: { $sum: '$stats.views' },
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'author'
            }
        },
        { $unwind: '$author' },
        {
            $project: {
                _id: 0,
                authorName: '$author.name',
                postCount: 1,
                commentCount: 1,
                totalLikes: 1,
                totalViews: 1,
            }
        },
        { $sort: { postCount: -1 } },
    ]);

    res.json(stats);
};

export { getAllTags, getPopularTags, getAuthorStats };
