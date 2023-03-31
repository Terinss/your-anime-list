"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
// Login route
router.post('/login', authController_1.default.login, (req, res, next) => {
    res.status(200).json({ success: true, currentUser: res.locals.currentUser });
});
router.post('/logout', authController_1.default.verify, authController_1.default.logout, (req, res) => {
    res.status(200).json({ success: true, message: 'Successfully logged out' });
});
router.post('/signup', authController_1.default.signup, (req, res) => {
    res.status(200).json({ success: true, message: 'User created' });
});
router.get('/auth', authController_1.default.verify, (req, res) => {
    res.status(200).json({ success: true, currentUser: res.locals.currentUser });
});
exports.default = router;
//# sourceMappingURL=users.routes.js.map