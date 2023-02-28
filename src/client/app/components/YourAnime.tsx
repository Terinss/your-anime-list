import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import type { UserAnime } from './YourAnimeDisplay';
import '../styles/youranime.css';

interface YourAnimeProps {
  dbid: string;
  title: string;
  image: string;
  episodeCount: number;
  index: number;
  episodesWatched: number;
  showsList: UserAnime[];
  setShowsList: React.Dispatch<React.SetStateAction<UserAnime[]>>;
}

const YourAnime: React.FC<YourAnimeProps> = (props) => {
  const saveEpisodes = () => {
    const url = `/api/anime/update?dbid=${props.dbid}&episodes=${props.episodesWatched}`;
    fetch(url, {
      method: 'POST',
    });
  };

  const deleteAnime = () => {
    const url = `/api/anime/deleteuseranime?dbid=${props.dbid}`;
    fetch(url);
    props.showsList.splice(props.index, 1);
    props.setShowsList(props.showsList);
  };

  return (
    <Card className="your-anime">
      <Card.Img src={props.image} />
      <Card.Body>
        <Card.Title className="your-anime-title">{props.title}</Card.Title>
        <Card.Text>
          Episodes Watched: {props.episodesWatched} / {props.episodeCount}
        </Card.Text>
        <div className="my-2 buttons">
          <Button
            variant="danger"
            onClick={() => {
              const newList = [...props.showsList];
              const current = newList[props.index];
              if (current.episodesWatched > 0) {
                current.episodesWatched--;
                props.setShowsList(newList);
              }
            }}
          >
            -
          </Button>
          <Button
            variant="success"
            onClick={() => {
              const newList = [...props.showsList];
              const current = newList[props.index];
              if (current.episodesWatched < props.episodeCount) {
                current.episodesWatched++;
                props.setShowsList(newList);
              }
            }}
          >
            +
          </Button>
        </div>
        <Button onClick={saveEpisodes}>Save</Button>
        <br />
        <Button variant="danger" onClick={deleteAnime}>
          Remove Anime
        </Button>
      </Card.Body>
    </Card>
  );
};

export default YourAnime;
