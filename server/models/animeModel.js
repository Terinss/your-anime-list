const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animeSchema = new Schema({
  // title: { type: String, required: true },
  // episodeCount: { type: Number, required: true },
  dbid: { type: Number, required: true, unique: true },
});

module.exports = mongoose.model('Anime', animeSchema);
