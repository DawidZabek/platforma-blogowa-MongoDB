const Post = require('../models/Post');

const getAllPosts = async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1});
    res.json(posts);
};

const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({message: 'Post not found' });
    res.json(post);
};

const createPost = async (req, res) => {
    const { title, content, tags, authorName } = req.body;
    const post = await Post.create({ title, content, tags, authorName });
    res.status(201).json(post);
};

const updatePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({message: 'Post not found'});

    const { title, content, tags } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    if (tags) post.tags = tags;

    await post.save();
    res.json(post);
};

const deletePost = async(req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found'});

    await post.deleteOne();
    res.json({message: 'Post deleted'});
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost};
