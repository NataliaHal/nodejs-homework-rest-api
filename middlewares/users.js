const jwt = require("jsonwebtoken");

const User = require("../models/users");

const decod = jwt.decode(process.env.JWT_SECRET);

function auth(req, res, next) {
  const usersHeader = req.headers.authorization || "";
  const [bearer, token] = usersHeader.split("", 2);

  if (bearer !== "Bearer" || !token) {
    return res.status(401).send({ message: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token has expired." });
      }
      return next(err);
    }
    try {
      const user = await User.findById(decod.id).exec();

      if (user.token !== token) {
        return res.status(401).send({ message: "Invalid token." });
      }

      req.user = { id: decod.id, name: decoded.name };
      next();
    } catch (err) {
      next(err);
    }
  });
}

module.exports = auth;
