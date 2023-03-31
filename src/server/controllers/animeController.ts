import { NextFunction, Request, Response } from 'express';
import { Error, Document } from 'mongoose';
import type AnimeInfo from '../interfaces/AnimeInfo';
import { User } from '../models/userModel';

// const fetch = (...args: unknown[]): Promise<unknown> =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));

const options = {
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
};

const animeController = {
  updateEpisodesWatched: (req: Request, res: Response, next: NextFunction) => {
    const { dbid, episodes } = req.query;
    User.findOneAndUpdate(
      { _id: req.cookies.SSID, 'watchingAnime.dbid': dbid },
      { $set: { 'watchingAnime.$.episodesWatched': episodes } },
      { new: true },
      (err, user) => user
    );
  },

  deleteUserAnime: (req: Request, res: Response, next: NextFunction) => {
    const { dbid } = req.query;
    User.findOneAndUpdate(
      { _id: req.cookies.SSID },
      { $pull: { watchingAnime: { dbid: dbid } } },
      { new: true },
      (err, user) => user
    );
  },

  addUserAnime: (req: Request, res: Response, next: NextFunction) => {
    const currentUser = res.locals.currentUser;
    const { dbid } = req.query;
    const url = `https://kitsu.io/api/edge/anime?filter[id]=${dbid}`;
    User.findOneAndUpdate(
      { username: currentUser },
      { $addToSet: { watchingAnime: [{ dbid }] } },
      { new: true },
      (err, user) => {
        user;
      }
    );
  },

  searchAnime: (req: Request, res: Response, next: NextFunction) => {
    let { filter, page } = req.query as unknown as {
      filter: string;
      page: { offset: number; limit: number };
    };
    let filterParam = '';
    if (filter && typeof filter === 'string')
      filterParam = filter.replaceAll(' ', '+');

    const url = page
      ? `https://kitsu.io/api/edge/anime?page[limit]=${page.limit}&page[offset]=${page.offset}&filter[text]=${filterParam}`
      : `https://kitsu.io/api/edge/anime?page[limit]=20&filter[text]=${filterParam}`;

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        const filteredData: { animeList: any[]; pages: any } = {
          animeList: [],
          pages: {},
        };
        data.data.forEach((anime: any) => {
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

  getUserShows: (req: Request, res: Response, next: NextFunction) => {
    const userShows: Record<string, string>[] = [];
    const currentUser = res.locals.currentUser;
    User.findOne({ username: currentUser }).then((user: any) => {
      const userShowIds: number[] = [];
      user.watchingAnime.forEach((ele: any) => userShowIds.push(ele.dbid));
      const userShowsPromises: Promise<unknown>[] = [];
      const idFilterObj: Record<number, boolean> = {};
      userShowIds.forEach((id: number) => {
        const url = `https://kitsu.io/api/edge/anime?filter[id]=${id}`;
        userShowsPromises.push(fetch(url, options));
        idFilterObj[id] = true;
      });
      Promise.all(userShowsPromises)
        .then((responses) => Promise.all(responses.map((r: any) => r.json())))
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

  getTrendingAnime: (req: Request, res: Response, next: NextFunction) => {
    const url = 'https://kitsu.io/api/edge/trending/anime?page[20]';
    const animeInfo: AnimeInfo[] = [];
    fetch(url, options)
      .then((response) => response.json())
      .then((parsedInfo) => {
        parsedInfo.data.forEach((anime: Record<string, any>) => {
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

export default animeController;
