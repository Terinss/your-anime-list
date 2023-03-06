import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: String, default: new mongoose.Types.ObjectId() },
  username: { type: String, required: true },
  password: { type: String, required: true },
  watchingAnime: [
    {
      dbid: { type: Number, required: true, unique: true },
      episodesWatched: { type: Number, default: 0 },
    },
  ],
});

export const User = mongoose.model('User', userSchema);
