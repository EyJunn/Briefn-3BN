const validator = require("validator");

const middleId = (req, res, next) => {
  const id = req.params.id;
  if (!validator.isMongoId(id + "")) {
    res.status(400).json({ msg: "please send a mongoId" });
  }
  req.id = id;
  next();
};

const middleEmail = (req, res, next) => {
  const email = req.body.email;
  if (!validator.isEmail(email)) {
    res.status(400).json({ msg: "please send a email" });
  }
  req.isEmail = email;
  next();
};

module.exports = { middleId, middleEmail };
