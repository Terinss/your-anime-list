const express = require('express');
const Anime = require('../models/animeModel');
const animeController = require('../controllers/animeController');

const router = express.Router();

router.get('/trending', animeController.getTrendingAnime, (req, res, next) => {
  res.status(200).json(res.locals.trendingAnime);
});

router.get('/yourshows', animeController.getUserShows, (req, res, next) => {
  res.status(200).json(res.locals.userShows);
});

router.get('/search', animeController.searchAnime, (req, res, next) => {
  res.status(200).json(res.locals.data);
});

router.post('/adduseranime', animeController.addUserAnime, (req, res, next) => {
  res.status(200).send('adding anime to your list');
});

router.post(
  '/update',
  animeController.updateEpisodesWatched,
  (req, res, next) => {
    res.status(200).send('Updating episodes watched');
  }
);
module.exports = router;
