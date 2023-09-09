const express = require('express');
const { check, validationResult } = require('express-validator');
const usersController = require('../../controllers/users');
const router = express.Router();
const jsonParser = express.json();

router.post(
  "/register", jsonParser,
  [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    usersController.register(req, res);
  }
);

module.exports = router;

