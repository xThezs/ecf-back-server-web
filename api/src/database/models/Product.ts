import { FLOAT, TEXT } from "sequelize";

const { DataTypes } = require("sequelize");
const {sequelize}= require("../../database");

const Product = sequelize.define("Product",{
    name: TEXT,
    price: FLOAT
});

module.exports.Product = Product;