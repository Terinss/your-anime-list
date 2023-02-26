import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResultsDisplay from './SearchResultsDisplay';
import Button from 'react-bootstrap/Button';
import '../styles/searchresult.css';

const SeachPage = (props) => {
  const [searchResults, setSearchResults] = useState({
    animeList: [],
    pages: {},
  });

  const options = {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  };

  const changePage = (url) => {
    event.preventDefault();
    console.log(url);
    fetch(`/api/anime/search/?url=${url}`)
      .then((res) => res.json())
      .then((results) => {
        setSearchResults(results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // console.log('pages: ', searchResults.pages);
  });

  return (
    <div>
      <SearchBar setSearchResults={setSearchResults} />
      <div id="buttons-div">
        <Button onClick={() => changePage(searchResults.pages.first)}>
          First Page
        </Button>
        <Button onClick={() => changePage(searchResults.pages.next)}>
          Next Page
        </Button>
        <Button onClick={() => changePage(searchResults.pages.last)}>
          Last Page
        </Button>
      </div>
      <SearchResultsDisplay searchResults={searchResults} />
    </div>
  );
};

export default SeachPage;
