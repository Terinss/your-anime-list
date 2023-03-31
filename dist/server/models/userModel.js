"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=userModel.js.map