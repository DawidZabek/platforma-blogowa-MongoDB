import { useEffect, useState } from "react";
import { getPosts } from "../api/postsApi";
import { getPopularTags, getAuthorStats } from "../api/tagsApi";

export function useDashboardData() {
    const [posts, setPosts] = useState([]);
    const [popularTags, setPopularTags] = useState([]);
    const [topAuthors, setTopAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadDashboard() {
        try {
            setLoading(true);
            setError("");

            const [postsData, popularTagsData, authorStatsData] = await Promise.all([
                getPosts(),
                getPopularTags(),
                getAuthorStats()
            ]);

            setPosts(postsData);
            setPopularTags(popularTagsData);
            setTopAuthors(authorStatsData.map(a => ({ name: a.authorName, count: a.postCount })));
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
