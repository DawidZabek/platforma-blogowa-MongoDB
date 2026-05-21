
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

import { useDashboardData } from "../hooks/useDashboardData";

function Dashboard() {
    const {
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
    } = useDashboardData();

    return (
        <Container className="py-4">
            <Card className="shadow-sm">
                <Card.Body>
                    <Card.Title as="h2">
                        Dashboard
                    </Card.Title>

                    {loading && (
                        <Alert variant="secondary">
                            Ładowanie dashboardu...
                        </Alert>
                    )}

                    {error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )}

                    {!loading && !error && (
                        <>
                            <Row className="g-3 my-3">
                                <Col md={3}>
                                    <Card bg="light">
                                        <Card.Body>
                                            <Card.Subtitle className="text-muted">
                                                Liczba wszystkich postów
                                            </Card.Subtitle>

                                            <Card.Title as="h2">
                                                {totalPosts}
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={3}>
                                    <Card bg="light">
                                        <Card.Body>
                                            <Card.Subtitle className="text-muted">
                                                Liczba wszystkich komentarzy
                                            </Card.Subtitle>

                                            <Card.Title as="h2">
                                                {totalComments}
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={3}>
                                    <Card bg="light">
                                        <Card.Body>
                                            <Card.Subtitle className="text-muted">
                                                Liczba wyświetleń
                                            </Card.Subtitle>

                                            <Card.Title as="h2">
                                                {totalViews}
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={3}>
                                    <Card bg="light">
                                        <Card.Body>
                                            <Card.Subtitle className="text-muted">
                                                Liczba wszystkich like'ów
                                            </Card.Subtitle>

                                            <Card.Title as="h2">
                                                {totalLikes}
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <Row className="g-4 mt-2">
                                <Col md={6}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title as="h3">
                                                Popularne tagi
                                            </Card.Title>

                                            {popularTags.length === 0 && (
                                                <Alert variant="secondary">
                                                    Nie znaleziono tagów
                                                </Alert>
                                            )}

                                            <ListGroup>
                                                {popularTags.map((item, index) => (
                                                    <ListGroup.Item
                                                        key={item.tag}
                                                        className="d-flex justify-content-between align-items-center">
                                                        <span>
                                                            <Badge bg="primary" className="me-2">
                                                                {index + 1}
                                                            </Badge>
                                                            #{item.tag}
                                                        </span>

                                                        <Badge bg="secondary">
                                                            {item.count} posty
                                                        </Badge>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title as="h3">
                                                Najaktywniejszy autorzy
                                            </Card.Title>

                                            {topAuthors.length === 0 && (
                                                <Alert variant="secondary">
                                                    Nie znaleziono autorów
                                                </Alert>
                                            )}

                                            <ListGroup>
                                                {topAuthors.map((author, index) => (
                                                    <ListGroup.Item
                                                        key={author.name}
                                                        className="d-flex justify-content-between align-items-center">
                                                        <span>
                                                            <Badge bg="primary" className="me-2">
                                                                {index + 1}
                                                            </Badge>
                                                            {author.name}
                                                        </span>

                                                        <Badge bg="secondary">
                                                            {author.count} posty
                                                        </Badge>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Dashboard;