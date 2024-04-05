const express = require("express");
const RouteR = express.Router();
const { deleteArticle, deleteUsers } = require("../CtrlAdmin");

RouteR.delete("/delete/:id", deleteArticle);
RouteR.delete("/delete/:id", deleteUsers);

module.exports = RouteR;
