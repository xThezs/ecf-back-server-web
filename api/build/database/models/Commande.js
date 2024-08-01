"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database");
const Commande = sequelize.define("Commande", {
    date: sequelize_1.DATE,
    isValidated: sequelize_1.BOOLEAN
});
const { User } = require("./User");
Commande.belongsTo(User);
User.hasMany(Commande);
module.exports.Commande = Commande;
