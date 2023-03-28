import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { SearchResults } from '../Pages/SearchPage';

interface SearchBarProps {
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResults>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setSearchResults,
  setLoading,
}) => {
  const [formData, setFormData] = useState('');

  const searchAnime = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    const parsedText = formData.replaceAll(' ', '+');
    fetch(`/api/anime/search/?filter=${parsedText}`)
      .then((res) => res.json())
      .then((results) => {
        setLoading(false);
        setSearchResults(results);
      });
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



