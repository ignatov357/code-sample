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
const fs_1 = __importDefault(require("fs"));
exports.fileExists = (filePath) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield fs_1.default.promises.access(filePath);
        return true;
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        }
        throw error;
    }
});
exports.readFile = (filePath) => __awaiter(this, void 0, void 0, function* () {
    return fs_1.default.promises.readFile(filePath);
});
exports.writeFile = (filePath, data) => __awaiter(this, void 0, void 0, function* () {
    return fs_1.default.promises.writeFile(filePath, data);
});
exports.removeFile = (filePath) => __awaiter(this, void 0, void 0, function* () {
    if (yield exports.fileExists(filePath)) {
        yield fs_1.default.promises.unlink(filePath);
    }
});
