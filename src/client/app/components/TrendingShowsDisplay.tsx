import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import type { Anime } from './SearchPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/trendingshowsdisplay.css';

const TrendingShowsDisplay = () => {
  const [anime, setAnime] = useState<Anime[]>([]);

  useEffect(() => {
    fetch('/api/anime/trending')
      .then((res) => res.json())
      .then(({ data }) => {
        setAnime(data);
      });
  }, []);

  const shows: JSX.Element[] = [];

  if (Array.isArray(anime)) {
    anime.forEach((anime, index) => {
      shows.push(
        <Carousel.Item key={`CarouselItem${index}`}>
          <img className="d-block w-100" alt="Slide" src={anime.coverImage} />
          <div id="caption">
            <Carousel.Caption>
              <h3>{anime.title}</h3>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      );
    });
  }

  return (
    <div className="container-lg text-center my-5">
      <h1>Trending shows</h1>
      <Carousel slide={true} variant="dark">
        {shows}
      </Carousel>
    </div>
  );
};

export default TrendingShowsDisplay;
