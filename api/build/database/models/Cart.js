"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database");
const Cart = sequelize.define("Cart", {});
const { User } = require("./user");
Cart.hasOne(User);
User.belongsTo(Cart);
module.exports.Cart = Cart;
