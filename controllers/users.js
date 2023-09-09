const express = require("express");
const Joi = require("joi");
const User = require("../models/users");
const bcrypt = require('bcrypt'); 


const router = express.Router();


const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});


router.post("/register", async (req, res, next) => {
  try {
  
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
      }
      
     
  const passwordHash = bcrypt.hash(password, 10);


    const newUser = await User.create({ email, password });

  
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
