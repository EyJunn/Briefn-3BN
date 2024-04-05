const { UserAdmin } = require("../Model/UsersAdmin");
const client = require("../Services/Connection");
const { ObjectId } = require("bson");

async function deleteArticle(req, res) {
  if (!req.params.id) {
    res.status(400).send("Id Obligatoire");
  }

  let id = new ObjectId(req.params.id);

  let apiCall = await client
    .db("Pouleto")
    .collection("Articles")
    .deleteOne({ _id: id });

  let response = await apiCall;

  if (response.deletedCount === 1) {
    res.status(200).json({ msg: "Suppression réussie" });
  } else {
    res.status(204).json({ msg: "Pas d'annonce pour cet Id" });
  }
}
async function deleteUsers(req, res) {
  if (!req.params.id) {
    res.status(400).send("Id Obligatoire");
  }

  let id = new ObjectId(req.params.id);

  let apiCall = await client
    .db("Pouleto")
    .collection("user")
    .deleteOne({ _id: id });

  let response = await apiCall;

  if (response.deletedCount === 1) {
    res.status(200).json({ msg: "Suppression réussie" });
  } else {
    res.status(204).json({ msg: "Pas d'annonce pour cet Id" });
  }
}

async function editArticle(req, res) {
  let apiCall = await client
    .db("Pouleto")
    .collection("Article")
    .updateOne({ _id: id });
}

module.exports = { deleteArticle, deleteUsers };
