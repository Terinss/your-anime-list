import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import '../styles/nav.css';

const Navigation = (props) => {
  const navigate = useNavigate();
  const logout = () => {
    fetch('/api/users/logout');
    navigate('/');
  };

  return (
    <Navbar className="nav" expand="lg">
      <Container>
        <Navbar.Brand href="/">YourAnimeList</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
