"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
// const fetch = (...args: unknown[]): Promise<unknown> =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));
const options = {
    headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
    },
};
const animeController = {
    updateEpisodesWatched: (req, res, next) => {
        const { dbid, episodes } = req.query;
        userModel_1.User.findOneAndUpdate({ _id: req.cookies.SSID, 'watchingAnime.dbid': dbid }, { $set: { 'watchingAnime.$.episodesWatched': episodes } }, { new: true }, (err, user) => user);
    },
    deleteUserAnime: (req, res, next) => {
        const { dbid } = req.query;
        userModel_1.User.findOneAndUpdate({ _id: req.cookies.SSID }, { $pull: { watchingAnime: { dbid: dbid } } }, { new: true }, (err, user) => user);
    },
    addUserAnime: (req, res, next) => {
        const currentUser = res.locals.currentUser;
        const { dbid } = req.query;
        const url = `https://kitsu.io/api/edge/anime?filter[id]=${dbid}`;
        userModel_1.User.findOneAndUpdate({ username: currentUser }, { $addToSet: { watchingAnime: [{ dbid }] } }, { new: true }, (err, user) => {
            user;
        });
    },
    searchAnime: (req, res, next) => {
        let { filter, page } = req.query;
        let filterParam = '';
        if (filter && typeof filter === 'string')
            filterParam = filter.replaceAll(' ', '+');
        const url = page
            ? `https://kitsu.io/api/edge/anime?page[limit]=${page.limit}&page[offset]=${page.offset}&filter[text]=${filterParam}`
            : `https://kitsu.io/api/edge/anime?page[limit]=20&filter[text]=${filterParam}`;
        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
            const filteredData = {
                animeList: [],
                pages: {},
            };
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
    },
    getUserShows: (req, res, next) => {
        const userShows = [];
        const currentUser = res.locals.currentUser;
        userModel_1.User.findOne({ username: currentUser }).then((user) => {
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
    },
    getTrendingAnime: (req, res, next) => {
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
    },
};
exports.default = animeController;
//# sourceMappingURL=animeController.js.map