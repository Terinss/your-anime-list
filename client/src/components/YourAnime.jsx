import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/youranime.css';

const YourAnime = (props) => {
  const saveEpisodes = () => {
    const url = `/api/anime/update?dbid=${props.dbid}&episodes=${props.episodesWatched}`;
    fetch(url, {
      method: 'POST',
    });
  };

  return (
    <Card className="your-anime">
      <Card.Img src={props.image} />
      <Card.Body>
        <Card.Title className="your-anime-title">{props.title}</Card.Title>
        <Card.Text>Episodes Watched: {props.episodesWatched}</Card.Text>
        <div className="my-2 buttons">
          <Button
            variant="danger"
            onClick={() => {
              const newList = [...props.showsList];
              newList[props.index].episodesWatched--;
              props.setShowsList(newList);
            }}
          >
            -
          </Button>
          <Button
            variant="success"
            onClick={() => {
              const newList = [...props.showsList];
              newList[props.index].episodesWatched++;
              props.setShowsList(newList);
            }}
          >
            +
          </Button>
        </div>
        <Button onClick={saveEpisodes}>Save</Button>
      </Card.Body>
    </Card>
  );
};

export default YourAnime;

{
  /* <div class="yourAnime">
      <h4 className="your-anime-title">{props.title}</h4>
      <img src={props.image} />
    </div> */
}