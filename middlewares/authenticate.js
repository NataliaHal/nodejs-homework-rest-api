const jwt = require("jsonwebtoken");

const { User } = require("../models/users");

const HttpError = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(new Error("Unauthorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(new Error("Unauthorized"));
    }
    req.user = user;
    next();
  } catch {
    next(new Error("Unauthorized"));
  }
};

module.exports = authenticate;
