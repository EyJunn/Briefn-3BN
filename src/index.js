const express = require("express");
const cors = require("cors");
const app = express();
const { connect } = require("./Services/Connection");
const router = require("./Controller/Routes/users");
const Router = require("./Controller/Routes/articles");
const RouteR = require("./Controller/Routes/admins");

app.use(express.json());
app.use(cors());
app.use("/", router);
app.use("/", Router);
app.use("/", RouteR);

connect("mongodb://127.0.0.1:27017/", (error) => {
  if (error) {
    console.log("Failed to connect");
    process.exit(-1);
  } else {
    console.log("successfully connected");
  }
});

console.log("Server is running");
app.listen(4529);
