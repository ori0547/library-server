const { handleError, createError } = require("../utils/handleErrors");

const adminOnly = (req, res, next) => {
  try {
    const userInfo = req.user;

    if (!userInfo.isAdmin) {
      const error = new Error("Only the admin can get users");
      error.status = 403;
      createError("Authorization", error);
    }

    return next();
  } catch (error) {
    return handleError(res, 401, error.message);
  }
};

module.exports = adminOnly;
