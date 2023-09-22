const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
const HttpError = require("../helpers");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Unauthorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401, "Unauthorized"));
    }
    req.user = user;
    next();
  } catch {
    return next(HttpError(401, "Unauthorized"));
  }
};

module.exports = authenticate;
