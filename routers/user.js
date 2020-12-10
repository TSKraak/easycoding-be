const { Router } = require("express");
const User = require("../models/").user;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/", authMiddleware, async (req, res, next) => {
  const admin = req.user.dataValues.isAdmin;
  try {
    if (admin === false) {
      return res
        .status(403)
        .send({ message: "You are not authorized to see all users" });
    }
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).json({
      users,
      message: "Admin Found. You are authorized to see all users",
    });
  } catch (e) {
    next(e);
  }
});

router.put("/profile", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.dataValues["id"]);
    const updatedUser = await user.update(req.body, {
      return: true,
    });
    const returnUser = await User.findOne({
      where: { id: req.user.dataValues["id"] },
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(returnUser);
  } catch (e) {
    next(e);
  }
});

router.put("/block/:id", authMiddleware, async (req, res, next) => {
  const admin = req.user.dataValues.isAdmin;
  try {
    if (admin === false) {
      return res
        .status(403)
        .send({ message: "You are not authorized to block users" });
    }
    const user = await User.findByPk(parseInt(req.params.id));
    await user.update({
      accountBlocked: !user.accountBlocked ? true : false,
    });
    res.status(200).json({
      user,
    });
  } catch (e) {
    next(e);
  }
});

router.put("/admin/:id", authMiddleware, async (req, res, next) => {
  const admin = req.user.dataValues.isAdmin;
  try {
    if (admin === false) {
      return res
        .status(403)
        .send({ message: "You are not authorized to block users" });
    }
    const user = await User.findByPk(parseInt(req.params.id));
    await user.update({
      isAdmin: !user.isAdmin ? true : false,
    });
    res.status(200).json({
      user,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
