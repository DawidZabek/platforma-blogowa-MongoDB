import { useState } from "react";
import { createPost } from "../api/postsApi";

export function useNewPostData(onPostCreated) {
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!content.trim()) {
            setError("Post content is required.");
            return;
        }

        if (!authorId.trim()) {
            setError("Author ID is required.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            await createPost({
                content: content.trim(),
                tags: tags
                    .split(",")
                    .map((tag) => tag.trim().toLowerCase())
                    .filter(Boolean),
                author_id: authorId.trim()
            });

            setContent("");
            setTags("");
            setAuthorId("");

            if (onPostCreated) {
                onPostCreated();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    return {
        content,
        setContent,
        tags,
        setTags,
        authorId,
        setAuthorId,
        error,
        saving,
        handleSubmit
    };
}