import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import '../styles/nav.css';

const Navigation = () => {
  const navigate = useNavigate();
  const logout = () => {
    fetch('http://api.terrence.io/api/users/logout');
    navigate('/');
  };

  return (
    <Navbar className="nav" expand="lg">
      <Container>
        <Navbar.Brand href="/home" className="nav-logo">
          YourAnimeList
        </Navbar.Brand>
        <div className="nav-buttons">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/home')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/search')}>Search</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;
