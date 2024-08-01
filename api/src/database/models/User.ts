import { TEXT } from "sequelize";
import { textSpanContainsPosition } from "typescript";

const { DataTypes } = require("sequelize");
const {sequelize}= require("../../database");

const User = sequelize.define("User",{
    name:TEXT,
    email:TEXT
});

module.exports.User = User;