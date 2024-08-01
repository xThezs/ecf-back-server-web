import { TEXT } from "sequelize";

const { DataTypes } = require("sequelize");
const {sequelize}= require("../../database");

const Category = sequelize.define("Category",{
    name: TEXT
});

const {Product} = require("./Product");
Product.belongsTo(Category);
Category.hasMany(Product);

module.exports.Category = Category;