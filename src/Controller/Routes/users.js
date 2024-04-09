const express = require("express");
const { register, login, editArticle, UserId } = require("../CtrlUsers");
const {
  middleEmail,
  middleId,
  middleURL,
} = require("../../middleWares/middlewares");

const router = express.Router();

router.post("/register", register);
router.post("/login", middleEmail, login);
// router.patch("/editArticle/:id", middleId, middleURL, editArticle);

module.exports = router;
