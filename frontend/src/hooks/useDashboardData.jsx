import { useEffect, useState } from "react";
import { getPosts } from "../api/postsApi";
import { getPopularTags } from "../api/tagsApi";

export function useDashboardData() {
    const [posts, setPosts] = useState([]);
    const [popularTags, setPopularTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadDashboard() {
        try {
            setLoading(true);
            setError("");

            const [postsData, popularTagsData] = await Promise.all([
                getPosts(),
                getPopularTags()
            ]);

            setPosts(postsData);
            setPopularTags(popularTagsData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDashboard();
    }, []);

    const totalPosts = posts.length;

    const totalComments = posts.reduce((sum, post) => {
        return sum + (post.comments ? post.comments.length : 0);
    }, 0);

    const totalViews = posts.reduce((sum, post) => {
        return sum + (post.stats ? post.stats.views : 0);
    }, 0);

    const totalLikes = posts.reduce((sum, post) => {
        return sum + (post.stats ? post.stats.likes : 0);
    }, 0);

    const topAuthor = posts.reduce((count, post) => {
        const authorName =
            post.author_id && post.author_id.name
                ? post.author_id.name
                : "Unknown author";

        count[authorName] = count[authorName] ? count[authorName] + 1 : 1;

        return count;
    }, {});

    const topAuthors = Object.entries(topAuthor)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

    return {
        posts,
        popularTags,
        loading,
        error,
        totalPosts,
        totalComments,
        totalViews,
        totalLikes,
        topAuthors,
        loadDashboard
    };
}