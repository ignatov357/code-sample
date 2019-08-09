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
const config_1 = __importDefault(require("config"));
const models_1 = __importDefault(require("./models"));
const utils_1 = require("./utils");
const { listOfUsersFilePath, scrappingInterval } = config_1.default.get('scrapping');
const init = () => __awaiter(this, void 0, void 0, function* () {
    let currentPage = 1;
    let users = [];
    const scrap = () => __awaiter(this, void 0, void 0, function* () {
        const currentPageUsers = yield models_1.default.users.getUsers(currentPage);
        users.push(...currentPageUsers);
        yield utils_1.writeFile(listOfUsersFilePath, JSON.stringify(users));
        console.log(`Page #${currentPage} has been successfully scrapped`);
        currentPage++;
    });
    yield scrap();
    setInterval(scrap, scrappingInterval);
});
init();
