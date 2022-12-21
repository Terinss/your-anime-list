const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  episodes: { type: String, required: true },
  coverImage: { type: String, required: false },
});

module.exports = mongoose.model('Anime', animeSchema);
