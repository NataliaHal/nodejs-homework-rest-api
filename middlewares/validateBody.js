const HttpError = require("../utils/validation/HttpError");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = validationSchema.validate(req.body);

    if (error) {
      return next(new HttpError(422, error));
    }
    next();
  };
};

module.exports = validateBody;
