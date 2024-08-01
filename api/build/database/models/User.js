"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database");
const User = sequelize.define("User", {
    name: sequelize_1.TEXT,
    email: sequelize_1.TEXT
});
module.exports.User = User;
