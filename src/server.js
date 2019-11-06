const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB, {
  useCreateIndex: true,
  useNewUrlParser: true
});

const Word = mongoose.model("Word", { text: String }, "Words");

app.get("/", (req, res) => res.json({ data: "Polifood" }));

app.get("/words", async (req, res) => {
  const words = await Word.find();
  return res.status(200).json({ words });
});

app.listen(port, "0.0.0.0", () =>
  console.log(`Example app listening on port ${port}!`)
);
