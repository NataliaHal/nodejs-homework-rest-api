const { HttpError } = require("../helperss");
const { User } = require("../models/users");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: "",
    verify: true,
  });

  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
