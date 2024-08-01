const { DataTypes } = require("sequelize");
const {sequelize}= require("../../database");


const ProductCart = sequelize.define("ProductCart",{
    quantity : DataTypes.INTEGER
});

const {Cart} = require("./cart");

const {Product} = require("./product");

Product.belongsToMany(Cart,{through : "ProductCart"});
Cart.belongsToMany(Product,{through : "ProductCart"});

module.exports.ProductCart = ProductCart;