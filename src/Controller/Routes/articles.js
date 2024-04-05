const express = require("express");
const {
  deleteArticles,
  getAllArticles,
  addArticles,
} = require("../CtrlArticles");
const Router = express.Router();

Router.delete("/deleteArticles/:id", deleteArticles);
Router.get("/getAllArticles", getAllArticles);
Router.post("/addArticles", addArticles);

module.exports = Router;
