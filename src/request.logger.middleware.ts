import * as express from 'express';

const requestLoggerMiddleware = (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	console.info(`${req.method} ${req.originalUrl}`);
	const start = new Date().getTime();
	resp.on('finish', () => {
		const time = new Date();
		const elapsed = time.getTime() - start;
		console.info(`${time} - ${req.method} ${req.originalUrl} ${resp.statusCode} ${elapsed}ms`);
		console.info(req.body);
	});
	next();
};

export { requestLoggerMiddleware };