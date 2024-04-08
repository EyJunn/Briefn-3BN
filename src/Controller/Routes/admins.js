const express = require("express");
const RouteR = express.Router();
const { deleteArticle, deleteUsers, editArticles } = require("../CtrlAdmin");
const { middleId } = require("../../middleWares/middlewares");

RouteR.delete("/deleteArticles/:id", middleId, deleteArticle);
RouteR.delete("/deleteUsers/:id", middleId, deleteUsers);
RouteR.patch("/editArticles/:id", middleId, editArticles);

module.exports = RouteR;
