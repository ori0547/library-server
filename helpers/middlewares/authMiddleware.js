const { createError, handleError } = require("../utils/handleErrors");
const { verifyToken } = require("../auth/providers/jwt");

// const config = require("config");
// const tokenGenerator = config.get("TOKEN_GENERATOR");
const tokenGenerator = "jwt";

const auth = (req, res, next) => {
  if (tokenGenerator === "jwt") {
    try {
      const tokenFromClient = req.header("x-auth-token");

      if (!tokenFromClient) {
        const error = new Error("Please Login");
        error.status = 401;
        createError("Authentication", error);
      }

      const userInfo = verifyToken(tokenFromClient);

      if (!userInfo) {
        const error = new Error("Unauthorize user");
        error.status = 401;
        createError("Authentication", error);
      }

      req.user = userInfo;
      return next();
    } catch (error) {
      return handleError(res, 401, error.message);
    }
  }
  
  return handleError(res, 500, "you did not used valid token generator");
};

module.exports = auth;
