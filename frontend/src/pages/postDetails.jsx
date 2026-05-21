
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

import { usePostDetails } from "../hooks/usePostDetails";

function PostDetails() {
    const {
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
    } = usePostDetails();

    if (loading) {
        return (
            <Container className="py-4">
                <Alert variant="secondary">
                    Ładowanie posta...
                </Alert>
            </Container>
        );
    }

    if (!post) {
        return (
            <Container className="py-4">
                <Alert variant="warning">
                    Nie znaleziono postów
                </Alert>

                <Button as={Link} to="/" variant="outline-primary">
                    Back to posts
                </Button>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-start gap-3">
                        <div>
                            <Button as={Link} to="/" variant="link" className="p-0 mb-3 text-decoration-none">
                                Powrót do listy postów
                            </Button>

                            <p className="text-muted mb-1">
                                Post {authorName} | {authorId}
                            </p>

                            <Card.Title as="h2">
                                {post.content}
                            </Card.Title>
                        </div>

                        <Button variant="outline-danger" onClick={handleDeletePost}>
                            Usuń post
                        </Button>
                    </div>

                    <div className="mb-3">
                        {post.tags?.map((tag) => (
                            <Badge key={tag} bg="light" text="dark" className="me-1">
                                #{tag}
                            </Badge>
                        ))}
                    </div>

                    <Stack direction="horizontal" gap={3} className="text-muted small">
                        <span>{post.comments?.length || 0} komentarze</span>
                        <span>{post.stats?.views || 0} wyświetlenia</span>
                        <span>{post.stats?.likes || 0} like</span>
                    </Stack>
                </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <Card.Title as="h3">
                        Komentarze
                    </Card.Title>

                    {error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )}

                    {post.comments?.length === 0 && (
                        <Alert variant="secondary">
                            Nie ma jeszcze komentarzy
                        </Alert>
                    )}

                    <Stack gap={3}>
                        {post.comments?.map((comment) => (
                            <Card key={comment._id} bg="light">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start gap-3">
                                        <div>
                                            <Card.Text>
                                                {comment.content}
                                            </Card.Text>

                                            <small className="text-muted">
                                                Autor: {comment.author_id?.name} 
                                            </small>
                                        </div>

                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteComment(comment._id)}>
                                            Usuń
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </Stack>
                </Card.Body>
            </Card>

            <Card className="shadow-sm">
                <Card.Body>
                    <Card.Title as="h3">
                        Dodaj nowy komentarz
                    </Card.Title>

                    <Form onSubmit={handleAddComment}>
                        <Form.Group className="mb-3">
                            <Form.Label>Komentarz</Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder="Dodaj komentarz"
                                value={commentContent} onChange={(e) => setCommentContent(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Twoje ID</Form.Label>
                            <Form.Control type="text" placeholder="ID użytkownika"
                                value={commentAuthorId} onChange={(e) => setCommentAuthorId(e.target.value)}/>
                        </Form.Group>

                        <Button type="submit" variant="primary" disabled={savingComment}>
                            {savingComment ? "Dodawanie komentarza..." : "Dodaj komentarz"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default PostDetails;