"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database");
const Product = sequelize.define("Product", {
    name: sequelize_1.TEXT,
    price: sequelize_1.FLOAT
});
module.exports.Product = Product;
