import Post from '../models/post.js';

const addComment = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({
        author_id: req.body.author_id,
        content: req.body.content,
    });

    await post.save();
    res.status(201).json(post.comments[post.comments.length - 1]);
};

const deleteComment = async (req, res) => {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    comment.deleteOne();
    await post.save();

    res.json({ message: 'Comment deleted' });
};

export { addComment, deleteComment };
