"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database");
const Sale = sequelize.define("Sale", {
    priceHT: sequelize_1.FLOAT,
    priceTTC: sequelize_1.FLOAT
});
const { Commande } = require("./Commande");
Sale.belongsTo(Commande);
Commande.hasOne(Sale);
module.exports.Sale = Sale;
