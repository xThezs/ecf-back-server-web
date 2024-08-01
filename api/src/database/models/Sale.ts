import { FLOAT } from "sequelize";

const { DataTypes } = require("sequelize");
const {sequelize}= require("../../database");

const Sale = sequelize.define("Sale",{
    priceHT:FLOAT,
    priceTTC:FLOAT
});

const {Commande} = require("./Commande");
Sale.belongsTo(Commande);
Commande.hasOne(Sale);


module.exports.Sale = Sale;