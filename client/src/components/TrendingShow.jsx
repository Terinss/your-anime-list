import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const TrendingShow = (props) => {
  console.log(props);
  return (
    <Carousel.Item {...props}>
      <img src={props.coverImage} />
      <Carousel.Caption>
        <h3>{props.title}</h3>
        {/* <img src={posterImage} /> */}
      </Carousel.Caption>
    </Carousel.Item>
  );
};

export default TrendingShow;
