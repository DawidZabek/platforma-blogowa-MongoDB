import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function PostCard({ post }) {
    const authorName = post.author_id?.name || "Unknown author";
    const shortContent =
        post.content.length > 140
            ? post.content.slice(0, 140) + "..."
            : post.content;

    return (
        <Card className="h-100 shadow-sm">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge bg="primary">{authorName}</Badge>

                    <small className="text-muted">
                        {new Date(post.createdAt).toLocaleString()}
                    </small>
                </div>

                <Card.Title>
                    <Link
                        to={`/posts/${post._id}`}
                        className="text-decoration-none text-dark"
                    >
                        {shortContent}
                    </Link>
                </Card.Title>

                <div className="mb-3">
                    {post.tags?.map((tag) => (
                        <Badge key={tag} bg="light" text="dark" className="me-1">
                            #{tag}
                        </Badge>
                    ))}
                </div>

                <div className="d-flex gap-3 text-muted small">
                    <span>{post.comments?.length || 0} komentarze</span>
                    <span>{post.stats?.views || 0} wyświetlenia</span>
                    <span>{post.stats?.likes || 0} polubienia</span>
                </div>
            </Card.Body>
        </Card>
    );
}

export default PostCard;