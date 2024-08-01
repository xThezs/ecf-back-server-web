"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database");
const Category = sequelize.define("Category", {
    name: sequelize_1.TEXT
});
const { Product } = require("./Product");
Product.belongsTo(Category);
Category.hasMany(Product);
module.exports.Category = Category;
