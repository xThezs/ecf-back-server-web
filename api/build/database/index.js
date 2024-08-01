"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize, DataTypes } = require("sequelize");
const login = {
    database: "mcdo",
    username: "admin_mcdo",
    password: "/pWhd-hf313xb-BD"
};
// Connexion à la BDD
const sequelize = new Sequelize(login.database, login.username, login.password, {
    host: 'localhost',
    dialect: 'mysql',
});
// Vérifier la connexion
sequelize.authenticate()
    .then(() => console.log("Connexion à la base de donnée mcdo"))
    .catch(error => console.log(error));
sequelize.sync({});
module.exports.sequelize = sequelize;
