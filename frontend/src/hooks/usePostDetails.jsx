import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPostById, addComment, deleteComment, deletePost } from "../api/postsApi";

export function usePostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [commentContent, setCommentContent] = useState("");
    const [commentAuthorId, setCommentAuthorId] = useState("");
    const [loading, setLoading] = useState(true);
    const [savingComment, setSavingComment] = useState(false);
    const [error, setError] = useState("");

    const loadPost = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getPostById(id);
            setPost(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadPost();
    }, [loadPost]);

    async function handleAddComment(e) {
        e.preventDefault();

        if (!commentContent.trim()) {
            setError("Comment content is required.");
            return;
        }

        if (!commentAuthorId.trim()) {
            setError("Author ID is required.");
            return;
        }

        try {
            setSavingComment(true);
            setError("");

            await addComment(id, {
                content: commentContent.trim(),
                author_id: commentAuthorId.trim()
            });

            setCommentContent("");
            await loadPost();
        } catch (err) {
            setError(err.message);
        } finally {
            setSavingComment(false);
        }
    }

    async function handleDeleteComment(commentId) {
        const confirmed = window.confirm("Delete this comment?");

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await deleteComment(id, commentId);
            await loadPost();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDeletePost() {
        const confirmed = window.confirm("Delete this post?");

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await deletePost(id);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    }

    const authorName =
        post && post.author_id && post.author_id.name
            ? post.author_id.name
            : "Unknown author";

    const authorId =
    post && post.author_id
        ? post.author_id._id || post.author_id
        : "";

    return {
        post,
        commentContent,
        setCommentContent,
        commentAuthorId,
        setCommentAuthorId,
        loading,
        savingComment,
        error,
        authorName,
        authorId,
        handleAddComment,
        handleDeleteComment,
        handleDeletePost
    };
}