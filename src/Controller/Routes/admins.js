const express = require("express");
const RouteR = express.Router();
const { deleteArticle, deleteUsers, editArticle } = require("../CtrlAdmin");

RouteR.delete("/deleteArticles/:id", deleteArticle);
RouteR.delete("/deleteUsers/:id", deleteUsers);
RouteR.patch("/editArticle/:id", editArticle);

module.exports = RouteR;
