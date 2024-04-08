const express = require("express");
const {
  deleteArticles,
  getAllArticles,
  addArticles,
} = require("../CtrlArticles");
const { middleId, middleURL } = require("../../middleWares/middlewares");

const Router = express.Router();

Router.delete("/deleteArticles/:id", middleId, deleteArticles);
Router.get("/getAllArticles", getAllArticles);
Router.post("/addArticles", middleURL, addArticles);

module.exports = Router;
