const express = require("express");
const {
  deleteArticles,
  getAllArticles,
  addArticles,
} = require("../CtrlArticles");
const { middleId } = require("../../middleWares/middlewares");

const Router = express.Router();

Router.delete("/deleteArticles/:id", middleId, deleteArticles);
Router.get("/getAllArticles", getAllArticles);
Router.post("/addArticles", addArticles);

module.exports = Router;
