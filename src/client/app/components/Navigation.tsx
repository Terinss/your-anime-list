import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import api from './api/api_instance';
import '../styles/nav.css';

const Navigation = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await api.post('/api/users/logout');
    window.location.reload();
  };

  return (
    <Navbar className="nav" expand="lg">
      <Container>
        <Navbar.Brand href="/home" className="nav-logo">
          YourAnimeList
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/home')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/search')}>Search</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
