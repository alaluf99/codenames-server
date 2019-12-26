/* tslint:disable */
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { UsersController } from './Controller/users.controller';
import { RoomsController, UsersInRoomController } from './Controller/rooms.controller';
import * as express from 'express';
import { RoomsInitController } from './Controller/roomInitController';

const models: TsoaRoute.Models = {
    "IUsers": {
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
        },
    },
};
const validationService = new ValidationService(models);

export function RegisterRoutes(app: express.Express) {
    app.get('/users',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/users/signIn',
        function(request: any, response: any, next: any) {
            const args = {
                name: { "in": "body-prop", "name": "name", "required": true, "dataType": "string" },
                password: { "in": "body-prop", "name": "password", "required": true, "dataType": "string" }
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.userExist.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/users/signUp',
        function (request: any, response: any, next: any) {
            const args = {
                name: { "in": "body-prop", "name": "name", "required": true, "dataType": "string" },
                password: { "in": "body-prop", "name": "password", "required": true, "dataType": "string" }
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersController();


            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/rooms',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new RoomsController();


            const promise = controller.getAll.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/rooms',
        function(request: any, response: any, next: any) {
            const args = {
                name: { "in": "body-prop", "name": "name", "required": true, "dataType": "string" },
                status: { "in": "body-prop", "name": "status", "required": true, "dataType": "string" },
                cards: { "in": "body-prop", "name": "cards", "required": false, "dataType": "cards" },
                users: { "in": "body-prop", "name": "user", "required": true, "dataType": "string" }
            };
            
            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
                if (!request.body.user) {
                    throw new Error('Expected get user');                }
            } catch (err) {
                return next(err);
            }

            const controller = new RoomsController();
            
            const promise = controller.create.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/rooms/User',
        function(request: any, response: any, next: any) {
        const args = {
                name: { "in": "body-prop", "name": "roomId", "required": true, "dataType": "string" },
                users: { "in": "body-prop", "name": "userId", "required": true, "dataType": "string" }
            };
            
            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersInRoomController();
            
            const promise = controller.addUserToRoom.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    app.delete('/rooms/user',
        function(request: any, response: any, next: any) {
        const args = {
                name: { "in": "body-prop", "name": "room_id", "required": true, "dataType": "string" },
                users: { "in": "body-prop", "name": "userInRoom_id", "required": true, "dataType": "string" }
            };
            
            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UsersInRoomController();
            
            const promise = controller.removeUserFromRoom.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // app.post('/messages', (req, res) => {
    //     var message = new Message(req.body);
    //     message.save((err) => {
    //         if (err)
    //             sendStatus(500);
    //         res.sendStatus(200);
    //     })
    // })
    // app.get('/messages', (req, res) => {
    //     Message.find({}, (err, messages) => {
    //         res.send(messages);
    //     })
    // })
    app.post('/rooms/init',
    function(request: any, response: any, next: any) {
    const args = {
            name: { "in": "body-prop", "name": "roomId", "required": true, "dataType": "string" }
        };
        
        let validatedArgs: any[] = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        } catch (err) {
            return next(err);
        }

        const controller = new RoomsInitController();
        
        const promise = controller.initRoom.apply(controller, validatedArgs as any);
        promiseHandler(controller, promise, response, next);
    });

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controllerObj.getStatus();
                }

                if (data || data === false) { // === false allows boolean result
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors);
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors);
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors);
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, name + '.');
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
