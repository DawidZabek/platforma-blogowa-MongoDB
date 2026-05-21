
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import PostCard from "../components/PostCard";
import { getPosts } from "../api/postsApi";
import { getPopularTags } from "../api/tagsApi";
import { useHomeData } from "../hooks/useHomeData";

function Home() {
    const {
        posts,
        popularTags,
        selectedTag,
        loading,
        error,
        clearFilter,
        handleTagClick
    } = useHomeData();

    return (
        <Container className="py-4">

            <Card className="shadow-sm">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h2>Wszystkie posty</h2>
                            <p className="text-muted mb-0">
                                {`Wybrany tag: #${selectedTag? selectedTag : ""}`}
                            </p>
                        </div>

                        {selectedTag && (
                            <Button variant="outline-primary" onClick={clearFilter}>
                                Usuń filtry
                            </Button>
                        )}
                    </div>

                    <div className="mb-4">
                        <Button variant={!selectedTag ? "primary" : "outline-primary"} className="me-2 mb-2"
                            onClick={clearFilter}>
                            Wszystko
                        </Button>

                        {popularTags.map((item) => (
                            <Button key={item.tag} variant={selectedTag === item.tag ? "secondary" : "outline-secondary"}
                                className="me-2 mb-2" onClick={() => handleTagClick(item.tag)}>
                                #{item.tag} ({item.count})
                            </Button>
                        ))}
                    </div>

                    {loading && <p className="text-muted">Ładowanie postów...</p>}
                    {error && <Alert variant="danger">{error}</Alert>}

                    {!loading && !error && posts.length === 0 && (
                        <Alert variant="secondary">Nie znaleziono postów</Alert>
                    )}

                    {posts.map((post) => (
                        <Col md={12} key={post._id} className="mb-3">
                            <PostCard post={post} />
                        </Col>
                    ))}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Home;