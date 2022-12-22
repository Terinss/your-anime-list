import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SearchBar = (props) => {
  const [formData, setFormData] = useState('');

  const searchAnime = (event) => {
    event.preventDefault();
    const parsedText = formData.replaceAll(' ', '+');
    fetch(`/api/anime/search/?filter=${parsedText}`)
      .then((res) => res.json())
      .then((results) => props.setSearchResults(results));
  };

  return (
    <Form onSubmit={searchAnime}>
      <Form.Group>
        <Form.Label>Search Anime:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter anime name"
          onChange={(e) => setFormData(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
