const express = require("express");
const RouteR = express.Router();
const { deleteArticle, deleteUsers, editArticle } = require("../CtrlAdmin");
const { middleId } = require("../../middleswares/middlewares");

RouteR.delete("/deleteArticles/:id", middleId, deleteArticle);
RouteR.delete("/deleteUsers/:id", middleId, deleteUsers);
RouteR.patch("/editArticle/:id", middleId, editArticle);

module.exports = RouteR;
