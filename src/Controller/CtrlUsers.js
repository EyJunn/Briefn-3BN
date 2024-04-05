const { User } = require("../Model/Users");
const client = require("../Services/Connection");
const { ObjectId } = require("bson");
const bcrypt = require("bcrypt");

async function register(req, res) {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName
  ) {
    res.status(400).json({ error: "Missing fields" });
    return;
  } else {
    let users = await client
      .db("Pouleto")
      .collection("user")
      .findOne({ email: req.body.email });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (users) {
      res.status(401).json({ error: "Sort d'ici" });
      return;
    }
    try {
      let user = new User(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        hashedPassword,
        new Date(),
        true,
        "user"
      );
      let result = await client
        .db("Pouleto")
        .collection("user")
        .insertOne(user);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  }
}

async function login(req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  try {
    let user = await client
      .db("Pouleto")
      .collection("user")
      .findOne({ email: req.body.email, password: req.body.password });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    } else {
      res.status(200).json(user);
      // await bcrypt.compare(req.body.password, user.password);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
}

module.exports = { register, login };
