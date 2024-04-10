const express = require("express");
const RouteR = express.Router();
const {
  deleteArticle,
  editArticles,
  getAllUsers,
  banUsers,
} = require("../CtrlAdmin");
const { middleId, middleURL } = require("../../middleWares/middlewares");

RouteR.delete("/deleteArticles/:id", middleId, deleteArticle);
RouteR.patch("/banUsers/:id", middleId, banUsers);
RouteR.patch("/editArticles/:id", middleId, middleURL, editArticles);
RouteR.get("/getAllUsers", getAllUsers);

module.exports = RouteR;
