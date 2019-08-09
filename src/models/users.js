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
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const config_1 = __importDefault(require("config"));
const apiUrl = `${config_1.default.get('app.apiUrl')}/users`;
exports.default = {
    getUser: (userId) => __awaiter(this, void 0, void 0, function* () {
        const { data: { id, email, first_name: firstName, last_name: lastName, avatar } } = yield request_promise_native_1.default({
            method: 'GET',
            uri: `${apiUrl}/${userId}`,
            json: true,
        });
        return {
            id,
            email,
            firstName,
            lastName,
            avatar,
        };
    }),
    getUsers: (page) => __awaiter(this, void 0, void 0, function* () {
        const { data } = yield request_promise_native_1.default({
            method: 'GET',
            uri: `${apiUrl}/?page=${page}`,
            json: true,
        });
        return data.map((entry) => {
            const { id, email, first_name: firstName, last_name: lastName, avatar } = entry;
            return {
                id,
                email,
                firstName,
                lastName,
                avatar,
            };
        });
    })
};
