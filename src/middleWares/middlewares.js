const validator = require("validator");

const middleId = (req, res, next) => {
  const id = req.params.id;
  if (!validator.isMongoId(id + "")) {
    return res.status(400).json({ msg: "please send a mongoId" });
  }
  req.id = id;
  next();
};

const middleEmail = (req, res, next) => {
  const email = req.body.email;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ msg: "please send a email" });
  }
  req.isEmail = email;
  next();
};

const middleURL = (req, res, next) => {
  const link = req.body.image;
  if (!validator.isURL(link)) {
    return res.status(400).json({ msg: "Please send an url" });
  }
  req.isURL = link;
  next();
};
module.exports = { middleId, middleEmail, middleURL };
