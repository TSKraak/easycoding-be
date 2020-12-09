const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const {
  favourite: Favourite,
  post: Post,
  comment: Comment,
  answer: Answer,
  user: User,
  picture: Picture,
} = require("../models");

const router = new Router();

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const response = await User.findByPk(req.user.dataValues["id"], {
      attributes: ["id"],
      include: [
        {
          model: Post,
          as: "favourite",
          include: [
            {
              model: Comment,
              include: [
                {
                  model: Answer,
                  include: [
                    {
                      model: User,
                      attributes: { exclude: ["password"] },
                    },
                  ],
                },
                {
                  model: User,
                  attributes: { exclude: ["password"] },
                },
              ],
            },
            {
              model: User,
              as: "author",
              attributes: { exclude: ["password"] },
            },
            { model: Picture },
          ],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  const { postId } = req.body;
  try {
    const newFavourite = await Favourite.create({
      postId,
      userId: req.user.dataValues["id"],
    });
    const returnFavouritedPost = await Post.findByPk(postId, {
      include: [
        {
          model: Comment,
          include: [
            {
              model: Answer,
              include: [
                {
                  model: User,
                  attributes: { exclude: ["password"] },
                },
              ],
            },
            {
              model: User,
              attributes: { exclude: ["password"] },
            },
          ],
        },
        {
          model: User,
          as: "author",
          attributes: { exclude: ["password"] },
        },
        { model: Picture },
      ],
    });
    res.status(200).send(returnFavouritedPost);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
