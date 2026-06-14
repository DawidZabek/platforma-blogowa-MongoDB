// GET POPULAR TAGS
export async function getPopularTags() {
    const response = await fetch("/api/tags/popular");

    if (!response.ok) {
        throw new Error("Failed to fetch popular tags");
    }

    return response.json();
}

// GET AUTHOR STATS
export async function getAuthorStats() {
    const response = await fetch("/api/tags/author-stats");

    if (!response.ok) {
        throw new Error("Failed to fetch author stats");
    }

    return response.json();
}

// GET ALL TAGS
export async function getTags() {
    const response = await fetch("/api/tags");

    if (!response.ok) {
        throw new Error("Failed to fetch tags");
    }

    return response.json();
}