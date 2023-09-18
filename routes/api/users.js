const express = require("express");
const { check, validationResult } = require("express-validator");
const usersController = require("../../controllers/users");
const router = express.Router();
const jsonParser = express.json();
const { schemas } = require("../../models/users");

const users = require("../../middlewares/users");

// router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post(
  "/register",
  jsonParser,
  [
    check("email").isEmail().withMessage("Invalid email address"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    usersController.register(req, res);
  }
);

// router.post("/login", users, jsonParser, AuthController.login);

// router.post("/logout", AuthController.logout);

module.exports = router;
