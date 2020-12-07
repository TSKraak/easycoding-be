const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const { post: Post, comment: Comment, answer: Answer } = require("../models");

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const response = await Post.findAll({
      include: [{ model: Comment, include: [{ model: Answer }] }],
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
