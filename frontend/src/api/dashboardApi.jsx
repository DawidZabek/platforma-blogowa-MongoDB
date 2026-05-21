import { getPosts } from "./postsApi";
import { getPopularTags } from "./tagsApi";

// GET POSTS AND POP TAGS
export async function getDashboardData() {
    const [postsData, tagsData] = await Promise.all([
        getPosts(), // fetch postów
        getPopularTags() // fetch najpopularniejszych tagów
    ]);

    if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
    }

    return {
        posts: postsData,
        popularTags: tagsData
    };
}