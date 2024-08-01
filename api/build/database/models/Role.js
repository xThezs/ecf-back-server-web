"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database");
const Role = sequelize.define("Role", {
    name: DataTypes.TEXT,
    importance: DataTypes.INTEGER
});
const { User } = require("./user");
Role.hasMany(User, { onDelete: 'CASCADE' });
User.belongsTo(Role);
module.exports.Role = Role;
