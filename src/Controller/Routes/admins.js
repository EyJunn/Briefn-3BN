const express = require("express");
const RouteR = express.Router();
const {
  deleteArticle,
  deleteUsers,
  editArticles,
  getAllUsers,
} = require("../CtrlAdmin");
const { middleId, middleURL } = require("../../middleWares/middlewares");

RouteR.delete("/deleteArticles/:id", middleId, deleteArticle);
RouteR.delete("/deleteUsers/:id", middleId, deleteUsers);
RouteR.patch("/editArticles/:id", middleId, middleURL, editArticles);
RouteR.get("/getAllUsers", getAllUsers);

module.exports = RouteR;
