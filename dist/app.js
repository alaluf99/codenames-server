"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const request_logger_middleware_1 = require("./request.logger.middleware");
require("./Controller/users.controller");
const routes_1 = require("./routes");
const app = express();
exports.app = app;
app.use(cors());
app.use(bodyparser.json());
app.use(request_logger_middleware_1.requestLoggerMiddleware);
routes_1.RegisterRoutes(app);
try {
}
catch (err) {
    console.error('Unable to read swagger.json', err);
}
