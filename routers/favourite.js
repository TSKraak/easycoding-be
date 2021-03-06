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
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Comment,
              order: [["createdAt", "DESC"]],
              include: [
                {
                  model: Answer,
                  order: [["createdAt", "DESC"]],
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

router.delete("/:postId", authMiddleware, async (req, res, next) => {
  try {
    await Favourite.destroy({
      where: {
        postId: parseInt(req.params.postId),
        userId: req.user.dataValues["id"],
      },
    });
    res
      .status(200)
      .send({ message: `Unfavourited post with id:${req.params.postId}` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
