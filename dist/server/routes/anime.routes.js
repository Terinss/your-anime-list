"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const animeController_1 = __importDefault(require("../controllers/animeController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
router.get('/trending', animeController_1.default.getTrendingAnime, (req, res, next) => {
    res.status(200).json(res.locals.trendingAnime);
});
router.get('/yourshows', authController_1.default.verify, animeController_1.default.getUserShows, (req, res, next) => {
    res.status(200).json(res.locals.userShows);
});
router.get('/search', animeController_1.default.searchAnime, (req, res, next) => {
    res.status(200).json(res.locals.data);
});
router.post('/adduseranime', authController_1.default.verify, animeController_1.default.addUserAnime, (req, res, next) => {
    res.status(200).send('adding anime to your list');
});
router.get('/deleteuseranime', animeController_1.default.deleteUserAnime, (req, res, next) => {
    res.status(200).send('deleted anime from your list');
});
router.post('/update', animeController_1.default.updateEpisodesWatched, (req, res, next) => {
    res.status(200).send('Updating episodes watched');
});
exports.default = router;
//# sourceMappingURL=anime.routes.js.map