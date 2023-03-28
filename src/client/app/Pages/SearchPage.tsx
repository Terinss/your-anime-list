import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResultsDisplay from '../components/SearchResultsDisplay';
import Button from 'react-bootstrap/Button';
import '../styles/searchpage.css';

export interface Anime {
  id: string;
  title: string;
  image: string;
  coverImage: string;
  synopsis: string;
  status: string;
  episodeCount: number;
}

export interface SearchResults {
  animeList: Array<Anime>;
  pages: { first: string; next: string; last: string };
}

const initialSearchResults: SearchResults = {
  animeList: [],
  pages: { first: '', next: '', last: '' },
};

const SeachPage = () => {
  const [searchResults, setSearchResults] = useState(initialSearchResults);
  const [loading, setLoading] = useState(false);
  const changePage = (url: string, event: React.SyntheticEvent): void => {
    event.preventDefault();
    console.log(url);
    fetch(`/api/anime/search/?url=${url}`)
      .then((res) => res.json())
      .then((results) => {
        setSearchResults(results);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="search-area">
      <SearchBar setSearchResults={setSearchResults} setLoading={setLoading} />
      <div id="buttons-div">
        <Button onClick={(e) => changePage(searchResults.pages.first, e)}>
          First Page
        </Button>
        <Button onClick={(e) => changePage(searchResults.pages.next, e)}>
          Next Page
        </Button>
        <Button onClick={(e) => changePage(searchResults.pages.last, e)}>
          Last Page
        </Button>
      </div>
      <SearchResultsDisplay searchResults={searchResults} loading={loading} />
    </div>
  );
};

export default SeachPage;
