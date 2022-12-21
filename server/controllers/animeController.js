const express = require('express');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const animeController = {};

animeController.getTrendingAnime = (req, res, next) => {
  console.log('in get trending anime');
  const url = 'https://kitsu.io/api/edge/trending/anime?page[20]';
  const options = {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
  };
  const animeInfo = [];
  console.log('about to fetch trending anime');
  fetch(url, options)
    .then((response) => response.json())
    .then((parsedInfo) => {
      console.log(parsedInfo.data[0].attributes.posterImage);
      parsedInfo.data.forEach((anime) => {
        animeInfo.push({
          title: anime.attributes.canonicalTitle,
          coverImage: anime.attributes.coverImage.small,
          posterImage: anime.attributes.posterImage.medium,
          synopsis: anime.attributes.synopsis,
          episodeCount: anime.attributes.episodeCount,
        });
      });
      res.locals.trendingAnime = animeInfo;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error occurred in animeController.getTrendingAnime: ${err}`,
        status: 401,
        message: { err: err },
      });
    });
};

module.exports = animeController;
