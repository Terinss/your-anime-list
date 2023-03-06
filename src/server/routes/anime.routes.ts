import express from 'express';
import animeController from '../controllers/animeController';
import authController from '../controllers/authController';

const router = express.Router();

router.get('/trending', animeController.getTrendingAnime, (req, res, next) => {
  res.status(200).json(res.locals.trendingAnime);
});

router.get(
  '/yourshows',
  authController.verify,
  animeController.getUserShows,
  (req, res, next) => {
    res.status(200).json(res.locals.userShows);
  }
);

router.get('/search', animeController.searchAnime, (req, res, next) => {
  res.status(200).json(res.locals.data);
});

router.post(
  '/adduseranime',
  authController.verify,
  animeController.addUserAnime,
  (req, res, next) => {
    res.status(200).send('adding anime to your list');
  }
);

router.get(
  '/deleteuseranime',
  animeController.deleteUserAnime,
  (req, res, next) => {
    res.status(200).send('deleted anime from your list');
  }
);

router.post(
  '/update',
  animeController.updateEpisodesWatched,
  (req, res, next) => {
    res.status(200).send('Updating episodes watched');
  }
);

export default router;
