const Joi = require("joi");
const { emailRegExp, subscriptionList } = require("../helpers");

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(), 
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .pattern(new RegExp(`^(${subscriptionList.join("|")})$`))
    .required(),
});



module.exports = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  userSchema,
  emailSchema,
};
