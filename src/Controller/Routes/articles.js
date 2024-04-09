const express = require("express");
const {
  deleteArticles,
  getAllArticles,
  addArticles,
  editArticle,
} = require("../CtrlArticles");
const { middleId, middleURL } = require("../../middleWares/middlewares");

const Router = express.Router();

Router.delete("/deleteArticles/:id", middleId, deleteArticles);
Router.get("/getAllArticles", getAllArticles);
Router.post("/addArticles", middleURL, addArticles);
Router.patch("/editArticle/:id", middleId, middleURL, editArticle);

module.exports = Router;
