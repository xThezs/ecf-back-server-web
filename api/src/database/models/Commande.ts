import { BOOLEAN, DATE } from "sequelize";

const { DataTypes } = require("sequelize");
const {sequelize}= require("../../database");

const Commande = sequelize.define("Commande",{
    date : DATE,
    isValidated : BOOLEAN
});


const {User} = require("./User");
Commande.belongsTo(User);
User.hasMany(Commande);


module.exports.Commande = Commande;