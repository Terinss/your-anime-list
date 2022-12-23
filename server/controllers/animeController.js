const { json } = require('express');
const express = require('express');
const Anime = require('../models/animeModel');
const User = require('../models/userModel');
const ObjectId = require('mongoose').Types.ObjectId;

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const animeController = {};

const options = {
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
};

animeController.updateEpisodesWatched = (req, res, next) => {
  const { dbid, episodes } = req.query;
  User.findOneAndUpdate(
    { _id: req.cookies.SSID, 'watchingAnime.dbid': dbid },
    { $set: { 'watchingAnime.$.episodesWatched': episodes } },
    { new: true },
    (err, user) => user
  );
};

animeController.deleteUserAnime = (req, res, next) => {
  const { dbid } = req.query;
  console.log(dbid);
  User.findOneAndUpdate(
    { _id: req.cookies.SSID },
    { $pull: { watchingAnime: { dbid: dbid } } },
    { new: true },
    (err, user) => console.log(user)
  );
};

animeController.addUserAnime = (req, res, next) => {
  const { dbid } = req.query;
  const url = `https://kitsu.io/api/edge/anime?filter[id]=${dbid}`;
  User.findOneAndUpdate(
    { _id: req.cookies.SSID },
    { $addToSet: { watchingAnime: [{ dbid }] } },
    { new: true },
    (err, user) => {
      user;
    }
  );
};

animeController.searchAnime = (req, res, next) => {
  console.log(req.query);
  console.log(req.query.page, typeof req.query.page);

  let filter = req.query.filter;
  if (filter) filterParam = filter.replaceAll(' ', '+');

  const expectedProps = [
    'title',
    'image',
    'synopsis',
    'status',
    'episodeCount',
    'coverImage',
  ];
  const url = req.query.page
    ? `https://kitsu.io/api/edge/anime?page[limit]=${req.query.page.limit}&page[offset]=${req.query.page.offset}&filter[text]=${filterParam}`
    : `https://kitsu.io/api/edge/anime?page[limit]=20&filter[text]=${filterParam}`;

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      const filteredData = { animeList: [], pages: {} };
      data.data.forEach((anime) => {
        const fields = anime.attributes;
        filteredData.animeList.push({
          id: anime.id,
          title: fields.canonicalTitle,
          image: fields.posterImage.original,
          coverImage: fields.coverImage ? fields.coverImage.large : null,
          synopsis: fields.synopsis,
          status: fields.status,
          episodeCount: fields.episodeCount,
        });
      });
      filteredData.pages = { ...data.links };
      res.locals.data = filteredData;
      return next();
    });
};

animeController.getUserShows = (req, res, next) => {
  const userShows = [];
  if (!req.cookies.SSID) {
    res.locals.userShows = [];
    return next();
  }
  User.findOne({ _id: req.cookies.SSID }).then((user) => {
    const userShowIds = [];
    user.watchingAnime.forEach((ele) => userShowIds.push(ele.dbid));
    const userShowsPromises = [];
    const idFilterObj = {};
    userShowIds.forEach((id) => {
      const url = `https://kitsu.io/api/edge/anime?filter[id]=${id}`;
      userShowsPromises.push(fetch(url, options));
      idFilterObj[id] = true;
    });
    Promise.all(userShowsPromises)
      .then((responses) => Promise.all(responses.map((r) => r.json())))
      .then((data) => {
        data.forEach((obj, index) => {
          const attributes = obj.data[0].attributes;
          userShows.push({
            dbid: user.watchingAnime[index].dbid,
            title: attributes.canonicalTitle,
            image: attributes.posterImage.medium,
            episodeCount: attributes.episodeCount,
            episodesWatched: user.watchingAnime[index].episodesWatched,
          });
        });
        res.locals.userShows = userShows;
        return next();
      });
  });
};

animeController.getTrendingAnime = (req, res, next) => {
  const url = 'https://kitsu.io/api/edge/trending/anime?page[20]';
  const animeInfo = [];
  fetch(url, options)
    .then((response) => response.json())
    .then((parsedInfo) => {
      parsedInfo.data.forEach((anime) => {
        animeInfo.push({
          title: anime.attributes.canonicalTitle,
          coverImage: anime.attributes.coverImage.large,
          posterImage: anime.attributes.posterImage.original,
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
