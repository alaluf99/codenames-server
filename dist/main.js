"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const PORT = 8080;
const MONGO_URI = 'mongodb+srv://codenames_user:codenames@codenames-12xba.mongodb.net/test';
const server = http.createServer(app_1.app);
server.listen(PORT);
server.on('listening', () => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`Listening on port ${PORT}`);
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false });
    mongoose.connection.on('open', () => {
        console.info('Connected to Mongo.');
    });
    mongoose.connection.on('error', (err) => {
        console.error(err);
    });
}));
