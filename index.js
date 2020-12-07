const express = require("express");
const bodyParser = express.json();
const cors = require("cors");
const { PORT } = require("./config/constants");
const app = express();

app.use(cors());
app.use(bodyParser);

app.get("/", (req, res) => {
  res.send("Hi from Express, this is the backend of Easy Coding!!!");
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
