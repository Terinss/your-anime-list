const express = require('express');
const Anime = require('../models/animeModel');
const animeController = require('../controllers/animeController');

const router = express.Router();

router.get('/trending', animeController.getTrendingAnime, (req, res, next) => {
  res.status(200).json(res.locals.trendingAnime);
});

module.exports = router;
