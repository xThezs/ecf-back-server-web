"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database");
const ProductCommande = sequelize.define("ProductCommande", {
    quantity: DataTypes.INTEGER
});
const { Commande } = require("./Commande");
const { Product } = require("./product");
Product.belongsToMany(Commande, { through: "ProductCommande" });
Commande.belongsToMany(Product, { through: "ProductCommande" });
module.exports.ProductCommande = ProductCommande;
