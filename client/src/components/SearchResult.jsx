import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/searchresult.css';

const SearchResult = (props) => {
  const deleteSelf = () => {
    const self = document.getElementById(props.id);
    self.remove();
  };

  const addAnimeToList = () => {
    const url = `/api/anime/adduseranime?dbid=${props.dbid}`;
    fetch(url, { method: 'POST' })
      .then((res) => res.text())
      .then((text) => console.log(text));
  };

  return (
    <Card id={props.id} className="result-card">
      <Card.Img src={props.coverImage} onError={deleteSelf} />
      <Card.ImgOverlay>
        <div className="result-card-text">
          <Card.Title>{props.title}</Card.Title>
          <Card.Subtitle>Status: {props.status}</Card.Subtitle>
          <Card.Text>{props.synopsis}</Card.Text>
        </div>
        <Button variant="success" onClick={addAnimeToList}>
          Add to My List
        </Button>
      </Card.ImgOverlay>
    </Card>
  );
};

export default SearchResult;
