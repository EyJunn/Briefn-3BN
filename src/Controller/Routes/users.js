const express = require("express");
const { register, login, editArticle } = require("../CtrlUsers");
const { middleEmail } = require("../../middleWares/middlewares");

const router = express.Router();

router.post("/register", register);
router.post("/login", middleEmail, login);
router.patch("/editArticle", editArticle);

module.exports = router;
