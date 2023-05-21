const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

// author schema
const AuthorSchem = new mongoose.Schema({
  name: String,
  birthYear: Number,
  deadYear: Number,
  genre: String,
  isDead: Boolean,
  isMale: Boolean,
  imageURL: String,
});

//Author model
const AuthorModel = new mongoose.model("Authors", AuthorSchem);

//get all authors
app.get("/api/authors", async (req, res) => {
  const { name } = req.query;
  const authors = await AuthorModel.find();
  if (!name) {
    res.status(200).send(authors);
  } else {
    res
      .status(200)
      .send(
        authors.filter((x) =>
          x.name.toLowerCase().trim().includes(name.toLowerCase().trim())
        )
      );
  }
});

//get author by ID
app.get("/api/authors/:id", async (req, res) => {
  const { id } = req.params;
  const author = await AuthorModel.findById(id);
  res.status(200).send(author);
});

//delete author by ID
app.delete("/api/authors/:id", async (req, res) => {
  const { id } = req.params;
  await AuthorModel.findByIdAndDelete(id);
  res.status(203).send({
    massage: "Author deleted =/",
  });
});

//edit author by ID
app.put("/api/authors/:id", async (req, res) => {
  const { id } = req.params;
  const { name, birthYear, deadYear, genre, isDead, isMale, imageURL } = req.body;
  const updatingAuthor = {
    name: name,
    birthYear: birthYear,
    deadYear: deadYear,
    genre: genre,
    isDead: isDead,
    isMale: isMale,
    imageURL: imageURL,
  };
  await AuthorModel.findByIdAndUpdate(id, updatingAuthor);
  res.status(200).send("author updating =)");
});

//post 
app.post("/api/authors", async (req, res) => {
  const { name, birthYear, deadYear, genre, isDead, isMale, imageURL } = req.body;
  const newAuthor = new AuthorModel({
    name: name,
    birthYear: birthYear,
    deadYear: deadYear,
    genre: genre,
    isDead: isDead,
    isMale: isMale,
    imageURL: imageURL,
  });
  await newAuthor.save();
  res.status(201).send("posted =)");
});

PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server: İŞLİYİRƏM");
});

DB_CONNECTION = process.env.DB_CONNECTION;
DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.connect(DB_CONNECTION.replace("<password>", DB_PASSWORD)).then(() => {
  console.log("MongoDB: məndə İŞİYİRƏM");
});
