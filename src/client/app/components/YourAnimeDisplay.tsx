import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import YourAnime from './YourAnime';
import '../styles/youranimedisplay.css';
import { useNavigate } from 'react-router-dom';
import { SearchResultType } from './SearchResult';

export interface UserAnime extends SearchResultType {
  episodesWatched: number;
}

const YourAnimeDisplay = () => {
  const [showsList, setShowsList] = useState<UserAnime[]>([]);
  const navigate = useNavigate();
  const yourAnimeList: JSX.Element[] = [];

  useEffect(() => {
    const url = '/api/anime/yourshows';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('data:' + data);
        if (data.length !== showsList.length) {
          setShowsList(data);
          console.log(data);
        }
      });
  }, []);

  showsList.forEach((show, index) => {
    yourAnimeList.push(
      <YourAnime
        dbid={show.dbid}
        title={show.title}
        image={show.image}
        episodesWatched={show.episodesWatched}
        episodeCount={show.episodeCount}
        showsList={[...showsList]}
        setShowsList={setShowsList}
        index={index}
      ></YourAnime>
    );
  });

  return (
    <section className="text-center container your-anime-display">
      <div className="your-anime-display-header">
        <h2>Your Shows</h2>
        <Button variant="success" onClick={() => navigate('/search')}>
          Add New Anime
        </Button>
      </div>
      <div className="your-anime-display-items">{yourAnimeList}</div>
    </section>
  );
};

export default YourAnimeDisplay;
