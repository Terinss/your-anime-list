import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import YourAnime from './YourAnime';
import '../styles/youranimedisplay.css';
import { useNavigate } from 'react-router-dom';

const YourAnimeDisplay = (props) => {
  const [showsList, setShowsList] = useState([]);
  const navigate = useNavigate();
  const yourAnimeList = [];

  useEffect(() => {
    const url = '/api/anime/yourshows';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
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
        showsList={showsList}
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
