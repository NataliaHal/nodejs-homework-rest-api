const express = require("express");
const Joi = require("joi");
const User = require("../models/users");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userControllers");

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
