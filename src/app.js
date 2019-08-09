"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./api"));
const app = express_1.default();
app.use('/api', api_1.default);
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500);
    res.end();
});
app.listen(3000, function () {
    console.log('Server has been started on port 3000!');
});
