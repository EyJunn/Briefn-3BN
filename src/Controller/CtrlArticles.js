const { ObjectId } = require("bson");
const { Articles } = require("../Model/Articles");
const client = require("../Services/Connection");

async function addArticles(request, response) {
  if (
    !request.body.title ||
    !request.body.image ||
    !request.body.description ||
    !request.body.location ||
    !request.body.price ||
    !request.body.user
  ) {
    response.status(400).send("Missing fields");
    return;
  }

  try {
    let newArticles = new Articles(
      request.body.title,
      request.body.image,
      request.body.description,
      request.body.location,
      request.body.price,
      request.body.user, // Faut générer l'user courant.
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
  const id = req.params.id;

  const { title, image, description, location, price } = req.body;
  const IndexArticles = articles.findIndex(
    (articles) => articles.id == Number(id)
  );
}
module.exports = { addArticles, getAllArticles, deleteArticles };
