import React, { Component } from 'react';
import TrendingShow from './TrendingShow';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

class TrendingShowsDisplay extends Component {
  constructor() {
    super();
    this.state = { anime: [] };
  }

  componentDidMount() {
    fetch('/api/anime/trending')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ anime: data });
      });
  }

  render() {
    console.log(this.state);
    const shows = [];
    this.state.anime.forEach((anime) => {
      shows.push(
        <Carousel.Item>
          <img className="d-block w-100" alt="Slide" src={anime.coverImage} />
          <Carousel.Caption>
            <h3>{anime.title}</h3>
            {/* <img src={posterImage} /> */}
          </Carousel.Caption>
        </Carousel.Item>
      );
    });
    return (
      <div className="container-lg text-center">
        <h1>Trending shows</h1>
        <Carousel fade variant="dark">
          {shows}
        </Carousel>
      </div>
    );
  }
}

export default TrendingShowsDisplay;
