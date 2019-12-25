import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'

import HomeController from './controller/home.controller'

const app = new App({
    port: 5000,
    controllers: [
        new HomeController()    
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()