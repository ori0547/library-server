const bcrypt = require("bcryptjs/dist/bcrypt");
const { generateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleErrors");
const User = require("./mongodb/User");

const registerUser = async (newUser) => {
  try {
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    let user = new User(newUser);
    user = await user.save();

    return { _id: user._id, email: user.email, name: user.name };
  } catch (error) {
    createError("Mongoose", error);
  }
};

const getUser = async (userId) => {
  try {
    let user = await User.findById(userId);
    return user;
  } catch (error) {
    createError("Mongoose", error);
  }
};

const getUsers = async () => {
  try {
    let users = await User.find();
    return users;
  } catch (error) {
    createError("Mongoose", error);
  }
};

const loginUser = async (email, password) => {
  try {
    const userFromDb = await User.findOne({ email });

    if (!userFromDb) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      createError("Authentication", error);
    }

    if (!bcrypt.compareSync(password, userFromDb.password)) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      createError("Authentication", error);
    }

    const token = generateAuthToken(userFromDb);

    return token;
  } catch (error) {
    createError("Mongoose", error);
  }
};

module.exports = { registerUser, getUser, getUsers, loginUser };
