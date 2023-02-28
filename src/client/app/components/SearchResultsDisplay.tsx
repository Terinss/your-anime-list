import React from 'react';
import SearchResult from './SearchResult';
import type { SearchResults } from './SearchPage';

interface SearchResultsDisplayProps {
  searchResults: SearchResults;
}

const SearchResultsDisplay: React.FC<SearchResultsDisplayProps> = ({
  searchResults,
}) => {
  const resultsList: JSX.Element[] = [];
  let willPush = true;
  const expectedProps = [
    'title',
    'image',
    'synopsis',
    'status',
    'episodeCount',
    'coverImage',
  ];
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
          dbid={`SearchResult${index}`}
        />
      );
    }
    willPush = true;
  });
  console.log(resultsList);
  return <div>{resultsList}</div>;
};

export default SearchResultsDisplay;
