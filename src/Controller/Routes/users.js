const express = require("express");
const { register, login, editArticle } = require("../CtrlUsers");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/editArticle", editArticle);

module.exports = router;
