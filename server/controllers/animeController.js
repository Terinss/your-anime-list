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
  // let oldWatched;
  // User.findOne(
  //   { id: req.cookies.SSID },
  //   (err, user) => (oldWatched = user.watchingAnime)
  // );
  console.log(dbid, episodes);
  console.log('in episodes', req.query);
  User.findOneAndUpdate(
    { _id: req.cookies.SSID, 'watchingAnime.dbid': dbid },
    { $set: { 'watchingAnime.$.episodesWatched': episodes } },
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
      console.log(user);
    }
  );
  // fetch(url, options)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     const fields = data.data[0].attributes;
  //     Anime.create(
  //       { title: fields.titles.en, episodeCount: fields.episodeCount, dbid },
  //       (err, anime) => {
  //         console.log('New anime created', anime);
  //       }
  //     );
  //   });
};

animeController.searchAnime = (req, res, next) => {
  let { filter } = req.query;
  filterParam = filter.replaceAll(' ', '+');
  const expectedProps = [
    'title',
    'image',
    'synopsis',
    'status',
    'episodeCount',
    'coverImage',
  ];
  let toPush = true;
  const url = `https://kitsu.io/api/edge/anime?page[limit]=20&filter[text]=${filterParam}`;
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      const filteredData = { animeList: [], pages: {} };
      data.data.forEach((anime) => {
        const fields = anime.attributes;
        filteredData.animeList.push({
          id: anime.id,
          title: fields.titles.en,
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
  User.findOne({ _id: req.cookies.SSID }).then((user) => {
    const userShowIds = [];
    user.watchingAnime.forEach((ele) => userShowIds.push(ele.dbid));
    const userShowsPromises = [];
    console.log(user);
    console.log(userShowIds);
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
            title: attributes.titles.en,
            image: attributes.posterImage.medium,
            episodesWatched: user.watchingAnime[index].episodesWatched,
          });
        });
        res.locals.userShows = userShows;
        console.log(res.locals.userShows);
        return next();
      });
  });
};

animeController.getTrendingAnime = (req, res, next) => {
  console.log('in get trending anime');
  const url = 'https://kitsu.io/api/edge/trending/anime?page[20]';
  const animeInfo = [];
  console.log('about to fetch trending anime');
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

// fetch(url, options)
//         .then((response) => response.json())
//         .then((data) => {
//           data.data.forEach((show) => {
//             userShows.push({
//               title: show.attributes.titles.en,
//               image: show.attributes.posterImage.medium,
//             });
//           });
//           res.locals.userShows = userShows;
//           return next();
//         })
//         .catch((err) =>
//           next({
//             log: `Error in animeController.getUserShows ${err}`,
//             status: 500,
//             message: { err: err },
//           })
//         );
