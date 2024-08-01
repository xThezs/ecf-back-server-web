//Express
var express = require('express');

//Cors
var cors = require('cors');

//Lancement BDD
const database=require("./database");
const sequelize=database.sequelize

//Module Opérator pour sequelize
const { Op } = require("sequelize");

//Lancement Model

const {User} = require("./database/models/user");
const {Product} = require("./database/models/product");
const {Commande} = require("./database/models/commande");
const {Cart} = require("./database/models/cart");
const {Category} = require("./database/models/category");
const {Sale} = require("./database/models/Sale");
const {Role} = require("./database/models/role");
const {ProductCart} = require("./database/models/ProductCart");
const {ProductCommande} = require("./database/models/ProductCommande");

const app = express()
const port = 3030;
app.use(cors());

//Token
const jwt = require("jsonwebtoken");
const secret = "lesecretdusecretdumana";

app.listen(port, function(err){
    if(err){
        console.log(err);
    } 
    console.log(`Example app listening on port ${port}`)
}); 

app.use(express.json());

//Product Route
//Find Product by Id
app.get("/product/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const product=await Product.findByPk(id);
        res.status(200).json(product);
    }catch (error) {
        console.error(error);
    }   
});
//Get Products Search
app.get("/products/search/:input",async(req,res)=>{
    try {
        const input=req.params.input;
    const products=await Product.findAll({ 
        where:{
            name:{
                [Op.like]: `%${input}%`
            }
        } });
    res.status(200).json(products);
    }catch (error) {
        console.error(error);
    }   
});
//Get Products limit
app.get("/products/:limit",async(req,res)=>{
    try {
        const limit=parseInt(req.params.limit);
        const products=await Product.findAll({limit : limit});
        res.status(200).json(products);
    }catch (error) {
        console.error(error);
    }    
});
//Get Products By Category ID
app.get("/products/category/:categoryId",async(req,res)=>{
    try {
        const categoryId=parseInt(req.params.categoryId);
        const products=await Product.findAll({where:{CategoryId:categoryId}});
        res.status(200).json(products);
    }catch (error) {
        console.error(error);
    }    
});
//Post Product
app.post("/product",async (req,res)=>{
    try {
        const newProduct = req.body;
        const product = await Product.create({
        name:newProduct.name,
        price:newProduct.price,
        categoryId:newProduct.categoryID
        });
        res.status(200).json(product);
    }catch (error) {
        console.error(error);
    }    
});
//Delete products by id
app.delete("/product/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const result=await Product.destroy({
        where: {
        id: id
        }
        });
        res.status(200).json("L'élement a bien été supprimé");
    }catch (error) {
        console.error(error);
    }    
});  
//Update Product
app.put("/product",async(req,res)=>{
    try {
        let update = req.body;
        await Product.update(update, {
        where: {
            id: update.id
        }
        }); 
        res.status(200).json("Le produit a été modifié");
    }catch (error) {
        console.error(error);
    }   
}); 


//Category Route
//Get Category
app.get("/categories",async(req,res)=>{
    try {
        const categories=await Category.findAll();
        res.status(200).json(categories);
    }catch (error) {
        console.error(error);
    }    
});
//Get Category by Id
app.get("/category/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const category=await Category.findByPk(id);
        res.status(200).json(category);
    }catch (error) {
        console.error(error);
    }   
});
//Post Category
app.post("/category",async (req,res)=>{
    try {
        const newCategory = req.body;
        const category = await Category.create(newCategory);
        res.status(200).json(category);
    }catch (error) {
        console.error(error);
    }    
});
//Delete Category by id
app.delete("/category/:id",async(req,res)=>{
    try {
        const id=req.params.id;
        const result=await Category.destroy({
            where: {
            id: id
            }
        });
        res.status(200).json("L'élement a bien été supprimé");
    }catch (error) {
        console.error(error);
    } 
});  
//Update Category
app.put("/Category",async(req,res)=>{
    try {
        let update = req.body;
        await Category.update(update, {
            where: {
                id: update.id
            }
        }); 
        res.status(200).json("La category a bien été modifié");
    }catch (error) {
        console.error(error);
    }    
});


//Voir les commandes passées

//Get Sales
app.get("/sales",checkAdmin,async(req,res)=>{
    try {
        const sales=await Sale.findAll();
        res.status(200).json(sales);
    }catch (error) {
        console.error(error);
    }   
});

//Validate a command 
app.put("/commande/validation/:id",checkAdmin,async(req,res)=>{
    try {
        const id=req.params.id;
        await Commande.update(
            
            { isValidated: true },
            {
              where: {
                id: id,
              },
            },
          );
        res.status(200).json("La commande"+id+"a été validé");
    }catch (error) {
        console.error(error);
    }   
});

//Add article in Cart
app.post("/Cart/addProduct",checkAdmin,async(req,res)=>{
    try {
        const addProduct = req.body;
        const product = await ProductCart.create({
            ProductId:addProduct.ProductId,
            CartId:addProduct.CartId,
            quantity:addProduct.quantity
        });
        res.status(200).json(product);
    }catch (error) {
        console.error(error);
    }  
})

//Modify Article in Cart
//Delete Article In Cart
app.delete("/Cart/DeleteProduct/:id",checkAdmin,async(req,res)=>{
    try {
        const ProductToDelete=req.body;
        const result=await Category.destroy({
            where: {
            ProductId : ProductToDelete.ProductId,
            CartId: ProductToDelete.CartId
            }
        });
        res.status(200).json("L'élement a bien été supprimé");
    }catch (error) {
        console.error(error);
    } 
});  

//Modify One Article in Cart
app.put("/Cart/ModifyProduct",checkAdmin,async(req,res)=>{
    try {
        let update = req.body;
        await ProductCart.update({
                quantity:update.quantity
            }, 
            {
            where: {
                CartId: update.CartId,
                ProductId:update.ProductId 
                }
            }
        ); 
        res.status(200).json("La quantité a été modifié à "+update.quantity);
    }catch (error) {
        console.error(error);
    }
    
}); 


//Securiy 

const accessauthority = async (importance)=>{
    const role=await Role.findOne({
        where: 
        {
            importance
        }
    });
    return role;
}


//User Route
async function checkAdmin(req,res,next){
if(!req.headers.authorization){
    return res.status(401).json("Missing Token")
}
const authHeader = req.headers.authorization;
const token = authHeader.split(" ")[1];

const admin = await accessauthority(0);
jwt.verify(token,secret,(err,decodedToken)=>{
    if(err){
        res.status(401).json("Unauthorized, wrong token");
        return;
    }
    switch (decodedToken.role){
        case admin.id:
            next();
            break;
        default:
            res.status(401).json("Unauthorized role");
            break;
    }
})
}

//Check Admin Route
app.get("/checkAdmin",checkAdmin, async(req,res)=>{
    try {
        res.status(200).json(true);
    } catch (error) {
       console.log(error); 
    }  

})

