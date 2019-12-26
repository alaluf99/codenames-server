"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
});
exports.UserSchema = UserSchema;
var userModel = mongoose.model('User', UserSchema);
exports.userModel = userModel;
//# sourceMappingURL=UsersModel.js.map