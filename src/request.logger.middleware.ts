import * as express from 'express';

const requestLoggerMiddleware = (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	console.info(`${req.method} ${req.originalUrl}`);
	const start = new Date().getTime();
	resp.on('finish', () => {
		const time = new Date().getTime().toString();
		const elapsed = new Date().getTime() - start;
		console.info(`${time} - ${req.method} ${req.originalUrl} ${resp.statusCode} ${elapsed}ms`);
	});
	next();
};

export { requestLoggerMiddleware };