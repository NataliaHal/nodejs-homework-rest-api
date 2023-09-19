const express = require('express');

const userController = require('../../controllers/userControllers');

const router = express.Router();

router.patch("/avarat", userController.uploadAvatar);

module.exports = router;