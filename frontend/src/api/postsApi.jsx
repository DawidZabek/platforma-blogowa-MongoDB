
// GET ALL POSTS / BY TAG
export async function getPosts(tag = "") {
    const url = tag ? `/api/posts?tag=${encodeURIComponent(tag)}` : "/api/posts";
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    return response.json();
}

// GET ONE POST / BY ID
export async function getPostById(postId) {
    const url = `/api/posts/${postId}`
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch post");
    }

    return response.json();
}

// CREATE POST
export async function createPost(postData) {
    const url = "/api/posts"
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        throw new Error("Failed to create a post");
    }

    return response.json();
}

// DELETE POST
export async function deletePost(postId) {
    const url = `/api/posts/${postId}`
    const response = await fetch(url, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete a post");
    }

    return response.json();
}

// COMMENTS

// ADD COMMENT
export async function addComment(postId, commentData) {
    const url = `/api/posts/${postId}/comments`
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentData)
    });

    if (!response.ok) {
        throw new Error("Failed to add a comment");
    }

    return response.json();
}

// DELETE COMMENT
export async function deleteComment(postId, commentId) {
    const url = `/api/posts/${postId}/comments/${commentId}`
    const response = await fetch(url, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete a comment");
    }

    return response.json();
}