const Joi = require("joi");
const {
  emailRegexp,
  subscriptionList,
} = require("../helpers");

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

const registerSchema = Joi.object({
  email: Joi.string().email().required(), // Використовуйте .email() для перевірки на коректний email
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(), // Тут також використовуйте .email()
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
  userSchema,
};
