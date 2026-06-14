import { useEffect, useState } from "react";
import { getPosts } from "../api/postsApi";
import { getPopularTags } from "../api/tagsApi";

export function useHomeData() {
    const [posts, setPosts] = useState([]);
    const [popularTags, setPopularTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadPosts(tag = "") {
        try {
            setLoading(true);
            setError("");

            const data = await getPosts(tag);

            setPosts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function loadPopularTags() {
        try {
            const data = await getPopularTags();

            setPopularTags(data);
        } catch (err) {
            console.error(err);
        }
    }

    function clearFilter() {
        setSelectedTag("");
        loadPosts();
    }

    function handleTagClick(tag) {
        const nextTag = selectedTag === tag ? "" : tag;

        setSelectedTag(nextTag);
        loadPosts(nextTag);
    }

    useEffect(() => {
        loadPosts();
        loadPopularTags();
    }, []);

    return {
        posts,
        popularTags,
        selectedTag,
        loading,
        error,
        clearFilter,
        handleTagClick
    };
}