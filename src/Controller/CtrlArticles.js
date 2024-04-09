const { ObjectId } = require("bson");
const { Articles } = require("../Model/Articles");
const client = require("../Services/Connection");

async function addArticles(request, response) {
  if (
    !request.body.title ||
    !request.body.image ||
    !request.body.description ||
    !request.body.location ||
    !request.body.price
  ) {
    response.status(400).send("Missing fields");
    console.log("HELLLOOO");
    return;
  }

  try {
    let newArticles = new Articles(
      request.body.title,
      request.body.image,
      request.body.description,
      request.body.location,
      request.body.price,
      new Date()
    );
    let result = await client
      .db("Pouleto")
      .collection("Articles")
      .insertOne(newArticles);
    response.status(200).json(result);
  } catch (e) {
    console.log(e);
    response.status(500).json({ error: e });
  }
}

async function getAllArticles(req, res) {
  try {
    let apiCall = client.db("Pouleto").collection("Articles").find();

    let listings = await apiCall.toArray();

    res.status(200).json(listings);
  } catch (e) {
    res.status(500).json({ error: e });
  }
}

async function deleteArticles(req, res) {
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
    res.status(204).json({ msg: "Pas d'annonce pour cette article" });
  }
}

async function editArticle(req, res) {
  let title = req.body.title;
  let image = req.body.image;
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
module.exports = { addArticles, getAllArticles, deleteArticles, editArticle };
