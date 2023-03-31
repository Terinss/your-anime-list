import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // _id: { type: String, default: new mongoose.Types.ObjectId(), unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  watchingAnime: {
    type: [
      {
        dbid: { type: Number },
        episodesWatched: { type: Number, default: 0 },
      },
    ],
    default: [],
  },
});

export const User = mongoose.model('User', userSchema);
