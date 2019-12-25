"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
});
const userModel = mongoose.model('User', UserSchema);
exports.userModel = userModel;
