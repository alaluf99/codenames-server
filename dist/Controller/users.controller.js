"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const UsersModel_1 = require("../Model/UsersModel");
const tsoa_1 = require("tsoa");
const uuid_1 = require("uuid");
let UsersController = class UsersController extends tsoa_1.Controller {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let items = yield UsersModel_1.UserModel.find({});
                items = items.map((item) => { return { id: item._id, description: item.description }; });
                return items;
            }
            catch (err) {
                this.setStatus(500);
                console.error('Caught error', err);
            }
        });
    }
    create(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = new UsersModel_1.UserModel({ id: uuid_1.v4(), name: name, password: password });
            yield item.save();
        });
    }
};
__decorate([
    tsoa_1.Get()
], UsersController.prototype, "getAll", null);
__decorate([
    tsoa_1.Post(),
    __param(0, tsoa_1.BodyProp()), __param(1, tsoa_1.BodyProp())
], UsersController.prototype, "create", null);
UsersController = __decorate([
    tsoa_1.Route('/users')
], UsersController);
exports.UsersController = UsersController;
