import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/trendingshowsdisplay.css';

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
    this.state.anime.forEach((anime, index) => {
      shows.push(
        <Carousel.Item key={`CarouselItem${index}`}>
          <img className="d-block w-100" alt="Slide" src={anime.coverImage} />
          <div id="caption">
            <Carousel.Caption>
              <h3>{anime.title}</h3>
              {/* <img src={posterImage} /> */}
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      );
    });
    return (
      <div className="container-lg text-center my-5">
        <h1>Trending shows</h1>
        <Carousel slide={true} variant="dark">
          {shows}
        </Carousel>
      </div>
    );
  }
}

export default TrendingShowsDisplay;
