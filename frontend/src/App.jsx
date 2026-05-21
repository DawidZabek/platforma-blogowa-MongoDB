import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <BrowserRouter>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">
                        elektroda forum
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="main-navbar" />

                    <Navbar.Collapse id="main-navbar">
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to="/">Posty</Nav.Link>
                            <Nav.Link as={NavLink} to="/posts/new">Dodaj posta</Nav.Link>
                            <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/posts/new" element={<CreatePost/>} />
                <Route path="/posts/:id" element={<PostDetails/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;