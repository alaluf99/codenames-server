"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var tsoa_1 = require("tsoa");
var users_controller_1 = require("./Controller/users.controller");
var rooms_controller_1 = require("./Controller/rooms.controller");
var roomInitController_1 = require("./Controller/roomInitController");
var models = {
    "IUsers": {
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
        },
    },
};
var validationService = new tsoa_1.ValidationService(models);
function RegisterRoutes(app) {
    app.get('/users', function (request, response, next) {
        var args = {};
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        var controller = new users_controller_1.UsersController();
        var promise = controller.getAll.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.post('/users/signIn', function (request, response, next) {
        var args = {
            name: { "in": "body-prop", "name": "name", "required": true, "dataType": "string" },
            password: { "in": "body-prop", "name": "password", "required": true, "dataType": "string" }
        };
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        var controller = new users_controller_1.UsersController();
        var promise = controller.userExist.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.post('/users/signUp', function (request, response, next) {
        var args = {
            name: { "in": "body-prop", "name": "name", "required": true, "dataType": "string" },
            password: { "in": "body-prop", "name": "password", "required": true, "dataType": "string" }
        };
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        var controller = new users_controller_1.UsersController();
        var promise = controller.create.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.get('/rooms', function (request, response, next) {
        var args = {};
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        var controller = new rooms_controller_1.RoomsController();
        var promise = controller.getAll.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.post('/rooms', function (request, response, next) {
        var args = {
            name: { "in": "body-prop", "name": "name", "required": true, "dataType": "string" },
            status: { "in": "body-prop", "name": "status", "required": true, "dataType": "string" },
            cards: { "in": "body-prop", "name": "cards", "required": false, "dataType": "cards" },
            users: { "in": "body-prop", "name": "user", "required": true, "dataType": "string" }
        };
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
            if (!request.body.user) {
                throw new Error('Expected get user');
            }
        }
        catch (err) {
            return next(err);
        }
        var controller = new rooms_controller_1.RoomsController();
        var promise = controller.create.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.post('/rooms/User', function (request, response, next) {
        var args = {
            name: { "in": "body-prop", "name": "roomId", "required": true, "dataType": "string" },
            users: { "in": "body-prop", "name": "userId", "required": true, "dataType": "string" }
        };
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        var controller = new rooms_controller_1.UsersInRoomController();
        var promise = controller.addUserToRoom.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    app.delete('/rooms/user', function (request, response, next) {
        var args = {
            name: { "in": "body-prop", "name": "room_id", "required": true, "dataType": "string" },
            users: { "in": "body-prop", "name": "userInRoom_id", "required": true, "dataType": "string" }
        };
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        var controller = new rooms_controller_1.UsersInRoomController();
        var promise = controller.removeUserFromRoom.apply(controller, validatedArgs);
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
    app.post('/rooms/init', function (request, response, next) {
        var args = {
            name: { "in": "body-prop", "name": "room_id", "required": true, "dataType": "string" }
        };
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request);
        }
        catch (err) {
            return next(err);
        }
        var controller = new roomInitController_1.RoomsInitController();
        var promise = controller.initRoom.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, next);
    });
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, next) {
        return Promise.resolve(promise)
            .then(function (data) {
            var statusCode;
            if (isController(controllerObj)) {
                var headers_1 = controllerObj.getHeaders();
                Object.keys(headers_1).forEach(function (name) {
                    response.set(name, headers_1[name]);
                });
                statusCode = controllerObj.getStatus();
            }
            if (data || data === false) { // === false allows boolean result
                response.status(statusCode || 200).json(data);
            }
            else {
                response.status(statusCode || 204).end();
            }
        })
            .catch(function (error) { return next(error); });
    }
    function getValidatedArgs(args, request) {
        var fieldErrors = {};
        var values = Object.keys(args).map(function (key) {
            var name = args[key].name;
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
            throw new tsoa_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
}
exports.RegisterRoutes = RegisterRoutes;
//# sourceMappingURL=routes.js.map