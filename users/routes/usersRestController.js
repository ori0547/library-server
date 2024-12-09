const express = require("express");
const { registerUser, getUser, getUsers, loginUser, editUser, deleteUser, } = require("../models/usersAccessDataService");
const { handleError } = require("../../utils/handleErrors");
const { validateRegistration, validateLogin, validateEdit } = require("../validation/userValidationService");
const adminOnly = require("../../middlewares/adminOnlyMiddleware");
const auth = require("../../middlewares/authMiddleware");
const User = require("../models/mongodb/User");

const usersController = express.Router();

usersController.post("/signup", async (req, res) => {
  try {
    const error = validateRegistration(req.body);
    if (error) return handleError(res, 400, `Joi Error: ${error}`);
    await registerUser({ ...req.body });
    const { email, password } = req.body;

    const token = await loginUser(email, password);
    res.send(token);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

usersController.post("/login", async (req, res) => {
  try {
    const error = validateLogin(req.body);
    if (error) return handleError(res, 400, `Joi Error: ${error}`);

    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.send(token);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

usersController.put("/:id", auth, async (req, res) => {
  try {
    const error = validateEdit(req.body);

    if (error) return handleError(res, 400, `Joi Error: ${error}`);
    
    const userInfo = req.user;
    const { id } = req.params;

    if (userInfo._id !== id && !userInfo.isAdmin) {
      return handleError(
        res,
        403,
        "Authorization Error: Only the same user or admin can get user info"
      );
    }

    const user = await editUser(id, req.body);
    user.password = undefined;
    
    res.send(user);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

usersController.delete("/:id", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    const { id } = req.params;

    if (userInfo._id !== id && !userInfo.isAdmin) {
      return handleError(
        res,
        403,
        "Authorization Error: Only the same user or admin can get user info"
      );
    }

    const result = await deleteUser(id);
    res.send(result);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

usersController.get("/:id", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    const { id } = req.params;

    if (userInfo._id !== id && !userInfo.isAdmin) {
      return handleError(
        res,
        403,
        "Authorization Error: Only the same user or admin can get user info"
      );
    }

    const user = await getUser(id);

    if (user) {
      user.password = undefined;
    }
    
    res.send(user);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

usersController.get("/", [auth, adminOnly], async (req, res) => {
  try {
    let users = await getUsers();
    res.send(users);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

usersController.patch("/favorites", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookId } = req.body;
    const user = await User.findById(userId);
    const favorites = user.favorites;
    const isBookLiked = favorites.includes(bookId)
    if (isBookLiked) {
      user.favorites.pull(bookId);
    } else {
      user.favorites.push(bookId);
    }
    await user.save();
    res.send(user.favorites);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
})

module.exports = usersController;
