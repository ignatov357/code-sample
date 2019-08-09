"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const image_downloader_1 = __importDefault(require("image-downloader"));
const utils_1 = require("../utils");
const models_1 = __importDefault(require("../models"));
const directoryToSaveAvatarsTo = config_1.default.get('app.directoryToSaveAvatarsTo');
const router = express_1.default.Router();
router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = yield models_1.default.users.getUser(req.params.id);
    res.send(user);
}));
router.get('/:id/avatar', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const userId = req.params.id;
    const { avatar: avatarUrl } = yield models_1.default.users.getUser(userId);
    const destinationFile = `${directoryToSaveAvatarsTo}/user-${userId}.jpg`;
    let image;
    if (yield utils_1.fileExists(destinationFile)) {
        image = yield utils_1.readFile(destinationFile);
    }
    else {
        image = yield image_downloader_1.default.image({ url: avatarUrl, dest: destinationFile }).then(({ image }) => Buffer.from(image));
    }
    res.send(image.toString('base64'));
}));
router.delete('/:id/avatar', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const destinationFile = `${directoryToSaveAvatarsTo}/user-${req.params.id}.jpg`;
    yield utils_1.removeFile(destinationFile);
    res.status(204).end();
}));
exports.default = router;
