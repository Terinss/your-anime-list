"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const anime_routes_1 = __importDefault(require("./routes/anime.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 1234;
const mongoURI = process.env.MONGO_URI;
mongoose_1.default
    .connect(mongoURI)
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch((err) => {
    console.log('Error connecting to MongoDB: ', err);
});
// Routers to parse incoming requests
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ credentials: true, origin: 'https://yal.terrence.io' }));
// Health check
app.use('/health', (req, res) => {
    res.sendStatus(200);
});
// Test router
app.use('/api/users', users_routes_1.default);
// Test anilist api
app.use('/api/anime', anime_routes_1.default, (req, res) => {
    res.status(200).json(res.locals.data);
});
// Catch all request handler
app.use((req, res) => {
    res.status(404).send('Not found');
});
// Global error handler
app.use((err, req, res, next) => {
    const defaultError = {
        log: 'Express error handle caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultError, err);
    console.log('error: ', errorObj.log);
    res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
//# sourceMappingURL=server.js.map