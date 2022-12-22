import React from 'react';
import SearchResult from './SearchResult';

const SearchResultsDisplay = (props) => {
  const resultsList = [];
  console.log('SearchResultsDisplay', props);
  let willPush = true;
  const expectedProps = [
    'title',
    'image',
    'synopsis',
    'status',
    'episodeCount',
    'coverImage',
  ];
  props.searchResults.animeList.forEach((anime, index) => {
    for (const prop of expectedProps) {
      if (!anime[prop]) willPush = false;
    }
    if (willPush) {
      resultsList.push(
        <SearchResult
          title={anime.title}
          image={anime.image}
          synopsis={anime.synopsis}
          status={anime.status}
          episodeCount={anime.episodeCount}
          coverImage={anime.coverImage}
          dbid={anime.id}
          key={`SearchResult${index}`}
          id={`SearchResult${index}`}
        />
      );
    }
    willPush = true;
  });
  return <div>{resultsList}</div>;
};

export default SearchResultsDisplay;
