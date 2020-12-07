const express = require("express");
const bodyParser = express.json();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser);

app.get("/", (req, res) => {
  res.send("Hi from express, this is the backend of Easy Coding!!!");
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
