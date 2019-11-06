const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.json({ data: "Polifood" }));

app.listen(port, '0.0.0.0',() => console.log(`Example app listening on port ${port}!`));
