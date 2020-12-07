const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const {
  post: Post,
  comment: Comment,
  answer: Answer,
  user: User,
} = require("../models");

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const response = await Post.findAll({
      include: [
        { model: Comment, include: [{ model: Answer }] },
        { model: User, as: "author", attributes: { exclude: ["password"] } },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .send({ message: "Please provide a title and content" });
  }
  try {
    const newPost = await Post.create({
      title,
      content,
      userId: req.user.dataValues["id"],
    });
    res.status(200).send(newPost);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
