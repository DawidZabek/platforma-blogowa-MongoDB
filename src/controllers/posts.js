import Post from '../models/post.js';

const getAllPosts = async (req, res) => {
    const posts = await Post.find()
        .populate('author_id', 'name')
        .sort({ createdAt: -1 });
    res.json(posts);
};

const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id)
        .populate('author_id', 'name')
        .populate('comments.author_id', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
};

const createPost = async (req, res) => {
    const { content, tags, author_id } = req.body;
    const post = await Post.create({ content, tags, author_id });
    res.status(201).json(post);
};

const updatePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const { content, tags } = req.body;
    if (content) post.content = content;
    if (tags) post.tags = tags;

    await post.save();
    res.json(post);
};

const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost };
