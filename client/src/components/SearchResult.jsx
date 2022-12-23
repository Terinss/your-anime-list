import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/Fade';
import { useState } from 'react';
import '../styles/searchresult.css';

const SearchResult = (props) => {
  const [alertStatus, setAlertStatus] = useState(false);
  const deleteSelf = () => {
    const self = document.getElementById(props.id);
    self.remove();
  };

  const addAnimeToList = () => {
    const url = `/api/anime/adduseranime?dbid=${props.dbid}`;
    setAlertStatus(true);
    setTimeout(setAlertStatus, 1000, false);
    fetch(url, { method: 'POST' });
  };

  return (
    <Card id={props.id} className="result-card my-3">
      <Card.Img src={props.coverImage} onError={deleteSelf} />
      <Card.ImgOverlay>
        <Alert
          show={alertStatus}
          variant="success"
          style={{ position: 'absolute' }}
        >
          <Alert.Heading>Added "{props.title}" to your list!</Alert.Heading>
        </Alert>
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
