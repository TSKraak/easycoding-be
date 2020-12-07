const express = require("express");
const bodyParser = express.json();
const cors = require("cors");
const { PORT } = require("./config/constants");
const postRouter = require("./routers/post");
const requestRouter = require("./routers/request");
const app = express();

app.use(cors());
app.use(bodyParser);

app.get("/", (req, res) => {
  res.send("Hi from Express, this is the backend of Easy Coding!!!");
});

app.use("/post", postRouter);

app.use("/request", requestRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
