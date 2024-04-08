const { User } = require("../Model/Users");
const client = require("../Services/Connection");
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
      .findOne({ email: req.body.email });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    } else {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isValidPassword) {
        res.status(401).json({ error: "Invalid credentialss" });
        return;
      } else {
        res.status(200).json({ msg: "Valid credentials" });
      }
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
}

async function editArticle(req, res) {
  let title = req.body.title;
  let image = req.body.image;
  const id = new ObjectId(req.params.id);
  let description = req.body.description;

  if (!title || !image || !description) {
    res.status(400).json({ msg: "Missing Fields" });
  }

  try {
    let apiRes = await client
      .db("Pouleto")
      .collection("Articles")
      .updateOne(
        {
          _id: id,
        },
        {
          $set: {
            title: title,
            image: image,
            description: description,
          },
        }
      );
    if (apiRes.modifiedCount === 1) {
      res.status(200).json({ msg: "Update successful" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Update failed" });
  }
}

module.exports = { register, login, editArticle };
