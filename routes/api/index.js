// require('dotenv').config();

const express = require('express');

const users = require('../../middlewares/users');

const router = express.Router();

const usersRouter = require('./users');

const contactsRouter = require('./contacts');

const connectDB = require('./db/connectDB');

const app = require('../../app');

const { PORT, DB_URI } = process.env;

connectDB(DB_URI);

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});

router.use("/contacts", users, contactsRouter);

router.use("/users", usersRouter);

module.exports = router;