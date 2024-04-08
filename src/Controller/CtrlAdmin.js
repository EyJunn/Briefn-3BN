const { UserAdmin } = require("../Model/UsersAdmin");
const client = require("../Services/Connection");
const { ObjectId } = require("bson");
const { middleId } = require("../middleWares/middlewares");

async function deleteArticle(req, res) {
  if (!req.params.id) {
    res.status(400).send("Id Obligatoire");
  }

  // let id = new ObjectId(req.params.id);
  let id = middleId;

  let apiCall = await client
    .db("Pouleto")
    .collection("Articles")
    .deleteOne({ _id: id });

  let apiRes = await apiCall;
  console.log(apiRes);
  if (apiRes.deletedCount >= 1) {
    res.status(200).json({ msg: "Suppression réussie" });
  }
}

async function deleteUsers(req, res) {
  if (!req.params.id) {
    res.status(400).send("Id Obligatoire");
  }

  // let id = new ObjectId(req.params.id);
  let id = middleId;

  let apiCall = await client
    .db("Pouleto")
    .collection("user")
    .deleteOne({ _id: id });

  let apiRes = await apiCall;

  if (apiRes.deletedCount === 1) {
    res.status(200).json({ msg: "Suppression réussie" });
  }
}

async function editArticles(req, res) {
  let title = req.body.title;
  let image = req.body.image;
  // const id = new ObjectId(req.params.id);
  let id = middleId;
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

module.exports = { deleteArticle, deleteUsers, editArticles };
