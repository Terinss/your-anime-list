import React from 'react';
import SearchResult from './SearchResult';
import Loader from './Loader';
import type { SearchResults } from '../Pages/SearchPage';

interface SearchResultsDisplayProps {
  searchResults: SearchResults;
  loading: boolean;
}

const SearchResultsDisplay: React.FC<SearchResultsDisplayProps> = ({
  searchResults,
  loading,
}) => {
  const resultsList: JSX.Element[] = [];
  let willPush = true;
  searchResults.animeList.forEach((anime, index) => {
    // for (const prop of expectedProps) {
    if (!anime['image']) willPush = false;
    // }
    if (willPush) {
      resultsList.push(
        <SearchResult
          title={anime.title}
          image={anime.image}
          synopsis={anime.synopsis}
          status={anime.status}
          episodeCount={anime.episodeCount}
          coverImage={anime.coverImage}
          id={anime.id}
          key={`SearchResult${index}`}
          dbid={anime.id}
        />
      );
    }
    willPush = true;
  });
  return loading ? <Loader /> : <div>{resultsList}</div>;
};

export default SearchResultsDisplay;
