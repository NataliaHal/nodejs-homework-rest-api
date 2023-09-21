const express = require("express");
const { check, validationResult } = require("express-validator");
const usersController = require("../../controllers/users");
const router = express.Router();
const jsonParser = express.json();
const schemas = require("../../schemas");
const { validateBody, authenticate, upload } = require("../../middlewares");
const ctrl = require("../../controllers/authController");

var Jimp = require("jimp");

const users = require("../../middlewares/users");

const AuthController = require("../../controllers/authController");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

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

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", AuthController.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    try {
      const lenna = await Jimp.read(tempUpload);
      lenna.resize(250, 250);
      await lenna.write(resultUpload);

      const avatarURL = path.join("avatars", filename);
      await User.findByIdAndUpdate(_id, { avatarURL });

      res.json({ avatarURL });
    } catch (error) {
      console.error("Error processing avatar:", error);
      res.status(500).json({ message: "Error processing avatar" });
    } finally {
      await fs.unlink(tempUpload);
    }
  }
);

module.exports = router;
