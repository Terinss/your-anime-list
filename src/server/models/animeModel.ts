import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const animeSchema = new Schema({
  // title: { type: String, required: true },
  // episodeCount: { type: Number, required: true },
  dbid: { type: Number, required: true, unique: true },
});

export const Anime = mongoose.model('Anime', animeSchema);
