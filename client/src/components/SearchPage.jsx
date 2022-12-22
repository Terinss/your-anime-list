import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResultsDisplay from './SearchResultsDisplay';

const SeachPage = (props) => {
  const [searchResults, setSearchResults] = useState({
    animeList: [],
    pages: {},
  });

  useEffect(() => {
    console.log(searchResults);
  });

  return (
    <div>
      <SearchBar setSearchResults={setSearchResults} />
      <SearchResultsDisplay searchResults={searchResults} />
    </div>
  );
};

export default SeachPage;
