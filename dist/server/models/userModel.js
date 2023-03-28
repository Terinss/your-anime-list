"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    _id: { type: String, default: new mongoose_1.default.Types.ObjectId() },
    username: { type: String, required: true },
    password: { type: String, required: true },
    watchingAnime: [
        {
            dbid: { type: Number, required: true, unique: true },
            episodesWatched: { type: Number, default: 0 },
        },
    ],
});
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=userModel.js.map