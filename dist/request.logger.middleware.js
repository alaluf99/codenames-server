"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestLoggerMiddleware = (req, resp, next) => {
    console.info(`${req.method} ${req.originalUrl}`);
    const start = new Date().getTime();
    resp.on('finish', () => {
        const elapsed = new Date().getTime() - start;
        console.info(`${req.method} ${req.originalUrl} ${resp.statusCode} ${elapsed}ms`);
    });
    next();
};
exports.requestLoggerMiddleware = requestLoggerMiddleware;
