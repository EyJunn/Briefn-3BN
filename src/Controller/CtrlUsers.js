const { User } = require("../Model/Users");
const client = require("../Services/Connection");
const { ObjectId } = require("bson");
const bcrypt = require("bcrypt");

async function register(request, response) {
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

    if (users) {
      res.status(401).json({ error: "Sort d'ici" });
    }

    const hashedPassword = await bcrypt.hash(request.body.password, 17);
    try {
      let user = new User(
        request.body.firstName,
        request.body.lastName,
        request.body.email,
        request.body.password,
        new Date(),
        true
      );
      let result = await client
        .db("Pouleto")
        .collection("user")
        .insertOne(user);
      response.status(200).json(result);
    } catch (e) {
      console.log(e);
      response.status(500).json({ error: e });
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
      .findOne({ email: req.body.email });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    } else {
      await bcrypt.compare(req.body.password, user.password);
      if (!isValidPassword) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      } else {
        res.status(200).json(user);
      }
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
}

module.exports = { register, login };
