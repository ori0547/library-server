const express = require("express");
const { registerUser, getUser, getUsers, loginUser, } = require("../models/usersAccessDataService");
const { handleError } = require("../../utils/handleErrors");
const { validateRegistration, validateLogin } = require("../validation/userValidationService");
const adminOnly = require("../../middlewares/adminOnlyMiddleware");
const auth = require("../../middlewares/authMiddleware");

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

    let user = await getUser(id);
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

module.exports = usersController;
